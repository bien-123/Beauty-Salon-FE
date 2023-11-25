import { Button, Form, Input, DatePicker, Space, Select } from 'antd';
import { useState } from 'react';
import { toaster } from 'evergreen-ui';

import StaffServer from '../../../services/staff';

const { Option } = Select;

const AccountForm = ({ formType, setFormType, updateData, fetchData }) => {
    const [formData, setFormData] = useState({
        maNV: updateData?.maNV || '',
        password: updateData?.password || '',
        phanQuyen: updateData?.phanQuyen || '',
    });

    const handleClose = () => {
        setFormType({ ...formType, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { maNV, password, phanQuyen } = formData;

        if (!maNV) {
            toaster.warning('Vui lòng nhập mã nhân viên!');
            return;
        } else if (!password) {
            toaster.warning('Vui lòng nhập mật khẩu!');
            return;
        } else if (!phanQuyen) {
            toaster.warning('Vui lòng chọn phân quyền!');
            return;
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
                    <Form.Item name="namebreak" label="Mật khẩu" initialValue={updateData?.password}>
                        <Input
                            id="password"
                            allowClear
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => handleFormChange('password', e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item name="phanQuyen" label="Phân quyền" initialValue={updateData?.phanQuyen}>
                        <Select placeholder="Chọn phân quyền" onChange={(e) => handleFormChange('phanQuyen', e)}>
                            <Option value="Admin">Admin</Option>
                            <Option value="User">User</Option>
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

export default AccountForm;
