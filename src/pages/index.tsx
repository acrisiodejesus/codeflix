import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import Hero from '../../public/hero.svg'
import styles from './home.module.scss'
import {BsFillGridFill, BsBookmarkFill} from 'react-icons/bs'
import { LoginButton } from '../components/loginButton'
import { FaGithub } from 'react-icons/fa'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'



const Home = () => {
  const {data: session} = useSession()
  const router = useRouter()
  return session ? router.push('/movies'): 
  (
    <>
      <Head>
        <title>CodeFlix</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Image width="61px" height="54px" blurDataURL="data:..." placeholder="blur"
            src={Logo} alt="Movie Icon" 
            />
          </div> 
          <h2>CodeFlix</h2>
          <h1>Movies for Developers</h1>
          <p>Find the best movies of technology and programming completely free.</p>
          <button onClick={()=> signIn()} className={styles.signInButton}>
            <FaGithub color="var(--red-500)" size="2.5rem" />
            <p>SignIn with Github</p>
          </button>
        </div>
        <Image src={Hero} alt="Movie Icon" className={styles.hero} 
        blurDataURL="data:..." placeholder="blur" width="420" height="420"/>
      </main>
      <p className={styles.credits}> Template by Acrísio de Jesus - <strong>2022 © SejaCriativoMZ</strong></p>
    </>
  )
}

export async function getStaticProps() {
  
  const res = await fetch('http://localhost:3000/api/movies')
  const movies = await res.json()
  

  return {
    props: {
      movies,
    },
  }
}
export default Home
