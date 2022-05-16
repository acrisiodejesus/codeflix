import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'
import { useSession, signIn, signOut  } from 'next-auth/react'
import Image from 'next/image';

export function LoginButton() {
   const {data: session} = useSession();
  return session? 
  (
    <button className={styles.loginButton}
      onClick={()=> signOut()}
    >
      <Image width="38px" height="38px" src={`${session.user?.image}`} alt={`${session.user?.image}`}/>
    </button>
  ): (
    <button
      type="button"
      className={styles.loginButton}
      onClick={()=> signIn()}
    >
      
      <FaGithub color="var(--blue-500)" size="2.5rem" />
    </button >
  )
}