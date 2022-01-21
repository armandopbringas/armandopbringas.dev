import { jobExperiences } from '../../content/experience.content'
import styles from './experience.module.css'

const Experience = () => {
  return (
    <div className={styles['experience-container']}>
      <h2 className={styles['experience-title']}>Experience</h2>
      <div className={styles['experience-card-container']}>
        {jobExperiences.map((job, index) => (
          <div key={index} className={styles['experience-job-card']}>
            <h3 className={styles['job-card-position']}>
              {job.jobPosition}
            </h3>
            <p className={styles['job-card-company']}>
              Company: {job.company}
            </p>
            <p className={styles['job-card-time']}>
              {job.timeJob}
            </p>
            <p className={styles['job-card-description']}>
              {job.jobDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default Experience;