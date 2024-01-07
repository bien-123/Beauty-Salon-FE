import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { toaster } from 'evergreen-ui';
import TextArea from 'antd/es/input/TextArea';

import BillServer from '../../../services/bill';
import { getDataLocalStorage } from '../../../constans/auth';
import ServicesServer from '../../../services/services';
import { formatNumber } from '../../../constans/shared';
import ClientServer from '../../../services/client';

const BillForm = ({ formType, setFormType, updateData, fetchData }) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const dataUser = getDataLocalStorage();
    const [formData, setFormData] = useState({
        maKH: updateData?.maKH || '',
        tenKH: updateData?.tenKH || '',
        loaiKH: updateData?.loaiKH || '',
        maDV: updateData?.maDV || '',
        tenDV: updateData?.tenDV || '',
        gia: updateData?.gia || '',
        sale: updateData?.sale || '',
        tongTien: updateData?.tongTien || '',
        phuongThuc: updateData?.phuongThuc || '',
        ghiChu: updateData?.ghiChu || '',
        maNV: dataUser?.maNV || '',
    });
    const [dataService, setDataService] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [selectedService, setSelectedService] = useState('');

    const handleChangeForm = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { maDV, maKH, sale, phuongThuc } = formData;
        if (!maDV) {
            toaster.warning('Vui lòng nhập mã dịch vụ!');
            return;
        } else if (!maKH) {
            toaster.warning('Vui lòng nhập mã khách hàng!');
            return;
        } else if (!sale) {
            toaster.warning('Vui lòng nhập giảm giá!');
            return;
        } else if (!phuongThuc) {
            toaster.warning('Vui lòng nhập phương thức thanh toán!');
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

    const getCutomer = async () => {
        try {
            const res = await ClientServer.getClient();
            if (res) {
                setCustomer(res?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServices();
        getCutomer();
    }, []);

    useEffect(() => {
        if (formData.maDV || formData.maKH) {
            // const service = dataService.find((service) => service.maDV === formData.maDV);
            // khách hàng
            const tenKHArray = customer.filter((cs) => formData.maKH.includes(cs.maKH));
            form.setFieldValue('tenKH', tenKHArray[0]?.hoTen);

            const typeKH = tenKHArray[0]?.typeKH;
            form.setFieldValue('loaiKH', typeKH);

            // dịch vụ
            const filteredServices = dataService.filter((service) => formData.maDV.includes(service.maDV));
            const tenDVArray = filteredServices.map((service) => service.name);
            const tenDVString = tenDVArray.join('; ');

            const giaDVArray = filteredServices.map((service) => service.price);
            const total = giaDVArray.reduce((acc, curr) => acc + parseInt(curr), 0);

            setSelectedService(tenDVString);
            form.setFieldValue('tenDV', selectedService);
            form.setFieldValue('gia', formatNumber(total));

            const sale = form.getFieldValue('sale');
            form.setFieldValue('sale', formatNumber(sale));

            let tongTien;

            if (sale < 100) {
                tongTien = total - (total * sale) / 100;
            } else {
                tongTien = total - sale;
            }
            form.setFieldValue('tongTien', formatNumber(tongTien));

            setFormData((prevState) => ({
                ...prevState,
                tenKH: tenKHArray[0]?.hoTen,
                loaiKH: typeKH,
                tenDV: selectedService,
                gia: total,
                sale: sale,
                tongTien: tongTien.toFixed(0),
            }));
        } else {
            setSelectedService('');
            form.setFieldValue('tenDV', '');
            setFormData((prevState) => ({
                ...prevState,
                tenDV: selectedService,
            }));
        }
    }, [formData.maDV, dataService, form, selectedService, formData.sale, formData.maKH, customer]);

    return (
        <div className=" bg-white p-[3.75rem]" style={{ padding: 60 }}>
            <Form name="wrap" labelCol={{ flex: '300px' }} labelAlign="left" form={form}>
                <div className="grid px-4 pt-15">
                    <Form.Item name="maKH" label="Mã khách hàng" initialValue={updateData?.maKH}>
                        <Select
                            mode="multiple"
                            placeholder="Chọn mã khách hàng"
                            onChange={(value) => setFormData((prevState) => ({ ...prevState, maKH: value }))}
                            value={formData.maKH}
                        >
                            {customer.map((service) => (
                                <Option key={service._id} value={service.maKH}>
                                    {service.maKH}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="tenKH" label="Tên khách hàng" initialValue={updateData?.tenKH}>
                        <Input
                            id="tenKH"
                            allowClear
                            placeholder="Nhập tên khách hàng"
                            onChange={(e) => handleChangeForm('tenKH', e.target.value)}
                            disabled
                        ></Input>
                    </Form.Item>
                    <Form.Item name="loaiKH" label="Loại khách hàng" initialValue={updateData?.loaiKH}>
                        <Input
                            id="loaiKH"
                            allowClear
                            placeholder="Nhập loại khách hàng"
                            onChange={(e) => handleChangeForm('loaiKH', e.target.value)}
                            disabled
                        ></Input>
                    </Form.Item>
                    <Form.Item name="maDV" label="Mã dịch vụ" initialValue={updateData?.maDV}>
                        <Select
                            mode="multiple"
                            placeholder="Chọn mã dịch vụ"
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
                        <TextArea placeholder="Tên dịch vụ" className="w-full h-[80px]" disabled />
                    </Form.Item>
                    <Form.Item name="gia" label="Giá dịch vụ" initialValue={updateData?.gia}>
                        <Input id="gia" allowClear placeholder="Nhập giá dịch vụ" suffix="VNĐ" disabled></Input>
                    </Form.Item>
                    <Form.Item name="sale" label="Giảm giá" initialValue={updateData?.sale}>
                        <Input
                            id="sale"
                            allowClear
                            placeholder="Nhập thông tin giảm giá (nếu là % thì chỉ cần nhập số)"
                            onChange={(e) => handleChangeForm('sale', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="tongTien" label="Tổng tiền" initialValue={updateData?.tongTien}>
                        <Input
                            id="tongTien"
                            allowClear
                            placeholder="Tổng tiền = Giá dịch vụ - Giảm giá"
                            suffix="VNĐ"
                            disabled
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
