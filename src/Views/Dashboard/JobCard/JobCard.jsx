import CompanyProfile from "./CompanyProfile";

import styles from "./styles.module.css";

import { isNull } from "../../../utils";

const JobCard = ({ job = {} } = {}) => {
  const { jobDetailsFromCompany = "", ...rest } = job || {};

  return (
    <div className={styles.job_card}>
      <div>
        <CompanyProfile {...rest} />
      </div>

      <div className={styles.estimated_salary_container}>
        <div>Estimated Salary: </div>
        {/* check for null is necessary as to know if value is present with the data as there can be cases of value to be 0 so direct conditioning check wont work  */}
        <div>
          {`
          ${isNull(job?.salaryCurrencyCode) ? "" : job?.salaryCurrencyCode}
          ${isNull(job?.minJdSalary) ? "" : `${job?.minJdSalary}`}
          ${!(isNull(job?.minJdSalary) && isNull(job?.maxJdSalary)) ? "-" : ""}
          ${isNull(job?.maxJdSalary) ? "" : `${job?.maxJdSalary}`} K`}
        </div>
      </div>

      <div className={styles.job_details_view_more_container}>
        <div className={styles.job_details_container}>
          <div className={styles.job_details_heading}>About Company : </div>
          <div className={styles.job_details_text}>{jobDetailsFromCompany}</div>
        </div>

        <div className={styles.view_more_container}>
          <button className={styles.view_more_btn}>Show More</button>
        </div>
      </div>

      {isNull(job?.minExp) ? null : (
        <div>
          <div className={styles.min_exp_heading}>Minimum Experience</div>
          <div>{job?.minExp} years</div>
        </div>
      )}

      <div>
        <button className={styles.apply_btn}>⚡️ Easy Apply</button>
      </div>
    </div>
  );
};

export default JobCard;
