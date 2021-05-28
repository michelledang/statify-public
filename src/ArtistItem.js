import React from 'react';
import './Chart.css';

const ArtistItem = (props) => {
  return (
    <div className="chart-item">
      <p className="chart-item-number">{props.index}</p>
      <img className="chart-img" src={props.imageUrl} />
      <p className="chart-item-title chart-item-text">{props.name}</p>
    </div>
  );
};

export default ArtistItem;
