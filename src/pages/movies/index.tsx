import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import styles from './movies.module.scss'
import {BsFillGridFill, BsBookmarkFill} from 'react-icons/bs'
import { LoginButton } from '../../components/loginButton'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  views: number;
}
interface MoviesProps{
  movies: Movie[]
}


const Movies = ({movies}: MoviesProps) => {
  const {data: session} = useSession()
  const router = useRouter()
  return 
  (
    <>
      <Head>
        <title>CodeFlix</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.sidebar}>
          <Image src={Logo} alt="Movie Icon" className={styles.logo}/>
          <ul>
            <li><a href="#"><BsFillGridFill size="2rem" color='#fff'/></a></li>
            <li><a href="#"><BsBookmarkFill size="2rem" color='#5d668b'/></a></li>
            
          </ul>
          <LoginButton/>
        </div>
        <div className={styles.content}>
          <section className={styles.trending}>
            <h2>Em Alta</h2>
            <div className={styles.trendingContent} >
              {movies.slice(0, 4).map(movie => ( 
                <div key={movie.id} className={styles.trendMovie}>
                  <Image width="320px" height="213px" src={movie.imageUrl} alt={movie.title}/>
                  <span className={styles.imgOverlay}></span>
                  <h3 className={styles.trendTitle}>{movie.title}</h3>
                </div>

                ))
              }
              
              
              
            </div>
          </section>
          <section className={styles.forYou}>
            <h2>Para você</h2>
            <div className={styles.catalog}>
            {movies.map(movie => ( 
              <div key={movie.id} className={styles.movie}>
               <Image width="320px" height="213px" src={movie.imageUrl} alt={movie.title}/>
                <p className={styles.label}>{movie.views} visualizações</p>
                <h3 className={styles.title}>{movie.title}</h3>
              </div>
            ))}
            </div>
          </section>
        </div>
      </main>
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
export default Movies
