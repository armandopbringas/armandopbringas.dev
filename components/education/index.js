import studies from '../../content/education.content'
import styles from './education.module.css'

const EducationCard = () => {
  return (
    <>
      {studies.map((item, index) => {
        return (
          <div className={styles['eduaction-job-card']} key={index}>
            <h2 className={styles['job-card-degree']}>{item.degree}</h2>
            <p className={styles['job-card-school']}>{item.school}</p>
            <p className={styles['job-card-date']}>{item.date}</p>
            <p className={styles['education-tech-decription']}>
              {item.bootcamDescription}
            </p>
            <p className={styles['education-tech-decription']}>
              {item.description}
            </p>
          </div>
        );
      })}
    </>
  );
}

const Education = () => {
  return (
    <section className={styles['education-container']}>
      <h2 className={styles['education-section-title']}>
        Studies
      </h2>
      <div className={styles['experience-card-container']}>
        <EducationCard />
      </div>
    </section>
  );
}

export default Education;
