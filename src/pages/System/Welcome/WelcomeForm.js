import { Button, Form, Input, DatePicker, Space, Select, TimePicker } from 'antd';
import { useEffect, useState } from 'react';
import { toaster } from 'evergreen-ui';

import AppoimentServer from '../../../services/appoiment';
import StaffServer from '../../../services/staff';
import { isValidPhoneNumber } from '../../../constans/shared';
import dayjs from 'dayjs';
import ServicesServer from '../../../services/services';

const { Option } = Select;

const WelcomeForm = ({ formType, setFormType, updateData, fetchData }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        tenKH: updateData?.tenKH || '',
        sdt: updateData?.sdt || '',
        ngayHen: updateData?.ngayHen || '',
        gioHen: updateData?.gioHen || '',
        name: updateData?.name || '',
        tinhTrangHienTai: updateData?.tinhTrangHienTai || '',
        phanCong: updateData?.phanCong || '',
        status: 'Đã xác nhận',
        result: 'Thành công',
    });

    const [dataService, setDataService] = useState([]);
    const [staff, setStaff] = useState([]);

    const getStaff1 = async () => {
        try {
            const res = await StaffServer.getStaff();
            if (res) {
                setStaff(res?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getServices = async () => {
        try {
            const res = await ServicesServer.getBill();
            if (res?.data?.arr) {
                setDataService(res.data.arr);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        setFormType({ ...formType, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { tenKH, sdt, ngayHen, gioHen, phanCong } = formData;

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
        } else if (!phanCong) {
            toaster.warning('Vui lòng chọn bác sĩ tiếp đón!');
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

    useEffect(() => {
        getStaff1();
        getServices();
    }, []);

    useEffect(() => {
        if (formData.phanCong) {
            const tenBSArray = staff.filter((cs) => formData.phanCong.includes(cs.maNV));
            form.setFieldValue('hoTen', tenBSArray[0]?.hoTen);

            const typeKH = tenBSArray[0]?.khoa;
            form.setFieldValue('khoa', typeKH);
        }
    }, [formData.phanCong, form, staff]);

    return (
        <div className=" bg-white p-[3.75rem]" style={{ padding: 60 }}>
            <Form name="wrap" labelCol={{ flex: '300px' }} labelAlign="left" form={form}>
                <div className="grid px-4 pt-15">
                    <Form.Item
                        name="madvbreak"
                        label="Tên khách hàng"
                        initialValue={updateData?.tenKH}
                        rules={[{ required: true }]}
                    >
                        <Input
                            id="tenKH"
                            allowClear
                            placeholder="Nhập tên khách hàng"
                            onChange={(e) => handleFormChange('tenKH', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        name="namebreak"
                        label="Số điện thoại"
                        initialValue={updateData?.sdt}
                        rules={[{ required: true }]}
                    >
                        <Input
                            id="sdt"
                            allowClear
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => handleFormChange('sdt', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Ngày hẹn"
                        initialValue={updateData?.ngayHen}
                        rules={[{ required: true }]}
                    >
                        <Space direction="vertical">
                            <DatePicker onChange={handleDatePickerChange} />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        name="genres"
                        label="Thời gian"
                        initialValue={updateData?.gioHen}
                        rules={[{ required: true }]}
                    >
                        <Space>
                            <TimePicker
                                onChange={handleTimePickerChange}
                                defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên dịch vụ"
                        initialValue={updateData?.name}
                        rules={[{ required: true }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Chọn tên dịch vụ"
                            onChange={(value) => setFormData((prevState) => ({ ...prevState, name: value }))}
                            value={formData.name}
                        >
                            {dataService.map((service) => (
                                <Option key={service._id} value={service.name}>
                                    {service.name}
                                </Option>
                            ))}
                        </Select>
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
                    <Form.Item name="phanCong" label="Mã bác sĩ" initialValue={updateData?.phanCong}>
                        <Select
                            mode="multiple"
                            placeholder="Chọn mã bác sĩ"
                            onChange={(value) => setFormData((prevState) => ({ ...prevState, phanCong: value }))}
                            value={formData.phanCong}
                        >
                            {staff.map((service) => (
                                <Option key={service._id} value={service.maNV}>
                                    {service.maNV}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="hoTen" label="Tên bác sĩ" initialValue={updateData?.hoTen}>
                        <Input
                            id="hoTen"
                            allowClear
                            placeholder="Nhập tên bác sĩ"
                            onChange={(e) => handleFormChange('hoTen', e.target.value)}
                            disabled
                        ></Input>
                    </Form.Item>
                    <Form.Item name="khoa" label="Khoa" initialValue={updateData?.khoa}>
                        <Input
                            id="khoa"
                            allowClear
                            placeholder="Nhập loại bác sĩ"
                            onChange={(e) => handleFormChange('khoa', e.target.value)}
                            disabled
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

export default WelcomeForm;
