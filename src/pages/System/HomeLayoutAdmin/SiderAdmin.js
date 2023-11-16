import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useState } from 'react';

import logo from '../../../assets/logo/index.jsx';
import MenuAdmin from './MenuAdmin.js';

const { Sider } = Layout;
const SiderAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <div
                className={`flex items-center ${
                    collapsed ? 'flex-col space-y-3' : 'flex-row justify-between'
                } py-4 px-4`}
            >
                <Link
                    to="/admin"
                    className={`flex items-center ${
                        collapsed ? 'flex flex-col space-y-3' : 'space-x-2 w-[70%] justify-between'
                    }`}
                >
                    <img src={logo.LogoGlobalAdmin} alt="Logo Global" />
                    {!collapsed && <p className="text-white text-lg font-bold text-center">Beauty</p>}
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
            <MenuAdmin />
        </Sider>
    );
};

export default SiderAdmin;
