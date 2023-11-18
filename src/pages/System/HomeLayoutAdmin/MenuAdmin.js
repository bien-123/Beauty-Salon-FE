import {
    CustomerServiceOutlined,
    ExclamationCircleFilled,
    HomeOutlined,
    ProfileOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useMemo } from 'react';

const getItem = (label, key, icon, children) => {
    return {
        key,
        icon,
        children,
        label,
    };
};

const items = [
    getItem(<Link to="/adminstaff">Quản Lý Nhân Viên</Link>, '1', <HomeOutlined className="text-lg" />),
    getItem(<Link to="/admincustomer">Quản Lý Khách Hàng</Link>, '2', <CustomerServiceOutlined />),
    getItem(<Link to="/adminservices">Quản Lý Dịch Vụ</Link>, '3', <ExclamationCircleFilled />),
    getItem(<Link to="/adminappointment">Quản Lý Lịch Hẹn</Link>, '4', <ProfileOutlined />),
    getItem(<Link to="/adminbill">Quản Lý Hóa Đơn</Link>, '5', <SettingOutlined />),
];

const MenuAdmin = () => {
    const location = useLocation();

    const selectedMenuKey = useMemo(() => {
        switch (location.pathname) {
            case '/':
                return ['1'];
            case '/logs':
                return ['2'];
            case '/break':
                return ['3'];
            case '/log':
                return ['4'];
            case '/breaks':
                return ['5'];
            default:
                return ['1'];
        }
    }, [location.pathname]);

    return (
        <Menu theme="dark" selectedKeys={selectedMenuKey} mode="inline">
            {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );
};

export default MenuAdmin;
