import studies from '../../content/education.content'
import styles from './education.module.css'

const EducationCard = () => {
  return (
    <>
      {studies.map((item, index) => {
        return (
          <div className={styles['eduaction-job-card']} key={index}>
            <p className={styles['job-card-degree']}>{item.degree}</p>
            <p className={styles['job-card-school']}>{item.school}</p>
            <p className={styles['job-card-date']}>{item.date}</p>
            <div className={styles['education-tech-items']}>
              <ul>
                <h3 className={styles['subject-title']}>{item.frontendTitle}</h3>
                {item.frontend?.map((techItem, index) => {
                  return (
                    <li 
                      key={index}
                      className={styles['education-tech-item']} 
                    >
                      {techItem}
                    </li>
                  );
                })}
              </ul>
              <ul>
                <h3 className={styles['subject-title']}>{item.backendTitle}</h3>
                {item.backend?.map((techItem, index) => {
                  return (
                    <li 
                      key={index}
                      className={styles['education-tech-item']} 
                    >
                      {techItem}
                    </li>
                  );
                })}
              </ul>
            </div>
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
      <EducationCard />
    </section>
  );
}

export default Education;