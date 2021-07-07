import ReferenceHero from '../components/ReferenceHero'
import SearchData from '../components/SearchData'
import BottomNavigation from '../components/BottomNavigation'

const FullInformation = () => {
  return (
    <>
      <div className="page-width-wrap">
        <ReferenceHero 
          imgSource={'/img/search-hero.svg'}
          wording={`Cari RS, Puskesmas, Ambulans, Oksigen & kontak penting lainnya`} 
        />
        <SearchData />
      </div>
      <BottomNavigation className="navigation-bottom" />
    </>
  )
}

export default FullInformation