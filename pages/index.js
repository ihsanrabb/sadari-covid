import Head from 'next/head'
import BottomNavigation from '../components/BottomNavigation'
import HomeHero from '../components/HomeHero'
import HomeHead from '../components/HomeHead'
import CovidChart from '../components/CovidChart'
import HomeInfo from '../components/HomeInfo'
import HomeSymptoms from '../components/HomeSymptoms'
import HomeNews from '../components/HomeNews'


export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
      <HomeHead />
      <HomeHero />
      <CovidChart />
      <HomeInfo />
      <HomeSymptoms />
      <HomeNews />
      
      <BottomNavigation className="navigation-bottom" />
    </>
  )
}