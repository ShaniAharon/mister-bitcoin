export function MoveList({moveList, contact, title}) {
  return (
    <section className="move-list">
      <h2>{title}</h2>
      {contact && (
        <div>
          {moveList.map((move, idx) =>
            move.toId === contact._id ? (
              <div className="move-card" key={idx + move.at}>
                <p>At:{move.at}</p>
                <p>Amount:{move.amount}</p>
              </div>
            ) : (
              ''
            )
          )}
        </div>
      )}
      {!contact && (
        <div>
          {moveList.slice(0, 3).map((move, idx) => (
            <div className="move-card" key={idx + move.at}>
              <p>To: {move.to}</p>
              <p>At: {move.at}</p>
              <p>Amount: {move.amount}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
