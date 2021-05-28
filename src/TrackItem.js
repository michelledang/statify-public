import React from 'react';
import './Chart.css';

const TrackItem = (props) => {
  return (
    <div className="chart-item">
      <p className="chart-item-number">{props.index}</p>
      <img className="chart-img-album" src={props.imageUrl} />
      <div className="chart-item-title-subtitle chart-item-text">
        <p className="chart-item-title">{props.name}</p>
        <p className="chart-item-subtitle">{props.artist}</p>
      </div>
    </div>
  );
};

export default TrackItem;
