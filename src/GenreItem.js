import React from "react";
import "./Chart.css";

const GenreItem = props => {

  return (
    <div className="chart-item">
        <p className="chart-item-genre">{props.name}</p>
        <p className="chart-item-number">{props.score}</p>
    </div>
  );
}

export default GenreItem;