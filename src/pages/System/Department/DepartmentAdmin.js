import React, { useState, useEffect, useCallback } from 'react';
import { Space, Table, Button, Modal, notification, Tag } from 'antd';

import DepartmentServer from '../../../services/department';
import logo from '../../../assets/logo/index';
import DepartmentForm from './DepartmentForm';
import * as XLSX from 'xlsx';

const DepartmentAdmin = () => {
    const columns = [
        {
            title: 'Mã khoa',
            dataIndex: 'departmentCode',
            key: 'departmentCode',
            render: (text) => <>{text}</>,
            width: 50,
            align: 'center',
        },
        {
            title: 'Tên khoa',
            dataIndex: 'departmentName',
            key: 'departmentName',
            render: (text) => <>{text}</>,
            width: 100,
            align: 'center',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 180,
            align: 'center',
        },
        {
            title: 'Trưởng khoa',
            key: 'manager',
            dataIndex: 'manager',
            width: 60,
            align: 'center',
            render: (_, { manager }) => (
                <>
                    {manager.map((nhanvien) => {
                        return <Tag>{nhanvien.hoTen}</Tag>;
                    })}
                </>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 70,
            render: (text) => {
                return text === 'Active' ? 'Hoạt động' : 'Ngừng hoạt động';
            },
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
    const fetchData = useCallback(async () => {
        try {
            let res = await DepartmentServer.getDepartment();

            if (res && res.data && Array.isArray(res.data)) {
                res = res.data;
            }

            if (res && Array.isArray(res)) {
                if (search.trim() !== '') {
                    const filteredData = res.filter(
                        (item) =>
                            item.departmentName?.toLowerCase().includes(search.toLowerCase()) ||
                            item.departmentCode?.toLowerCase().includes(search.toLowerCase()),
                    );
                    setData(filteredData);
                } else {
                    setData(res);
                }
            } else {
                console.error('Dữ liệu API không phải là một mảng:', res);
                setData([]);
            }
        } catch (error) {
            console.log(error);
            setData([]);
        }
    }, [search]); // Hàm này sẽ tự cập nhật khi biến search thay đổi

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
            const res = await DepartmentServer.deleteDepartment(`${dataId}`);
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
        const exportData = data.map((item) => {
            // XỬ LÝ TRƯỜNG QUẢN LÝ Ở ĐÂY:
            let managersText = 'Chưa cập nhật';
            if (Array.isArray(item?.manager) && item.manager.length > 0) {
                // Nếu là mảng chứa các object nhân viên, lấy 'hoTen' nối lại bằng dấu phẩy
                managersText = item.manager.map((m) => m.hoTen || 'Không rõ tên').join(', ');
            } else if (item?.manager?.hoTen) {
                // Trường hợp đề phòng backend trả về duy nhất 1 object thay vì mảng
                managersText = item.manager.hoTen;
            }

            return {
                'Mã khoa': item.departmentCode || '',
                'Tên khoa': item.departmentName || '',
                'Mô tả': item.description || '',
                'Quản lý': managersText, // Gán chuỗi tên đã được nối vào đây
                'Trạng thái': item.status === 'Active' ? 'Hoạt động' : 'Ngừng hoạt động', // Đổi chữ trạng thái sang tiếng Việt cho đẹp
            };
        });

        // Tạo workbook và worksheet từ dữ liệu xuất
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Department');

        // Tạo blob từ workbook
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });

        // Tạo URL cho blob và tạo một link tải xuống
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'department_data.xlsx');
        document.body.appendChild(link);

        // Simulate click để tải xuống
        link.click();

        // Xóa link sau khi đã tải xuống
        document.body.removeChild(link);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Giữ nguyên mảng rỗng để trang chỉ tự động gọi API 1 lần duy nhất khi vừa mở lên

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
                <DepartmentForm
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
export default DepartmentAdmin;
