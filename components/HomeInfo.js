import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import styles from '../styles/components/HomeInfo.module.scss'
import { useRouter } from 'next/router'

const HomeInfo = () => {
  const router = useRouter()

  return (
      <Container className={styles.container_wrap}>
        <h3>Informasi Sekitar Anda</h3>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper 
              className={styles.paper_wrap}
              onClick={() => router.push('/confirmed-location')}
            >
              <img src="/img/ic-location.svg" alt="location" />
              <p>Zona Lokasi Area Berdampak</p>
              <div className={styles.icon_right}>
                <ArrowForwardIcon />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper 
              className={styles.paper_wrap} 
              onClick={() => router.push('/hospital-reference')}
            >
              <img src="/img/ic-hospital.svg" alt="location" />
              <p>Rumah Sakit Rujukan</p>
              <div className={styles.icon_right}>
                <ArrowForwardIcon />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
  )
}

export default HomeInfo