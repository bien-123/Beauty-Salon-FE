import { Button, Form, Input, DatePicker, Space, Select } from 'antd';
import { useState } from 'react';
import { toaster } from 'evergreen-ui';

import StaffServer from '../../../services/staff';

const { Option } = Select;

const StaffForm = ({ formType, setFormType, updateData, fetchData }) => {
    const [formData, setFormData] = useState({
        maNV: updateData?.maNV || '',
        hoTen: updateData?.hoTen || '',
        ngaySinh: updateData?.ngaySinh || '',
        gioiTinh: updateData?.gioiTinh || '',
        chucVu: updateData?.chucVu || '',
        soDienThoai: updateData?.soDienThoai || '',
        email: updateData?.email || '',
        diaChi: updateData?.diaChi || '',
    });

    const handleClose = () => {
        setFormType({ ...formType, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { maNV, hoTen, ngaySinh, gioiTinh, chucVu, soDienThoai, email, diaChi } = formData;

        if (!maNV) {
            toaster.warning('Vui lòng nhập mã nhân viên!');
            return;
        } else if (!hoTen) {
            toaster.warning('Vui lòng nhập họ tên!');
            return;
        } else if (!ngaySinh) {
            toaster.warning('Vui lòng chọn ngày sinh!');
            return;
        } else if (!gioiTinh) {
            toaster.warning('Vui lòng chọn giới tính!');
        } else if (!chucVu) {
            toaster.warning('Vui lòng nhập chức vụ!');
        } else if (!soDienThoai) {
            toaster.warning('Vui lòng nhập số điện thoại!');
        } else if (!email) {
            toaster.warning('Vui lòng nhập email!');
        } else if (!diaChi) {
            toaster.warning('Vui lòng nhập địa chỉ!');
            return;
        } else if (formType.type === 'created' && updateData === null) {
            try {
                const res = await StaffServer.addStaff({ ...formData, password: formData?.ngaySinh });
                if (res) {
                    toaster.success('Thêm thông tin dịch vụ thành công!');
                    setFormType({ ...formType, open: false });
                    fetchData();
                }
            } catch (err) {
                console.log('Error:', err);
            }
        } else if (formType.type === 'updated') {
            try {
                const res = await StaffServer.updateStaff(updateData?.id, formData);
                if (res) {
                    toaster.success('Cập nhật dữ liệu thành công');
                    setFormType({ ...formType, open: false });
                    fetchData();
                }
            } catch (err) {
                console.log('Error:', err);
            }
        }
    };

    const handleFormChange = (key, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    const handleDatePickerChange = (date, dateString) => {
        handleFormChange('ngaySinh', dateString);
    };

    return (
        <div className=" bg-white p-[3.75rem]" style={{ padding: 60 }}>
            <Form name="wrap" labelCol={{ flex: '300px' }} labelAlign="left">
                <div className="grid px-4 pt-15">
                    <Form.Item name="madvbreak" label="Mã nhân viên" initialValue={updateData?.maNV}>
                        <Input
                            id="maNV"
                            allowClear
                            placeholder="Nhập mã nhân viên"
                            onChange={(e) => handleFormChange('maNV', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="namebreak" label="Họ và tên" initialValue={updateData?.hoTen}>
                        <Input
                            id="hoTen"
                            allowClear
                            placeholder="Nhập họ và tên"
                            onChange={(e) => handleFormChange('hoTen', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="ngaySinh" label="Ngày sinh" initialValue={updateData?.ngaySinh}>
                        <Space direction="vertical">
                            <DatePicker onChange={handleDatePickerChange} />
                        </Space>
                    </Form.Item>
                    <Form.Item name="gioiTinh" label="Giới tính" initialValue={updateData?.gioiTinh}>
                        <Select placeholder="Nhập giới tính" onChange={(e) => handleFormChange('gioiTinh', e)}>
                            <Option value="Nam">Nam</Option>
                            <Option value="Nữ">Nữ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="chucVu" label="Chức vụ" initialValue={updateData?.chucVu}>
                        <Select placeholder="Nhập chức vụ" onChange={(e) => handleFormChange('chucVu', e)}>
                            <Option value="Giám đốc">Giám đốc</Option>
                            <Option value="Trưởng phòng">Trưởng phòng</Option>
                            <Option value="Bác sĩ">Bác sĩ</Option>
                            <Option value="Y tá">Y tá</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="soDienThoai" label="Số điện thoại" initialValue={updateData?.soDienThoai}>
                        <Input
                            id="soDienThoai"
                            allowClear
                            placeholder="Nhập thông tin chức vụ"
                            onChange={(e) => handleFormChange('soDienThoai', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="email" label="Email" initialValue={updateData?.email}>
                        <Input
                            id="email"
                            allowClear
                            placeholder="Nhập thông tin email"
                            onChange={(e) => handleFormChange('email', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="diaChi" label="Địa chỉ" initialValue={updateData?.diaChi}>
                        <Input
                            id="diaChi"
                            allowClear
                            placeholder="Nhập thông tin địa chỉ"
                            onChange={(e) => handleFormChange('diaChi', e.target.value)}
                        ></Input>
                    </Form.Item>
                </div>
            </Form>
            <div className="flex justify-end px-4 pb-2 gap-5">
                <Button key="back" onClick={handleClose} className="flex btn-delete items-center gap-3">
                    <p>Hủy</p>
                </Button>

                <Button className="flex btn-save" onClick={handleSubmit}>
                    <p>Lưu</p>
                </Button>
            </div>
        </div>
    );
};

export default StaffForm;
