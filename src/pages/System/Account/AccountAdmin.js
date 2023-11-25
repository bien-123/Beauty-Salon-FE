import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, notification } from 'antd';

import StaffServer from '../../../services/staff';
import logo from '../../../assets/logo/index';
import AccountForm from './AccountForm';

const AccountAdmin = () => {
    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'maNV',
            key: 'maNV',
            width: 70,
            align: 'center',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
            width: 200,
            align: 'center',
        },
        {
            title: 'Phân quyền',
            dataIndex: 'phanQuyen',
            key: 'phanQuyen',
            width: 70,
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <img
                        src={logo.IconEdit}
                        alt="Icon edit"
                        className="cursor-pointer"
                        onClick={() => handleUpdateForm(record)}
                    ></img>
                    <img
                        src={logo.IconDelete}
                        alt="Icon delete"
                        className="cursor-pointer"
                        onClick={() => showModal(record.id)}
                    ></img>
                </Space>
            ),
            width: 50,
            align: 'center',
        },
    ];

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [id, setID] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const FORM_TYPE = {
        CREATED: 'created',
        UPDATED: 'updated',
    };
    const [formType, setFormType] = useState({
        open: false,
        type: FORM_TYPE.CREATED,
    });
    const [updateData, setUpdateData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await StaffServer.searchAccount(`?q=${search}`);
            if (res) {
                setData(res?.data?.arrResult);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = () => {
        fetchData();
    };
    const resetForm = () => {
        setSearch('');
    };

    const handleAddNewForm = () => {
        resetForm();
        fetchData();
    };

    const handleUpdateForm = (item) => {
        setFormType({ open: true, type: FORM_TYPE.UPDATED });
        setUpdateData(item);
    };

    const showModal = (item) => {
        setID(item);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDeleteData = async () => {
        try {
            const res = await StaffServer.deleteStaff(`${id}`);
            if (res) {
                api.success({
                    message: 'Data deleted successfully',
                });
                setIsModalOpen(false);
                fetchData();
            }
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {!formType.open ? (
                <>
                    <div className="flex justify-between mb-2">
                        <div className="flex gap-2">
                            <div>
                                <input
                                    placeholder="Nhập giá trị tìm kiếm (để trống sẽ tìm kiếm tất cả)"
                                    className="px-3 py-2 bg-[#fff] w-[500px]"
                                    onChange={(e) => setSearch(e.target.value)}
                                ></input>
                                <button
                                    type="submit"
                                    className="p-2 bg-[#FC553D] text-white font-bold"
                                    onClick={handleSearch}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                        <Space wrap size="large">
                            <Button className="bg-[#02a7aa] text-white" onClick={handleAddNewForm}>
                                Reset
                            </Button>
                        </Space>
                    </div>
                    <div>
                        <Table columns={columns} dataSource={data} size="small" scroll={{ y: 490 }} />;
                    </div>
                </>
            ) : (
                <AccountForm
                    formType={formType}
                    setFormType={setFormType}
                    updateData={updateData}
                    fetchData={fetchData}
                />
            )}
            <Modal
                title="Xóa dịch vụ"
                open={isModalOpen}
                onOk={handleDeleteData}
                onCancel={handleCancel}
                centered
                footer={
                    <div className="flex justify-center mt-16">
                        <Button key="back" onClick={handleCancel} className="flex btn-delete items-center gap-3">
                            <p>Hủy</p>
                        </Button>
                        <Button
                            key="submit"
                            onClick={handleDeleteData}
                            className="flex btn-access items-center"
                            type="primary"
                            size="large"
                            danger
                        >
                            <p>Xác nhận</p>
                            {contextHolder}
                        </Button>
                    </div>
                }
            >
                <p>Bạn chắc chắn muốn xóa vi phạm đã chọn? Các dữ liệu liên quan đến vi phạm sẽ xóa hỏi hệ thống</p>
            </Modal>
        </>
    );
};

export default AccountAdmin;
