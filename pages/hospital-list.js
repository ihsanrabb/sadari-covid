import ReferenceHero from '../components/ReferenceHero'
import HospitalList from '../components/HospitalList'
import BottomNavigation from '../components/BottomNavigation'

const HospitalListPage = () => {
  return (
    <>
      <ReferenceHero 
        imgSource={'/img/diagnosis-hero.svg'}
        wording={`Daftar ketersedian Rumah Sakit DKI Jakarta`} 
      />
      <HospitalList />
      <BottomNavigation />
    </>
  )
}

export default HospitalListPage