import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, notification } from 'antd';

import ClientServer from '../../../services/client';
import logo from '../../../assets/logo/index';
import CustomerForm from './CustomerForm';
import * as XLSX from 'xlsx';

const CustomerAdmin = () => {
    const columns = [
        {
            title: 'Mã KH',
            dataIndex: 'maKH',
            key: 'maKH',
            render: (text) => <>{text}</>,
            width: 50,
            align: 'center',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'hoTen',
            key: 'hoTen',
            render: (text) => <>{text}</>,
            width: 70,
            align: 'center',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaySinh',
            key: 'ngaySinh',
            width: 50,
            align: 'center',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
            width: 50,
            align: 'center',
        },
        {
            title: 'Số điện thoại',
            key: 'soDienThoai',
            dataIndex: 'soDienThoai',
            width: 50,
            align: 'center',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            width: 70,
            align: 'center',
        },
        {
            title: 'Địa chỉ',
            key: 'diaChi',
            dataIndex: 'diaChi',
            width: 100,
            align: 'center',
        },
        {
            title: 'Kiểu KH',
            key: 'typeKH',
            dataIndex: 'typeKH',
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
                        onClick={() => showModal(record._id)}
                    ></img>
                </Space>
            ),
            width: 50,
            align: 'center',
        },
    ];

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [dataId, setDataId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [updateData, setUpdateData] = useState(null);
    const FORM_TYPE = {
        CREATED: 'created',
        UPDATED: 'updated',
    };
    const [formType, setFormType] = useState({
        open: false,
        type: FORM_TYPE.CREATED,
    });

    const handleAddNewForm = () => {
        setFormType({ open: true, type: FORM_TYPE.CREATED });
        setUpdateData(null);
    };

    const handleUpdateForm = (item) => {
        if (item) {
            setUpdateData(item);
        }
        setFormType({ open: true, type: FORM_TYPE.UPDATED });
    };

    const fetchData = async () => {
        try {
            const res = await ClientServer.searchClient(`?q=${search}`);
            if (res) {
                setData(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    const showModal = (item) => {
        setDataId(item);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDeleteData = async () => {
        try {
            const res = await ClientServer.deleteClient(`${dataId}`);
            if (res) {
                setIsModalOpen(false);
                api.success({
                    message: 'Data deleted successfully',
                });
                fetchData();
            }
        } catch (err) {
            console.error('Error deleting data:', err);
        }
    };

    const handleExportToExcel = () => {
        // Tạo dữ liệu Excel từ 'data'
        const exportData = data.map((item) => ({
            'Mã KH': item.maKH,
            'Tên khách hàng': item.hoTen,
            'Ngày sinh': item.ngaySinh,
            'Giới tính': item.gioiTinh,
            'Số điện thoại': item.soDienThoai,
            Email: item.email,
            'Địa chỉ': item.diaChi,
            'Kiểu khách hàng': item.typeKH,
        }));

        // Tạo workbook và worksheet từ dữ liệu xuất
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');

        // Tạo blob từ workbook
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });

        // Tạo URL cho blob và tạo một link tải xuống
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'customer_data.xlsx');
        document.body.appendChild(link);

        // Simulate click để tải xuống
        link.click();

        // Xóa link sau khi đã tải xuống
        document.body.removeChild(link);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {!formType.open ? (
                <>
                    <div className="flex justify-between mb-2">
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
                        <Space wrap size="large" className="flex !flex-nowrap">
                            <Button className="bg-[#02a7aa] text-white" onClick={handleAddNewForm}>
                                Thêm mới
                            </Button>
                            <Button className="bg-[#689f38] text-white" onClick={handleExportToExcel}>
                                Xuất file Excel
                            </Button>
                        </Space>
                    </div>
                    <div>
                        <Table columns={columns} dataSource={data} size="small" scroll={{ y: 490 }} />;
                    </div>
                </>
            ) : (
                <CustomerForm
                    formType={formType}
                    setFormType={setFormType}
                    updateData={updateData}
                    fetchData={fetchData}
                />
            )}
            <Modal
                title="Xóa khách hàng"
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
export default CustomerAdmin;
