import ConfirmedHero from '../components/ConfirmedHero'
import ConfirmedList from '../components/ConfirmedList'

const ConfirmedLocation = ({locationData}) => {
  return (
    <>
      <ConfirmedHero />
      <ConfirmedList locationData={locationData} />
    </>
  )
}

export async function getServerSideProps() {
  
  const res = await fetch(`https://indonesia-covid-19.mathdro.id/api/provinsi/`)
  const locationData = await res.json()

  return {
    props: {
      locationData: locationData
    }
  }
}

export default ConfirmedLocation