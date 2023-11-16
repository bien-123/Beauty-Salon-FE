import { Layout } from 'antd';

import HeaderAdmin from '../HomeLayoutAdmin/HeaderAdmin';
import SiderAdmin from '../HomeLayoutAdmin/SiderAdmin';

const AppointmentAdmin = () => {
    const { Content } = Layout;
    return (
        <>
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
                        HHHHHH
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default AppointmentAdmin;
