import React from "react";

//AntD imports
import { Layout, theme } from "antd";

const { Footer } = Layout;

const FooterAll = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Created by We are the S.H.E.T. ©2023
            </Footer>
        </Layout>
    );
};

export default FooterAll;