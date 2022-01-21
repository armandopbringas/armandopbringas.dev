import skillsContent from '../../content/skills.content'
import styles from './skills.module.css'

const Skills = ({ aboutLenguagesSkills, aboutFrameworksSkills } = skillsContent) => {
  return (
    <div className={styles['skills-container']}>
      <h2 className={styles['skills-title']}>Skills</h2>
      <div className={styles['skills-items-container']}>
        <ul className={styles['lenguages-container']}>
          <h3 className={styles['lenguages-title']}>
            Technologies stack
          </h3>
          {aboutLenguagesSkills.map((lenguageSkill, index) => (
            <li className={styles['skills-items']} key={index}>
              {lenguageSkill}
            </li>
          ))}
        </ul>
        <ul>
          <h3 className={styles['frameworks-title']}>
            Frameworks, libraries & tools
          </h3>
          {aboutFrameworksSkills.map((frameworkSkill, index) => (
            <li className={styles['skills-items']} key={index}>
              {frameworkSkill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
 
export default Skills;