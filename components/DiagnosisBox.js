import styles from '../styles/components/DiagnosisBox.module.scss'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import { useRouter } from 'next/router'

const DiagnosisBox = () => {
  const router = useRouter()
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      marginBottom: '1.5rem'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <div className={styles.box_wrap}>
      <div className={styles.diagnosis_wrap}>
        <h3>Diagnosa Mandiri</h3>
        <p>Diagnosa mandiri sekarang dengan BPPT</p>
        <div className={styles.img_box}>
          <img src="/img/ic-diagnosis.svg" alt="protective wear" />
        </div>
        <div className={styles.img_box}>
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.margin}
          onClick={() => router.push('/diagnosis-page/question')}
        >
          <KeyboardArrowRightIcon className={classes.extendedIcon} />
          Mulai Sekarang!
        </Fab>
        </div>
      </div>
      <div className={styles.diagnosis_wrap}>
        <h3>Konsultasi Dokter</h3>
        <p>Konsultasi dengan dokter spesialis</p>
        <div className={styles.img_box}>
          <img src="/img/ic-doctor.svg" alt="protective wear" />
        </div>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6} container direction="row" justify="center" alignItems="center">
              <a href="https://www.halodoc.com/tanya-dokter" target="_blank">
                <div className={styles.halodoc_logo}>
                  <img src="/img/logo-halodoc.svg" alt="protective wear" />
                </div>
              </a>
            </Grid>
            <Grid item xs={6} container direction="row" justify="center" alignItems="center">
              <a href="https://www.alodokter.com/cari-dokter" target="_blank">
                <div className={styles.alodokter_logo}>
                  <img src="/img/logo-alodokter.svg" alt="protective wear" />
                </div>
              </a>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default DiagnosisBox