import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fabWrap: {
    marginTop: '1rem'
  },
  imgHero: {
    width: '100%'
  },
  wordingHero: {
    backgroundColor: '#EEF3FF',
    borderRadius: '40px 40px 0 0',
    paddingTop: '0.5rem',
    paddingBottom: '1rem'
  },
  pill: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '0.5rem',
    marginTop: '0.5rem',
    borderRadius: '20px'
  },
  pillTitle: {
    margin: 0
  }
}));

const ConfirmedHero = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <Container>
        <Fab 
          variant="extended" 
          size="small" 
          color="primary" 
          className={classes.fabWrap}
          onClick={() => router.push('/')}
        >
          <ArrowBackIcon className={classes.extendedIcon} />
          Kembali
        </Fab>
        <img src="/img/location.svg" alt="protective wear" className={classes.imgHero} />
      </Container>
      <div className={classes.wordingHero}>
        <Container>
          <div className={classes.pill}>
            <h3 className={classes.pillTitle}>Zona Lokasi Area Berdampak</h3>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ConfirmedHero