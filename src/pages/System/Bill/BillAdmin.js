import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, notification, Tag } from 'antd';
import dayjs from 'dayjs';

import BillServer from '../../../services/bill';
import logo from '../../../assets/logo/index';
import BillForm from './BillForm';
import { formatNumber } from '../../../constans/shared';
import * as XLSX from 'xlsx';

const BillAdmin = () => {
    const columns = [
        {
            title: 'Mã HĐ',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <>{text}</>,
            width: 150,
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Mã KH',
            dataIndex: 'maKH',
            key: 'maKH',
            render: (text) => <>{text}</>,
            width: 50,
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenKH',
            key: 'tenKH',
            render: (text) => <>{text}</>,
            width: 100,
            align: 'center',
        },
        {
            title: 'Loại khách hàng',
            dataIndex: 'loaiKH',
            key: 'loaiKH',
            render: (text) => <>{text}</>,
            width: 70,
            align: 'center',
        },
        {
            title: 'Mã DV',
            dataIndex: 'maDV',
            key: 'maDV',
            width: 150,
            align: 'center',
            render: (_, { maDV }) => (
                <>
                    {maDV.map((tag) => {
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
            title: 'Tên DV',
            dataIndex: 'tenDV',
            key: 'tenDV',
            width: 200,
            align: 'center',
        },
        {
            title: 'Giá',
            key: 'gia',
            dataIndex: 'gia',
            width: 80,
            align: 'center',
            render: (text) => <>{formatNumber(Number(text))} VNĐ</>,
        },
        {
            title: 'Khuyến mãi',
            key: 'sale',
            dataIndex: 'sale',
            width: 70,
            align: 'center',
            render: (text) => {
                if (text > 100) {
                    return <>{formatNumber(Number(text))} VNĐ</>;
                } else {
                    return <span>{text} %</span>;
                }
            },
        },
        {
            title: 'Tổng tiền',
            key: 'tongTien',
            dataIndex: 'tongTien',
            width: 100,
            align: 'center',
            render: (text) => <>{formatNumber(Number(text))} VNĐ</>,
        },
        {
            title: 'Phương thức',
            key: 'phuongThuc',
            dataIndex: 'phuongThuc',
            width: 80,
            align: 'center',
        },
        {
            title: 'Ghi chú',
            key: 'ghiChu',
            dataIndex: 'ghiChu',
            width: 70,
            align: 'center',
        },
        {
            title: 'Mã NV',
            key: 'maNV',
            dataIndex: 'maNV',
            width: 70,
            align: 'center',
        },
        {
            title: 'Ngày tạo',
            key: 'createdAt',
            dataIndex: 'createdAt',
            width: 70,
            align: 'center',
            render: (text) => {
                return <span>{formatted(text)}</span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Space size="middle">
                    <img
                        src={logo.IconEdit}
                        alt="Icon edit"
                        className="cursor-pointer"
                        onClick={() => handleUpdateForm(record)}
                    ></img>
                    <img
                        src={logo.IconExportExcel}
                        alt="Icon export excel"
                        className="cursor-pointer"
                        onClick={() => handleExportDetailBill(record)}
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
    const [dataId, setDataId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [updateData, setUpdateData] = useState(null);

    const formatted = (dateStr) => {
        const vnTime = dayjs.utc(dateStr).utcOffset(+7).format('YYYY-MM-DD');
        return vnTime;
    };

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
            const res = await BillServer.searchBill(`?q=${search}`);
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
            const res = await BillServer.deleteBill(`${dataId}`);
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
            'Mã HĐ': item._id,
            'Mã KH': item.maKH.join(', '),
            'Tên khách hàng': item.tenKH,
            'Loại khách hàng': item.loaiKH,
            'Mã DV': item.maDV.join(', '),
            'Tên DV': item.tenDV,
            Giá: item.gia,
            'Khuyến mãi': item.sale,
            'Tổng tiền': item.tongTien,
            'Phương thức': item.phuongThuc,
            'Ghi chú': item.ghiChu,
            'Mã NV': item.maNV,
            'Ngày tạo': item.createdAt,
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
        link.setAttribute('download', 'bill_data.xlsx');
        document.body.appendChild(link);

        // Simulate click để tải xuống
        link.click();

        // Xóa link sau khi đã tải xuống
        document.body.removeChild(link);
    };

    const handleExportDetailBill = (item) => {
        const formattedSale = item.sale > 100 ? `${formatNumber(Number(item.sale))} VNĐ` : `${item.sale} %`;
        const formattedTotal = `${formatNumber(Number(item.tongTien))} VNĐ`;
        const formattedCreatedAt = formatted(item.createdAt);

        const exportDataDetail = [
            ['Thông tin chi tiết hóa đơn'],
            ['Mã HĐ:', item._id],
            ['Mã KH:', item.maKH.join(', ')],
            ['Tên khách hàng:', item.tenKH],
            ['Loại khách hàng:', item.loaiKH],
            ['Mã dịch vụ:', item.maDV.join(', ')],
            ['Tên dịch vụ:', item.tenDV],
            ['Giá:', `${formatNumber(Number(item.gia))} VNĐ`],
            ['Khuyến mãi:', formattedSale],
            ['Tổng tiền:', formattedTotal],
            ['Phương thức thanh toán:', item.phuongThuc],
            ...(item.ghiChu ? [['', '']] : []), // Tạo một hàng trống nếu có ghi chú để căn chỉnh dữ liệu
            ...(item.ghiChu ? [['Ghi chú:', item.ghiChu]] : []), // Kiểm tra và thêm ghi chú nếu tồn tại giá trị
            ['Mã NV:', item.maNV],
            ['Ngày tạo:', formattedCreatedAt],
        ];

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(exportDataDetail);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DetailBill');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'detail_bill_data.xlsx');
        document.body.appendChild(link);
        link.click();
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
                        <Table columns={columns} dataSource={data} size="small" scroll={{ x: 3000, y: 300 }} />;
                    </div>
                </>
            ) : (
                <BillForm
                    formType={formType}
                    setFormType={setFormType}
                    updateData={updateData}
                    fetchData={fetchData}
                    scroll={{ y: 490 }}
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

export default BillAdmin;
