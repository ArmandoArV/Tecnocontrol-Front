import React from "react";

export default function CardComponent(props) {
  return (
    <div className="card">
      <div className="leftContainer">
        <img src={props.img} alt={props.alt} />
      </div>
      <div className="middleContainer">
        <h2>{props.vehicleName}</h2>
      </div>
      <div className="rightContainer">
        {props.status ? <h3>Available</h3> : <h3>Not Available</h3>}
      </div>
    </div>
  );
}
