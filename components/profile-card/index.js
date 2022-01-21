import Image from 'next/image'
import profilePicture from '../../assets/me.jpg'
import styles from './profile-card.module.css'
import profileCardContent from '../../content/profile-card.content'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const ProfileTitle = () => {
  return (
    <div className={styles['profile-card-title']}>
      <h2 className={styles['profile-card-name']}>
        {profileCardContent.aboutMyName}
      </h2>
      <p className={styles['profile-card-roll']}>
        {profileCardContent.aboutRoll}
      </p>
      <p className={styles['profile-card-getintouch']}>
        Let's get in touch!:
      </p>
      <div className={styles['card-icons-container']}>
        <a
          target='_blank' 
          rel='noopener noreferrer'
          href='https://www.linkedin.com/in/armandopbringas'
        >
          <FaLinkedin className={styles['card-icon-item']}/>
        </a>
        <a
          rel='noopener noreferrer'
          href='mailto:bringas.armandop@gmail.com'
        >
          <FaEnvelope className={styles['card-icon-item']}/>
        </a>
        <a
          target='_blank' 
          rel='noopener noreferrer'
          href='https://github.com/armandopbringas'
        >
          <FaGithub className={styles['card-icon-item']}/>
        </a>
      </div>
    </div>
  );
}

const ProfileCardAbout = () => {
  return (
    <div className={styles['profile-card-text']}>
      <h2 className={styles['text-title']}>About me</h2>
      <p className={styles['text-about']}>
        {profileCardContent.aboutMeText}
      </p>
    </div>
  );
}

const ProfileCard = () => {
  return (
    <>
      <div className={styles["profile-card-wrapp"]}>
        <picture>
          <Image
            width={'150%'}
            height={'150%'}
            alt='Profile picture'
            src={profilePicture}
            className={styles['profile-card-picture']}
          />
        </picture>
        <ProfileTitle />
      </div>
      <ProfileCardAbout />
    </>
  );
}

export default ProfileCard;
