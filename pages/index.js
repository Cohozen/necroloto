import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Necroloto</title>
        <meta name="description" content="Necroloto app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description} />

        <div className={styles.center}>
          <h2 className={inter.className}>Necroloto</h2>
          <div className={styles.thirteen}>
            <h4 className={inter.className}>Is Coming</h4>
          </div>
        </div>

        <div className={styles.grid} />
      </main>
    </>
  )
}
