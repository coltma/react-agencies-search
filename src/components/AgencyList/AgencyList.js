import React from 'react';
import { List, message, Spin } from 'antd';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
import './AgencyList.css';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class AgencyList extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  }
  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }
  componentWillMount() {
    this.getData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }
  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
};

export default AgencyList;
