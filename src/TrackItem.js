import React from "react";
import "./Chart.css";

const TrackItem = props => {

  return (
    <div className="chart-item">
        <img className="chart-img-album" src={props.imageUrl} />
        <p className="chart-item-title">{props.name}</p>
        <p className="chart-item-subtitle">{props.artist}</p>
    </div>
  );
}

export default TrackItem;