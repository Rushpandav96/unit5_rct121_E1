import styles from "./CandidateCard.module.css";

function CandidateCard({ candidate }) {
  return (
    <div data-testid="candidate-container" className={styles.container}>
      <img alt="logo" width="100px" height="100px" src={candidate.avatar} />
      <div>
        <div>Name: {candidate.name}</div>
        <div>
          {candidate.title} , {candidate.company_name}
        </div>
      </div>
      <div>$ {candidate.salary}</div>
    </div>
  );
}

export default CandidateCard;
