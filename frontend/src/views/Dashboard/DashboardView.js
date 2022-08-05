import { Link } from "react-router-dom";

const DashboardView = () => {
  return (
    <Link to="/play">
      <button className="play-btn">Graj ze znajomym</button>
    </Link>
  );
};

export default DashboardView;
