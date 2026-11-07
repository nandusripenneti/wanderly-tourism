function DestinationCard({ destination, onBook }) {
  return (
    <div className="card">
      <img src={destination.image} alt={destination.name} />

      <div className="card-content">
        <h3>{destination.name}</h3>
        <p>{destination.country}</p>
        <h4>Starting from ₹{destination.price}</h4>

        <button onClick={() => onBook(destination, "Destination")}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default DestinationCard;