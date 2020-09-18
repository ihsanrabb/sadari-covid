import styles from '../styles/components/HomeHero.module.scss'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const HomeHero = () => {
  return (
    <Container>
      <div className={styles.hero_wrapper}>
        <h5>Apakah saya terinfeksi virus corona?</h5>
        <Grid container spacing={1}>
          <Grid item xs={8} sm={6}>
            <p>Silahkan periksa kesehatan Anda jika ingin mengetahui kondisi tubuh Anda.</p>
            <Button size="small" variant="contained">Diagnosa Mandiri</Button>
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