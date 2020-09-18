import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from '../styles/components/HomeSymptoms.module.scss'

const HomeSymptoms = () => {
  return (
    <div className={styles.symptoms_wrap}>
      <Container>
        <h3>Gejala Umum</h3>
        <p>Kenali gejala nya!</p>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Paper className={styles.paper_wrap}>
              <p className={styles.title}>Demam</p>
              <p className={styles.sub_title}>(suhu tubuh di atas 38°C)</p>
              <div className={styles.center_img}>
                <img src="/img/ic-fever.svg" alt="fever" className={styles.img_fever} />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={styles.paper_wrap}>
              <p className={styles.title}>Batuk Kering</p>
              <div className={styles.center_img}>
                <img src="/img/ic-breathing.svg" alt="fever" className={styles.img_symptoms} />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={styles.paper_wrap}>
              <p className={styles.title}>Sesak Nafas</p>
              <div className={styles.center_img}>
                <img src="/img/ic-sore.svg" alt="fever" className={styles.img_symptoms} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default HomeSymptoms