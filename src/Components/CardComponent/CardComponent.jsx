import React from "react";
import "./CardComponent.css";
import tesla from "../../images/tesla.png";

export default function CardComponent({ onClick, vehicleName, placas }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="leftContainer">
        <img src={tesla} alt="Vehicle" />
      </div>
      <div className="middleContainer">
        <h2>{vehicleName}</h2>
      </div>
      <div className="rightContainer">{placas}</div>
    </div>
  );
}
