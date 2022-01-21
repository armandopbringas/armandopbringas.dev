import styles from './footer.module.css'
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className={styles['footer-container']}>
      <p className={styles['footer-text']}>
        If you want to get in touch you can find me at:
      </p>
      <div className={styles['footer-icons-container']}>
        <a
          target='_blank' 
          rel='noopener noreferrer'
          href='https://www.linkedin.com/in/armandopbringas'
        >
          <FaLinkedin className={styles['footer-icon-item']}/>
        </a>
        <a
          rel='noopener noreferrer'
          href='mailto:bringas.armandop@gmail.com'
        >
          <FaEnvelope className={styles['footer-icon-item']}/>
        </a>
      </div>
    </div>
  )
}

export default Footer