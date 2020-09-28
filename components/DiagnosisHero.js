import Container from '@material-ui/core/Container';
import styles from '../styles/components/DiagnosisHero.module.scss'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';

const DiagnosisHero = () => {
  return (
    <>
      <Container>
        <h3>Diagnosa Mandiri</h3>
        <img src="/img/diagnosis-hero.svg" alt="protective wear" className={styles.hero} />
        
      </Container>
      <div className={styles.wording_hero}>
        <p>Periksa dini dan konsultasikan<br/> kesehatanmu secara online</p>
      </div>
      <div className={styles.wording_info}>
        <Container>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}> 
            <Grid item xs={1}>
              <ErrorOutlineIcon />
            </Grid>
            <Grid item xs={11}>
              <p>Diagnosa Mandiri dan telekonsultasi dokter akan difasilitasi oleh aplikasi dari pihak ketiga. Seluruh kontennya merupakan tanggung jawab pihak ketiga tersebut.</p>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default DiagnosisHero