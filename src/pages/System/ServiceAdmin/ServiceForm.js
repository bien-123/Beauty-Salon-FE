import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { toaster } from 'evergreen-ui';
import ServicesServer from '../../../services/services';

const ServiceForm = ({ formType, setFormType, updateData, fetchData }) => {
    const [formData, setFormData] = useState({
        maDV: updateData?.maDV || '',
        name: updateData?.name || '',
        description: updateData?.description || '',
        price: updateData?.price || '',
        time: updateData?.time || '',
    });

    const handleChangeForm = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { maDV, name, description, price, time } = formData;
        if (!maDV) {
            toaster.warning('Vui lòng nhập mã dịch vụ!');
        } else if (!name) {
            toaster.warning('Vui lòng nhập tên dịch vụ!');
        } else if (!description) {
            toaster.warning('Vui lòng nhập mô tả dịch vụ!');
        } else if (!price) {
            toaster.warning('Vui lòng nhập giá dịch vụ!');
        } else if (!time) {
            toaster.warning('Vui lòng nhập thời gian thực hiện!');
        } else if (formType.type === 'created' && updateData === null) {
            try {
                const res = await ServicesServer.addServices({ ...formData });
                if (res?.data?.success) {
                    toaster.success('Thêm thông tin dịch vụ thành công!');
                    setFormType({ ...formType, open: false });
                    fetchData();
                } else {
                    toaster.warning('Mã dịch vụ đã tồn tại. Bạn vui lòng nhập mã khác!');
                }
            } catch (err) {
                console.log('Error:', err);
            }
        } else if (formType.type === 'updated') {
            try {
                const res = await ServicesServer.updateServices(updateData?._id, formData);
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
                    <Form.Item name="madvbreak" label="Mã dịch vụ" initialValue={updateData?.maDV}>
                        <Input
                            id="maDV"
                            allowClear
                            placeholder="Nhập mã dịch vụ"
                            onChange={(e) => handleChangeForm('maDV', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="namebreak" label="Tên dịch vụ" initialValue={updateData?.name}>
                        <Input
                            id="name"
                            allowClear
                            placeholder="Nhập tên dịch vụ"
                            onChange={(e) => handleChangeForm('name', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả" initialValue={updateData?.description}>
                        <TextArea
                            id="publishedDate"
                            placeholder="Mô tả dịch vụ"
                            className="w-full h-[80px]"
                            onChange={(e) => handleChangeForm('description', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name="genres" label="Giá dịch vụ" initialValue={updateData?.price}>
                        <Input
                            id="genres"
                            allowClear
                            placeholder="Nhập thông tin giá dịch vụ"
                            onChange={(e) => handleChangeForm('price', e.target.value)}
                            suffix="VNĐ"
                        ></Input>
                    </Form.Item>
                    <Form.Item name="status" label="Thời gian thực hiện" initialValue={updateData?.time}>
                        <Input
                            id="author"
                            allowClear
                            placeholder="Nhập thông tin thời gian thực hiện"
                            onChange={(e) => handleChangeForm('time', e.target.value)}
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

export default ServiceForm;
