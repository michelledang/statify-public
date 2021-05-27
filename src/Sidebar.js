import React, { Component } from 'react';
import { CHART_TYPES, TIME_RANGES } from './constants';
import './Sidebar.css';

class Sidebar extends Component {
  getTextClass(text) {
    if (this.props.current === text) {
      return 'sidebar-selected';
    }
    return 'sidebar-unselected';
  }

  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          <img
            className="sidebar-img"
            src={
              this.props.me.images[0]
                ? this.props.me.images[0].url
                : 'https://michelledang.github.io/statify/favicon.png'
            }
          />
          <div className="sidebar-header-title">
            <h3 className="sidebar-title">Statify</h3>
            <h4 className="sidebar-text">
              Made for {this.props.me.display_name}!
            </h4>
          </div>
        </div>
        <div className="sidebar-options">
          <p className="sidebar-text">Data Type:</p>
          <select
            id="data-type"
            name="data-type"
            onChange={(e) => {
              this.props.handleCurrentSelection(e.target.value);
            }}
          >
            {Object.keys(CHART_TYPES).map((key) => {
              return (
                <option key={key} value={CHART_TYPES[key]}>
                  {CHART_TYPES[key]}
                </option>
              );
            })}
          </select>
        </div>
        <div className="sidebar-options">
          <p className="sidebar-text">Time Range:</p>
          <select
            id="time-range"
            name="time-range"
            onChange={(e) => {
              this.props.handleTimeSelection(e.target.value);
            }}
          >
            {Object.keys(TIME_RANGES).map((key) => {
              return (
                <option key={key} value={TIME_RANGES[key]}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default Sidebar;
