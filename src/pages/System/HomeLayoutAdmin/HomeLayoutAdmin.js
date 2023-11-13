// import { Link } from 'react-router-dom';
// import config from '../../../config';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../auth.js';
import { useEffect } from 'react';
// const HomeLayoutAdmin = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Kiểm tra trạng thái đăng nhập
//         if (!isAuthenticated()) {
//             // Nếu không đăng nhập, chuyển hướng về trang đăng nhập
//             navigate('/login');
//         }
//     }, [navigate]);
//     return (
//         <>
//             <>Đây là trang Admin</>
//             <Link to={config.routes.home}>Trở về trang chủ</Link>
//         </>
//     );
// };

// export default HomeLayoutAdmin;

import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { Link } from 'react-router-dom';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

import HeaderAdmin from './HeaderAdmin';
import logo from '../../../assets/logo/index.jsx';
const { Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // Kiểm tra trạng thái đăng nhập
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated()) {
            // Nếu không đăng nhập, chuyển hướng về trang đăng nhập
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div
                    className={`flex items-center ${
                        collapsed ? 'flex-col space-y-3' : 'flex-row justify-between'
                    } py-4 px-4`}
                >
                    <Link to="/" className={`flex items-center ${collapsed ? 'flex flex-col space-y-3' : 'space-x-2'}`}>
                        <img src={logo.LogoGlobalAdmin} alt="Logo Global" />
                        {!collapsed && <p className="text-white text-lg font-bold text-center">Log System</p>}
                    </Link>
                    <Button
                        type="text"
                        icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                        }}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <HeaderAdmin colorBgContainer={colorBgContainer} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;
