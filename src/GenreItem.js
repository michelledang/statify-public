import React from 'react';
import './Chart.css';

const GenreItem = (props) => {
  return (
    <div className="chart-item">
      <p className="chart-item-number">{props.index}</p>
      <p className="chart-item-title chart-item-text">{props.name}</p>
      <p className="chart-item-subtitle">
        {parseFloat(props.percent * 100).toFixed(0) + '%'}
      </p>
    </div>
  );
};

export default GenreItem;
