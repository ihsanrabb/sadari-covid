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
        <h5>Kumpulan Informasi Penting</h5>
        <Grid container spacing={1}>
          <Grid item xs={8} sm={6}>
            <p>Mau lihat Informasi Rumah Sakit, Puskesmas, Ambulans, Oksigen, & kontak penting lainnya?</p>
            <Button 
              size="small" 
              variant="contained"
              color="primary"
              onClick={() => router.push('/search-information')}
            >
              Klik di sini
            </Button>
          </Grid>
          <Grid 
            item 
            xs={4} 
            sm={6} 
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
            className={styles.img_wrap}
          >
            <img src="/img/protective-wear.svg" alt="protective wear" />
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default HomeHero