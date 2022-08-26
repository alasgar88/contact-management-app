import "./shared-layout.scss";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  DeleteFilled,
  ContactsFilled,
  StarFilled,
} from "../../assets/icons/icons";
import { useGlobalContext } from "../../context/context";
const { Header, Content, Sider } = Layout;

const items1 = [
  <NavLink to='/contacts'>Əlaqələr</NavLink>,
  <NavLink to='/contacts/new'>Yeni Əlaqə yarat</NavLink>,
].map((menuItem, index) => ({
  key: index,
  label: menuItem,
}));

const SharedLayout = () => {
  const { addTableType } = useGlobalContext();
  const [menuKey, setMenuKey] = useState(0);

  let url = useLocation().pathname;
  if (url === "/" || url === "/contacts") {
    url = true;
  } else {
    url = false;
  }

  useEffect(() => {
    const number = url ? 0 : 1;
    setMenuKey(number);
  }, [url]);

  const tableTypeList = ["", "all", "selected", "recycle"];
  return (
    <div className='main-container'>
      <Layout className='layout'>
        <Header className='header'>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={["0"]}
            items={items1}
            selectedKeys={[`${menuKey}`]}
          />
        </Header>
        <Layout>
          <Sider trigger={null} collapsible>
            {url && (
              <Menu
                theme='dark'
                mode='inline'
                defaultSelectedKeys={["1"]}
                onClick={(info) => {
                  addTableType(tableTypeList[info.key]);
                }}
                items={[
                  {
                    key: "1",
                    icon: (
                      <ContactsFilled
                        style={{ fontSize: "17px", color: "white" }}
                      />
                    ),
                    label: "Bütün əlaqələr",
                  },
                  {
                    key: "2",
                    icon: (
                      <StarFilled
                        style={{ fontSize: "17px", color: "white" }}
                      />
                    ),
                    label: "Seçilmiş əlaqələr",
                  },
                  {
                    key: "3",
                    icon: (
                      <DeleteFilled
                        style={{ fontSize: "17px", color: "white" }}
                      />
                    ),
                    label: "Çöp qutusu",
                  },
                ]}
              />
            )}
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Content
              className='site-layout-background'
              style={{
                padding: 24,
                margin: 0,
                marginTop: "16px",
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default SharedLayout;
