// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';

// const MenuAdmin = () => {
//     return (
//         <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             items={[
//                 {
//                     key: '1',
//                     icon: <UserOutlined />,
//                     label: 'Quản lý nhân viên',
//                 },
//                 {
//                     key: '2',
//                     icon: <VideoCameraOutlined />,
//                     label: 'Quản lý khách hàng',
//                 },
//                 {
//                     key: '3',
//                     icon: <UploadOutlined />,
//                     label: 'Quản lý dịch vụ',
//                 },
//                 {
//                     key: '4',
//                     icon: <UploadOutlined />,
//                     label: 'Quản lý lịch hẹn',
//                 },
//                 {
//                     key: '5',
//                     icon: <UploadOutlined />,
//                     label: 'Quản lý hóa đơn',
//                 },
//             ]}
//         />
//     );
// };

// export default MenuAdmin;

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
    getItem(<Link to="/admin">Quản Lý Nhân Viên</Link>, '1', <HomeOutlined className="text-lg" />),
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
