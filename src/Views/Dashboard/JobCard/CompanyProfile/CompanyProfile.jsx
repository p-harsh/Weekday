import styles from "./styles.module.css";

const CompanyProfile = (props) => {
  const {
    companyName = "",
    jobRole = "",
    location = "",
    logoUrl = "",
  } = props || {};

  return (
    <div className={styles.company_profile_container}>
      <div className={styles.company_logo}>
        {logoUrl ? (
          <img src={logoUrl} width="28" height="28" />
        ) : (
          <div className={styles.empty_logo}></div>
        )}
      </div>
      <div className={styles.detail_container}>
        {companyName ? (
          <h3 className={styles.company_name}>{companyName}</h3>
        ) : null}
        {jobRole ? <div className={styles.job_role}>{jobRole}</div> : null}
        {location ? <div className={styles.location}>{location}</div> : null}
      </div>
    </div>
  );
};

export default CompanyProfile;
