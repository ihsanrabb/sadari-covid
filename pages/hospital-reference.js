import ReferenceHero from '../components/ReferenceHero'
import ReferenceList from '../components/ReferenceList'
import RefernceList from '../components/ReferenceList'

const HospitalReference = ({hospitalData}) => {
  return (
    <>
      <ReferenceHero />
      <ReferenceList hospitalData={hospitalData} />
    </>
  )
}

export async function getServerSideProps() {
  
  const res = await fetch(`https://dekontaminasi.com/api/id/covid19/hospitals`)
  const hospitalData = await res.json()

  return {
    props: {
      hospitalData: hospitalData
    }
  }
}

export default HospitalReference