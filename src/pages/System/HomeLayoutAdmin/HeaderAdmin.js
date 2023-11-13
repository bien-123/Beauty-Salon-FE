import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

const HeaderAdmin = ({ colorBgContainer }) => {
    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        ></Header>
    );
};
export default HeaderAdmin;
