import "./LobbyPlayersList.css";

const LobbyPlayersList = ({ players }) => {
  return (
    <div className="lobby__players">
      {players.map((player, index) => {
        return <div className="lobby__player">{index}</div>;
      })}
    </div>
  );
};

export default LobbyPlayersList;
