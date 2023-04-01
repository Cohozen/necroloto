import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import lotoImg from '../public/loto.jpg'

export default function Home() {
  return (
    <>
      <Head>
        <title>Necroloto</title>
        <meta name="description" content="Necroloto app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <section className="h-full flex flex-1 items-center justify-center">
              <div className="flex flex-col items-center bg-black text-white py-10 lg:py-20">
                  <div className="container mx-auto flex flex-col md:flex-row items-center my-10 lg:my-20">
                      <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-6">
                          <h1 className="text-4xl lg:text-6xl text-yellow-300 pb-4">Necroloto</h1>
                          <h2 className="text-3xl lg:text-5xl mb-2">Un jeu de parie sur la mort de célébrités</h2>
                          <p className="text-sm md:text-base text-gray-50 mb-4">
                              Nécroloteurs, Faites vos prévisions ! <span className="italic">Pour l&apos;amour du jeu.</span>
                          </p>
                          <Link href="/game" className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">Accéder aux paries</Link>
                      </div>
                      <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
                          <div className="h-48 flex flex-wrap content-center inline-block">
                              {/*<Image*/}
                              {/*    className="inline-block mt-28 hidden xl:block rounded-full scale-50 rotate-[60deg]"*/}
                              {/*    src={necroloto1Img}*/}
                              {/*    alt="Picture of the author"*/}
                              {/*/>*/}
                              <Image
                                  className="inline-block mt-24 md:mt-0 p-8 md:p-0 rounded-full lg:scale-[0.6] rotate-[50deg]"
                                  src={lotoImg}
                                  alt="loto picture"
                              />
                              {/*<Image*/}
                              {/*    className="inline-block mt-28 hidden lg:block rounded-full scale-50 rotate-[60deg]"*/}
                              {/*    src={necroloto2Img}*/}
                              {/*    alt="Picture of the author"*/}
                              {/*/>*/}
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    </>
  )
}
