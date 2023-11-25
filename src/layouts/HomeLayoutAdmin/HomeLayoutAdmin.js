import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../constans/auth.js';
import React, { useEffect } from 'react';
import { Layout } from 'antd';

import HeaderAdmin from './HeaderAdmin';
import SiderAdmin from './SiderAdmin.js';

const { Content } = Layout;

const HomeLayoutAdmin = ({ children }) => {
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
            <SiderAdmin />
            <Layout>
                <HeaderAdmin />
                <Content
                    style={{
                        padding: 24,
                        backgroundColor: '#F5F7FF',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default HomeLayoutAdmin;
