import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { toaster } from 'evergreen-ui';
import BillServer from '../../../services/bill';
import { getDataLocalStorage } from '../../../constans/auth';

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
        maNV: dataUser?.maNV,
    });

    const handleChangeForm = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
        if (key === 'gia' || key === 'sale') {
            const gia = parseFloat(formData.gia || 0); // Giá
            const sale = parseFloat(formData.sale || 0); // Khuyến mãi
            const tongTien = gia * (1 - sale / 100); // Tính tổng tiền với khuyến mãi
            setFormData((prevState) => ({
                ...prevState,
                tongTien: tongTien.toFixed(0), // Lưu tổng tiền vào state với định dạng mong muốn
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { maDV, tenDV, maKH, tenKH, gia } = formData;
        if (!maDV) {
            toaster.warning('Vui lòng nhập mã dịch vụ!');
        } else if (!tenDV) {
            toaster.warning('Vui lòng nhập tên dịch vụ!');
        } else if (!maKH) {
            toaster.warning('Vui lòng nhập mô tả dịch vụ!');
        } else if (!tenKH) {
            toaster.warning('Vui lòng nhập giá dịch vụ!');
        } else if (!gia) {
            toaster.warning('Vui lòng nhập thời gian thực hiện!');
        } else if (formType.type === 'created' && updateData === null) {
            try {
                const res = await BillServer.addBill({ ...formData });
                console.log(res);
                if (res?.data) {
                    toaster.success('Thêm thông tin hóa đơn thành công!');
                    setFormType({ ...formType, open: false });
                    fetchData();
                } else {
                    toaster.warning('Mã hóa đơn đã tồn tại. Bạn vui lòng nhập mã khác!');
                }
            } catch (err) {
                console.log('Error:', err);
            }
        } else if (formType.type === 'updated') {
            try {
                const res = await BillServer.updateBill(updateData?._id, formData);
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
                        <TextArea
                            id="maDV"
                            placeholder="Nhập mã dịch vụ"
                            className="w-full h-[80px]"
                            onChange={(e) => handleChangeForm('maDV', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name="tenDV" label="Tên dịch vụ" initialValue={updateData?.tenDV}>
                        <Input
                            id="tenDV"
                            allowClear
                            placeholder="Nhập tên dịch vụ"
                            onChange={(e) => handleChangeForm('tenDV', e.target.value)}
                        ></Input>
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
                            onChange={(e) => handleChangeForm('tongTien', e.target.value)}
                        ></Input>
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
