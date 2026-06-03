import React, { useState } from 'react';
import { BellFilled } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Popover, Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getDataLocalStorage, removeLocalStorage } from '../../constans/auth';
import config from '../../config';
import ModalChangePassword from '../../pages/System/Account/ModalChangePassword';
const { Header } = Layout;

const listBreadCrumbDefault = [
    {
        title: 'Dashboard',
    },
];

const HeaderAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dataUser = getDataLocalStorage();

    const listBreadCrumbItems = useMemo(() => {
        switch (location.pathname) {
            case '/admin-staff':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý nhân viên',
                        href: '/admin-staff',
                    },
                ];
            case '/admin-customer':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý khách hàng',
                        href: '/admin-customer',
                    },
                ];
            case '/admin-services':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý dịch vụ',
                        href: '/admin-services',
                    },
                ];
            case '/admin-appointment':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý lịch hẹn',
                        href: '/admin-appointment',
                    },
                ];
            case '/admin-bill':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý hóa đơn',
                        href: '/admin-bill',
                    },
                ];
            case '/admin-account':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý tài khoản',
                        href: '/admin-account',
                    },
                ];
            case '/admin-welcome':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Phân công tiếp khách hàng',
                        href: '/admin-welcome',
                    },
                ];
            case '/admin-department':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý khoa',
                        href: '/admin-department',
                    },
                ];
            default:
                return listBreadCrumbDefault;
        }
    }, [location.pathname]);

    const handleLogOut = () => {
        navigate('/');
        removeLocalStorage();
    };

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true); // Khi click vào "Logout", hiển thị modal
        // Ngoài ra, bạn có thể thực hiện các logic khác ở đây, như gọi API để logout, xoá dữ liệu local, vv.
    };

    const handleCloseModal = () => {
        setShowModal(false); // Đóng modal khi cần
    };

    return (
        <Header className="bg-white px-5 flex items-center justify-between">
            <div>
                <Breadcrumb separator=">" items={listBreadCrumbItems} />
            </div>
            <div className="flex items-center h-full space-x-3">
                <div className="bell-wrapper">
                    <BellFilled className="bell-icon" />
                    <span className="badge">50</span>
                </div>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                <div className="flex flex-col leading-none">
                    <p className="text-sm font-bold">{dataUser?.maNV}</p>
                    <p>{dataUser?.PQ}</p>
                </div>
                <Popover
                    content={
                        <div>
                            <Link to={config.routes.home}>
                                <Button className="w-full mb-2">Trang chủ</Button>
                            </Link>
                            <Button onClick={handleOpenModal} className="w-full mb-2">
                                Đổi mật khẩu
                            </Button>
                            <Button onClick={handleLogOut} className="w-full">
                                Logout
                            </Button>
                        </div>
                    }
                    title={
                        <div className="flex flex-col items-center">
                            <p>{dataUser?.maNV}</p>
                            <p className="font-normal">{dataUser?.PQ}</p>
                        </div>
                    }
                    trigger="click"
                >
                    <p className="cursor-pointer text-lg font-bold border-none p-2">...</p>
                </Popover>
                {showModal && (
                    <ModalChangePassword open={showModal} handleClose={handleCloseModal} maNV={dataUser?.maNV} />
                )}
            </div>
        </Header>
    );
};
export default HeaderAdmin;
