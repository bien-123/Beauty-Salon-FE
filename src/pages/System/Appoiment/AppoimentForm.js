import { Button, Form, Input, DatePicker, Space, TimePicker, Select } from 'antd';
import { useState } from 'react';
import { toaster } from 'evergreen-ui';
import dayjs from 'dayjs';

import AppoimentServer from '../../../services/appoiment';
import { isValidPhoneNumber } from '../../../constans/shared';

const { Option } = Select;

const AppoimentForm = ({ formType, setFormType, updateData, fetchData }) => {
    const [formData, setFormData] = useState({
        tenKH: updateData?.tenKH || '',
        sdt: updateData?.sdt || '',
        ngayHen: updateData?.ngayHen || '',
        gioHen: updateData?.gioHen || '',
        tinhTrangHienTai: updateData?.tinhTrangHienTai || '',
        status: updateData?.status || '',
    });

    const handleClose = () => {
        setFormType({ ...formType, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { tenKH, sdt, ngayHen, gioHen } = formData;

        if (!tenKH) {
            toaster.warning('Vui lòng nhập tên khách hàng!');
            return;
        } else if (!sdt) {
            toaster.warning('Vui lòng nhập số điện thoại!');
            return;
        } else if (!isValidPhoneNumber(sdt)) {
            toaster.warning('Vui lòng nhập đúng định dạng số điện thoại!');
            return;
        } else if (!ngayHen) {
            toaster.warning('Vui lòng chọn ngày hẹn!');
            return;
        } else if (!gioHen) {
            toaster.warning('Vui lòng chọn giờ hẹn!');
            return;
        } else if (formType.type === 'created' && updateData === null) {
            try {
                const res = await AppoimentServer.addAppoiment({ ...formData });
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
                const res = await AppoimentServer.updateAppoiment(updateData?._id, formData);
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
        handleFormChange('ngayHen', dateString);
    };

    const handleTimePickerChange = (time, timeString) => {
        handleFormChange('gioHen', timeString);
    };

    return (
        <div className=" bg-white p-[3.75rem]" style={{ padding: 60 }}>
            <Form name="wrap" labelCol={{ flex: '300px' }} labelAlign="left">
                <div className="grid px-4 pt-15">
                    <Form.Item name="madvbreak" label="Tên khách hàng" initialValue={updateData?.tenKH}>
                        <Input
                            id="tenKH"
                            allowClear
                            placeholder="Nhập tên khách hàng"
                            onChange={(e) => handleFormChange('tenKH', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="namebreak" label="Số điện thoại" initialValue={updateData?.sdt}>
                        <Input
                            id="sdt"
                            allowClear
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => handleFormChange('sdt', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="description" label="Ngày hẹn" initialValue={updateData?.ngayHen}>
                        <Space direction="vertical">
                            <DatePicker onChange={handleDatePickerChange} />
                        </Space>
                    </Form.Item>
                    <Form.Item name="genres" label="Thời gian" initialValue={updateData?.gioHen}>
                        <Space>
                            <TimePicker
                                onChange={handleTimePickerChange}
                                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        name="tinhTrangHienTai"
                        label="Tình trạng hiện tại"
                        initialValue={updateData?.tinhTrangHienTai}
                    >
                        <Input
                            id="tinhTrangHienTai"
                            allowClear
                            placeholder="Nhập thông tin tình trạng"
                            onChange={(e) => handleFormChange('tinhTrangHienTai', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="status" label="Trạng thái" initialValue={updateData?.status}>
                        <Select
                            placeholder="Nhập trạng thái của lịch hẹn"
                            onChange={(e) => handleFormChange('status', e)}
                        >
                            <Option value="Đã xác nhận">Đã xác nhận</Option>
                            <Option value="Chưa xác nhận">Chưa xác nhận</Option>
                        </Select>
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

export default AppoimentForm;
