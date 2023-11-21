import { Button, Form, Input, Space, DatePicker, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { toaster } from 'evergreen-ui';

import ClientServer from '../../../services/client';

const CustomerForm = ({ formType, setFormType, updateData, fetchData }) => {
    const { Option } = Select;
    const [formData, setFormData] = useState({
        maKH: updateData?.maKH || '',
        hoTen: updateData?.hoTen || '',
        ngaySinh: updateData?.ngaySinh || '',
        gioiTinh: updateData?.gioiTinh || '',
        soDienThoai: updateData?.soDienThoai || '',
        email: updateData?.email || '',
        diaChi: updateData?.diaChi || '',
    });

    const handleChangeForm = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { maKH, hoTen, soDienThoai, email } = formData;
        if (!maKH) {
            toaster.warning('Vui lòng nhập mã khách hàng!');
        } else if (!hoTen) {
            toaster.warning('Vui lòng nhập tên khách hàng!');
        } else if (!soDienThoai) {
            toaster.warning('Vui lòng nhập số điện thoại!');
        } else if (!email) {
            toaster.warning('Vui lòng nhập email!');
        } else if (formType.type === 'created' && updateData === null) {
            try {
                const res = await ClientServer.addClient({ ...formData });
                console.log(res);
                if (res?.data?.success) {
                    toaster.success('Thêm thông tin khách hàng thành công!');
                    setFormType({ ...formType, open: false });
                    fetchData();
                } else {
                    toaster.warning('Mã khách hàng đã tồn tại. Bạn vui lòng nhập mã khác!');
                }
            } catch (err) {
                console.log('Error:', err);
            }
        } else if (formType.type === 'updated') {
            try {
                const res = await ClientServer.updateClient(updateData?._id, formData);
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

    const handleClose = () => {
        setFormType({ ...formType, open: false });
    };

    const handleDatePickerChange = (date, dateString) => {
        handleChangeForm('ngaySinh', dateString);
    };

    return (
        <div className=" bg-white p-[3.75rem]" style={{ padding: 60 }}>
            <Form name="wrap" labelCol={{ flex: '300px' }} labelAlign="left">
                <div className="grid px-4 pt-15">
                    <Form.Item name="maKH" label="Mã khách hàng" initialValue={updateData?.maKH}>
                        <Input
                            id="maKH"
                            allowClear
                            placeholder="Nhập mã khách hàng"
                            onChange={(e) => handleChangeForm('maKH', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="hoTen" label="Tên khách hàng" initialValue={updateData?.hoTen}>
                        <Input
                            id="hoTen"
                            allowClear
                            placeholder="Nhập tên khách hàng"
                            onChange={(e) => handleChangeForm('hoTen', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="ngaySinh" label="Ngày sinh" initialValue={updateData?.ngaySinh}>
                        <Space direction="vertical">
                            <DatePicker onChange={handleDatePickerChange} />
                        </Space>
                    </Form.Item>
                    <Form.Item name="gioiTinh" label="Giới tính" initialValue={updateData?.gioiTinh}>
                        <Select placeholder="Chọn giới tính" onChange={(e) => handleChangeForm('gioiTinh', e)}>
                            <Option value="Nam">Nam</Option>
                            <Option value="Nữ">Nữ</Option>
                            <Option value="Chưa nhập">Chưa nhập</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="soDienThoai" label="Số điện thoại" initialValue={updateData?.soDienThoai}>
                        <TextArea
                            id="soDienThoai"
                            placeholder="Nhập số điện thoại"
                            className="w-full h-[80px]"
                            onChange={(e) => handleChangeForm('soDienThoai', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name="email" label="Email" initialValue={updateData?.email}>
                        <Input
                            id="email"
                            allowClear
                            placeholder="Nhập thông tin email"
                            onChange={(e) => handleChangeForm('email', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="diaChi" label="Địa chỉ" initialValue={updateData?.diaChi}>
                        <Input
                            id="diaChi"
                            allowClear
                            placeholder="Nhập thông tin địa chỉ"
                            onChange={(e) => handleChangeForm('diaChi', e.target.value)}
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

export default CustomerForm;
