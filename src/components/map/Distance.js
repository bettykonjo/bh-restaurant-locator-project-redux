const secondsPerDay = 60 * 60 * 24;

export default function Distance({ leg }) {
  if (!leg.distance || !leg.duration) return null;

  return (
    <div style={{border:"1rem solid dark-gray;"}}>
      <p>
        This restaurant is <span className="highlight">{leg.distance.text}</span> away
        from your location. That would take{" "}
        <span className="highlight">{leg.duration.text}</span> each direction.
      </p>
    </div>
  );
}