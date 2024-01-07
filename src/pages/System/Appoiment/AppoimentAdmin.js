import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, notification, Select, Tag } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import AppoimentServer from '../../../services/appoiment';
import logo from '../../../assets/logo/index';
import AppoimentForm from './AppoimentForm';
import * as XLSX from 'xlsx';

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentAdmin = () => {
    const { Option } = Select;
    const formatted = (dateStr) => {
        // const formattedDate = new Date(dateStr).toLocaleDateString('vi-VN');
        const vnTime = dayjs.utc(dateStr).utcOffset(+7).format('HH:mm:ss YYYY-MM-DD');
        return vnTime;
    };

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenKH',
            key: 'tenKHtenKH',
            width: 100,
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            key: 'sdt',
            width: 70,
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Ngày hẹn',
            dataIndex: 'ngayHen',
            key: 'ngayHen',
            width: 70,
            align: 'center',
        },
        {
            title: 'Thời gian',
            key: 'gioHen',
            dataIndex: 'gioHen',
            width: 50,
            align: 'center',
        },
        {
            title: 'Tên DV',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            align: 'center',
            render: (_, { name }) => (
                <>
                    {name.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Ghi chú',
            key: 'tinhTrangHienTai',
            dataIndex: 'tinhTrangHienTai',
            width: 100,
            align: 'center',
        },
        {
            title: 'Ngày đăng ký',
            key: 'createdAt',
            dataIndex: 'createdAt',
            width: 100,
            align: 'center',
            render: (text) => {
                return <span>{formatted(text)}</span>;
            },
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            width: 100,
            align: 'center',
        },
        {
            title: 'Kết quả',
            key: 'result',
            dataIndex: 'result',
            width: 100,
            align: 'center',
        },
        {
            title: 'NV xác nhận',
            key: 'staff_confirmed',
            dataIndex: 'staff_confirmed',
            width: 100,
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
            fixed: 'right',
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
            const res = await AppoimentServer.searchAppoiment(`?q=${search}`);
            if (res) {
                setData(res?.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleAddNewForm = () => {
        setFormType({ open: true, type: FORM_TYPE.CREATED });
        setUpdateData(null);
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
            const res = await AppoimentServer.deleteAppoiment(`${id}`);
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

    const handleFormChange = async (e) => {
        try {
            const res = await AppoimentServer.searchAppoiment(`?q=${e}`);
            if (res) {
                setData(res?.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleExportToExcel = () => {
        // Tạo dữ liệu Excel từ 'data'
        const exportData = data.map((item) => ({
            'Tên khách hàng': item.tenKH,
            'Số điện thoại': item.sdt,
            'Ngày hẹn': item.ngayHen,
            'Thời gian': item.gioHen,
            'Tên DV': item.name.join(', '), // Kết hợp các phần tử trong mảng 'name' thành chuỗi
            'Ghi chú': item.tinhTrangHienTai,
            'Ngày đăng ký': formatted(item.createdAt),
            'Trạng thái': item.status,
            'Kết quả': item.result,
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
        link.setAttribute('download', 'appointment_data.xlsx');
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
                            <Select
                                placeholder="Nhập trạng thái của lịch hẹn"
                                defaultValue="Tất cả"
                                style={{
                                    width: 140,
                                    height: 36,
                                }}
                                onChange={(e) => handleFormChange(e)}
                            >
                                <Option value="">Tất cả</Option>
                                <Option value="Đã xác nhận">Đã xác nhận</Option>
                                <Option value="Chưa xác nhận">Chưa xác nhận</Option>
                                <Option value="Thành công">Thành công</Option>
                                <Option value="Thất bại">Thất bại</Option>
                            </Select>
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
                        <Table columns={columns} dataSource={data} size="small" scroll={{ x: 2000, y: 300 }} />
                    </div>
                </>
            ) : (
                <AppoimentForm
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

export default AppointmentAdmin;
