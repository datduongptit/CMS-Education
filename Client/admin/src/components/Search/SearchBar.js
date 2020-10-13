import React, { Component } from 'react';
import { Input } from 'antd';
const { Search } = Input;

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <Search
          placeholder='Search here'
          enterButton='Search'
          size='medium'
          onSearch={(value) => console.log(value)}
        />
      </div>
    );
  }
}
