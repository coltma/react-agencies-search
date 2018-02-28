import React, { Component } from 'react';
import SearchAgency from './containers/SearchAgency';
import './App.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div>
      <Layout>
        <Header style={{background: '#e1f2ee'}}><div className="logo">
          <img
            src="https://webassets.amne.co/3.0/AmneLogo.png"
            alt="Amne Logo" style={{height: 35}}/></div></Header>
        <Content><SearchAgency /></Content>
        <Footer></Footer>
      </Layout>
      </div>
    );
  }
}

export default App;
