import React from 'react';
import './Chart.css';

const MoodItem = (props) => {
  return (
    <div className="chart-item">
      <p className="chart-item-title chart-item-text">{props.name}</p>
      <p className="chart-item-subtitle">
        {parseFloat(props.value).toFixed(2)}
      </p>
    </div>
  );
};

export default MoodItem;
