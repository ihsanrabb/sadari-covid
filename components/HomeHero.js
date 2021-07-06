import styles from '../styles/components/HomeHero.module.scss'
import Grid from '@material-ui/core/Grid' 
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { useRouter } from 'next/router'

const HomeHero = () => {
  const router = useRouter()

  return (
    <Container>
      <div className={styles.hero_wrapper}>
        <h5>Lihat daftar ketersedian Rumah Sakit</h5>
        <Grid container spacing={1}>
          <Grid item xs={8} sm={6}>
            <p>Silahkan lihat daftar ketersedian Ruang ICU dan Ruang Isolaasi Rumah Sakit untuk daerah DKI Jakarta.</p>
            <Button 
              size="small" 
              variant="contained"
              color="primary"
              onClick={() => router.push('/hospital-list')}>
            Lihat Daftar Rumah Sakit</Button>
          </Grid>
          <Grid 
            item xs={4} sm={6} container
            direction="row"
            justify="center"
            alignItems="flex-end"
            className={styles.img_wrap}>
            <img src="/img/protective-wear.svg" alt="protective wear" />
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default HomeHero