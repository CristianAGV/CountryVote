import "./VoteSuccessMessage.css";
import checkIcon from "../../assets/Check.svg";

export default function VoteSuccessMessage() {
  return (
    <div className="voteSuccessMessage">
      <img src={checkIcon} alt="success" />
      <p>Your vote was succesfully submitted</p>
    </div>
  );
}
