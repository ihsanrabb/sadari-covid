import ReferenceHero from '../components/ReferenceHero'
import HospitalList from '../components/HospitalList'
import BottomNavigation from '../components/BottomNavigation'

const HospitalListPage = () => {
  return (
    <>
      <div className="page-width-wrap">
        <ReferenceHero 
          imgSource={'/img/diagnosis-hero.svg'}
          wording={`Daftar ketersedian Rumah Sakit DKI Jakarta`} 
        />
        <HospitalList />
      </div>
      <BottomNavigation />
    </>
  )
}

export default HospitalListPage