import React from 'react';
import { List, message, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './AgencyList.css';

class AgencyList extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  }
  getData = (callback) => {
    callback(this.state.data);
  }

  handleInfiniteOnLoad = () => {
    let data = this.props.sortedAgencyList;
    this.setState({
      loading: true,
    });
    if (data.length === 0) {
      message.info('Seems no agency available', 1);
      return;
    }
    if (data.length > 14) {
      message.warning('Agency List loaded all', 1);
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
            dataSource={this.props.sortedAgencyList}
            renderItem={(item, index) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={<a onClick={(e) => this.props.handleAgencySelect(e, item)}>{`${index + 1}) `}{item.name}</a>}
                  description={`${item.getDistance().toFixed(2)}miles`}
                />
              </List.Item>
            )}
          >
          </List>
        </InfiniteScroll>
      </div>
    );
  }
};

export default AgencyList;
