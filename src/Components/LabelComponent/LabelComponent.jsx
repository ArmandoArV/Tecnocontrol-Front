const InfoItem = ({ label, value }) => (
  <div className="infoContainer">
    <div className="infoLabel">
      <p>{label}:</p>
    </div>
    <div className="infoValue">{value}</div>
  </div>
);

export default InfoItem;
