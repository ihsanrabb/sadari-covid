import ReferenceHero from '../components/ReferenceHero'
import VaccineLocationList from '../components/VaccineLocationList'
import BottomNavigation from '../components/BottomNavigation'

const VaksinPage = () => {
  return (
    <>
      <div className="page-width-wrap">
        <ReferenceHero wording={`Lokasi Vaksinasi DKI Jakarta`} />
        <VaccineLocationList />
      </div>
      <BottomNavigation className="navigation-bottom" />
    </>
  )
}

export default VaksinPage