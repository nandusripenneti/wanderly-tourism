function ServiceCard({ item, type, onBook }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.name} />

      <div className="card-content">
        <h3>{item.name}</h3>

        <p>
          {type === "Hotel" ? item.location : item.type}
        </p>

        <h4>₹{item.price} / {type === "Hotel" ? "night" : "day"}</h4>

        <button onClick={() => onBook(item, type)}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;