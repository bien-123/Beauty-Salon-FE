import React from 'react';
import { BellFilled } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Popover, Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { useMemo } from 'react';

import { getDataLocalStorage, removeLocalStorage } from '../../auth';
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
            case '/adminstaff':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý nhân viên',
                        href: '/adminstaff',
                    },
                ];
            case '/admincustomer':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý khách hàng',
                        href: '/admincustomer',
                    },
                ];
            case '/adminservices':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý dịch vụ',
                        href: '/adminservices',
                    },
                ];
            case '/adminappointment':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý lịch hẹn',
                        href: '/adminappointment',
                    },
                ];
            case '/adminbill':
                return [
                    ...listBreadCrumbDefault,
                    {
                        title: 'Quản lý hóa đơn',
                        href: '/adminbill',
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

    return (
        <Header className="bg-white px-5 flex items-center justify-between">
            <div>
                <Breadcrumb separator=">" items={listBreadCrumbItems} />
            </div>
            <div className="flex items-center h-full space-x-3">
                <BellFilled />
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                <div className="flex flex-col leading-none">
                    <p className="text-sm font-bold">{dataUser?.maNV}</p>
                    <p>{dataUser?.PQ}</p>
                </div>
                <Popover
                    content={
                        <Button onClick={handleLogOut} className="w-full">
                            Logout
                        </Button>
                    }
                    title={
                        <div className="flex flex-col items-center">
                            <p>{dataUser?.maNV}</p>
                            <p className="font-normal">{dataUser?.PQ}</p>
                        </div>
                    }
                    trigger="click"
                    //   open={open}
                    //   onOpenChange={handleOpenChange}
                >
                    <p className="cursor-pointer text-lg font-bold border-none p-2">...</p>
                </Popover>
            </div>
        </Header>
    );
};
export default HeaderAdmin;
