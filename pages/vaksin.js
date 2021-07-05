import ReferenceHero from '../components/ReferenceHero'
import VaccineLocationList from '../components/VaccineLocationList'
import BottomNavigation from '../components/BottomNavigation'

const VaksinPage = () => {
  return (
    <>
      <ReferenceHero wording={`Lokasi Vaksinasi DKI Jakarta`} />
      <VaccineLocationList />
      <BottomNavigation className="navigation-bottom" />
    </>
  )
}

export default VaksinPage