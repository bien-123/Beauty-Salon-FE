import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { toaster } from 'evergreen-ui';
import BillServer from '../../../services/bill';
import { getDataLocalStorage } from '../../../constans/auth';
import ServicesServer from '../../../services/services';

const BillForm = ({ formType, setFormType, updateData, fetchData }) => {
    const { Option } = Select;
    const dataUser = getDataLocalStorage();
    const [formData, setFormData] = useState({
        maKH: updateData?.maKH || '',
        tenKH: updateData?.tenKH || '',
        maDV: updateData?.maDV || '',
        tenDV: updateData?.tenDV || '',
        gia: updateData?.gia || '',
        sale: updateData?.sale || '',
        tongTien: updateData?.tongTien || '',
        phuongThuc: updateData?.phuongThuc || '',
        ghiChu: updateData?.ghiChu || '',
        maNV: dataUser?.maNV || '', // Ensure maNV has a default value
    });

    const handleChangeForm = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));

        if (key === 'maDV') {
            const selectedService = dataService.find((service) => service.maDV === value);
            if (selectedService) {
                setFormData((prevState) => ({
                    ...prevState,
                    tenDV: selectedService.name, // Update the tenDV field with the corresponding service name
                }));
            }
        }

        const gia = parseFloat(key === 'gia' ? value : formData.gia || 0);
        const sale = parseFloat(key === 'sale' ? value : formData.sale || 0);
        let tongTien;

        if (sale < 100) {
            tongTien = gia - (gia * sale) / 100;
        } else {
            tongTien = gia - sale;
        }

        setFormData((prevState) => ({
            ...prevState,
            tongTien: tongTien.toFixed(0),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { maDV, tenDV, maKH, tenKH, gia } = formData;
        if (!maDV || !tenDV || !maKH || !tenKH || !gia) {
            toaster.warning('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        try {
            let res;
            if (formType.type === 'created' && updateData === null) {
                res = await BillServer.addBill({ ...formData });
            } else if (formType.type === 'updated') {
                res = await BillServer.updateBill(updateData?._id, formData);
            }

            if (res?.data) {
                toaster.success(
                    formType.type === 'created' ? 'Thêm thông tin hóa đơn thành công!' : 'Cập nhật dữ liệu thành công',
                );
                setFormType({ ...formType, open: false });
                fetchData();
            } else {
                toaster.warning(
                    formType.type === 'created'
                        ? 'Mã hóa đơn đã tồn tại. Vui lòng nhập mã khác!'
                        : 'Có lỗi xảy ra khi cập nhật dữ liệu!',
                );
            }
        } catch (err) {
            console.log('Error:', err);
            toaster.warning('Có lỗi xảy ra. Vui lòng thử lại sau!');
        }
    };

    const handleClose = () => {
        setFormType({ ...formType, open: false });
    };

    const [dataService, setDataService] = useState([]);

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

    useEffect(() => {
        getServices();
    }, []);

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
                    <Form.Item name="tenKH" label="Tên khách hàng" initialValue={updateData?.tenKH}>
                        <Input
                            id="tenKH"
                            allowClear
                            placeholder="Nhập tên khách hàng"
                            onChange={(e) => handleChangeForm('tenKH', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="maDV" label="Mã dịch vụ" initialValue={updateData?.maDV}>
                        <Select
                            mode="multiple"
                            placeholder="Chọn dịch vụ"
                            onChange={(value) => setFormData((prevState) => ({ ...prevState, maDV: value }))}
                            value={formData.maDV}
                        >
                            {dataService.map((service) => (
                                <Option key={service._id} value={service.maDV}>
                                    {service.maDV}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="tenDV" label="Tên dịch vụ" initialValue={updateData?.tenDV}>
                        <TextArea
                            id="tenDV"
                            placeholder="Nhập mã dịch vụ"
                            className="w-full h-[80px]"
                            onChange={(e) => handleChangeForm('tenDV', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name="gia" label="Giá dịch vụ" initialValue={updateData?.gia}>
                        <Input
                            id="gia"
                            allowClear
                            placeholder="Nhập giá dịch vụ"
                            onChange={(e) => handleChangeForm('gia', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="sale" label="Giảm giá" initialValue={updateData?.sale}>
                        <Input
                            id="sale"
                            allowClear
                            placeholder="Nhập thông tin giảm giá"
                            onChange={(e) => handleChangeForm('sale', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="tongTien" label="Tổng tiền" initialValue={updateData?.tongTien}>
                        <Input
                            id="tongTien"
                            allowClear
                            placeholder="Nhập thông tin thời gian thực hiện"
                            value={formData.tongTien} // Đảm bảo giá trị được hiển thị từ state
                            onChange={(e) => handleChangeForm('tongTien', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name="phuongThuc" label="Phương thức thanh toán" initialValue={updateData?.phuongThuc}>
                        <Select
                            placeholder="Chọn phương thức thanh toán"
                            onChange={(e) => handleChangeForm('phuongThuc', e)}
                        >
                            <Option value="Tiền mặt">Tiền mặt</Option>
                            <Option value="Chuyển khoản">Chuyển khoản</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="ghiChu" label="Ghi chú" initialValue={updateData?.ghiChu}>
                        <TextArea
                            id="ghiChu"
                            allowClear
                            placeholder="Nhập thông tin ghi chú"
                            onChange={(e) => handleChangeForm('ghiChu', e.target.value)}
                        ></TextArea>
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

export default BillForm;
