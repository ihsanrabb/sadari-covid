import BottomNavigation from '../components/BottomNavigation'
import DiagnosisHero from '../components/DiagnosisHero'
import DiagnosisBox from '../components/DiagnosisBox'

const DiagnosisPage = () => {
  return (
    <>
      <DiagnosisHero />
      <DiagnosisBox />
      <BottomNavigation className="navigation-bottom" />
    </>
  )
}

export default DiagnosisPage