import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles['footer-container']}>
      <p className={styles['footer-text']}>
        ©2022 Armando Bringas
      </p>
    </div>
  )
}

export default Footer