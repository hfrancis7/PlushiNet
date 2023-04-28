import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "../Nav/Nav.css";

//AntD imports
import { Layout, Menu } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, SmileOutlined } from '@ant-design/icons';

const { Header } = Layout;

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Layout className="layout">
          <Header className="navHome">

            <div className="logo"
              style={{ float: 'left' }} >
              <img className="logoImg" src="/images/logo192.png" alt="PlushiNet" width="50" height="50" />
            </div>

            <Menu
              className="navHome"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={[
                {
                  label: <Link to="/">Home</Link>,
                  key: "home",
                  icon: <HomeOutlined twoToneColor="#5784ba" />
                },
                {
                  label: <Link to="followers">Following</Link>,
                  key: "followers",
                  icon: <SmileOutlined twoToneColor="#5784ba" />
                },
                {
                  label: (<a href="/" onClick={() => Auth.logout()}>Logout</a>),
                  key: "logout",
                  icon: <LogoutOutlined twoToneColor="#5784ba" />
                },
                {
                  label: <Link to="/createPost">Create Post</Link>,
                  key: "createPost",
                  icon: <SmileOutlined twoToneColor="#5784ba" />
                }
              ]}
            />
          </Header>
        </Layout>
      );
    } else {
      return (
        <Layout className="layout">
          <Header className="navHome">
            <div className="logo"
              style={{ float: 'left' }} >
              <img className="logoImg" src="/images/logo192.png" alt="PlushiNet" width="50" height="50" />
            </div>
            <Menu
              className="navHome"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={[
                {
                  label: <Link to="/">Home</Link>,
                  key: "home",
                  icon: <HomeOutlined twoToneColor="#5784ba" />
                },
                {
                  label: <Link to="/login">Login</Link>,
                  key: "login",
                  icon: <LoginOutlined twoToneColor="#5784ba" />
                },
                {
                  label: <Link to="/register">Sign Up</Link>,
                  key: "signup",
                  icon: <UserAddOutlined twoToneColor="#5784ba" />
                }
              ]}
            />
          </Header>
        </Layout >
      );
    }
  }

  return (
    <Header className="navHome">
      <nav>
        {showNavigation()}
      </nav>
    </Header>
  );
}

export default Nav;
