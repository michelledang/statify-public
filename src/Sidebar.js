import React, { Component } from 'react';
import { TIME_RANGES } from './constants';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-header-title">
          <h3 className="sidebar-title">Statify</h3>
          <h4 className="sidebar-text">for {this.props.me.display_name}!</h4>
        </div>
        <img
          className="sidebar-img"
          src={
            this.props.me.images[0]
              ? this.props.me.images[0].url
              : 'https://michelledang.github.io/statify/favicon.png'
          }
        />
      </div>
    );
  }
}

export default Sidebar;
