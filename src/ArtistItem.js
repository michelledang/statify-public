import React from "react";
import "./Chart.css";

const ArtistItem = props => {

  return (
    <div className="chart-item">
        <img className="chart-img" src={props.imageUrl} />
        <p>{props.name}</p>
    </div>
  );
}

export default ArtistItem;