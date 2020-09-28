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
}));

const QuestionHero = () => {
  const classes = useStyles();
  const router = useRouter()

  return (
    <>
      <Fab 
          variant="extended" 
          size="small" 
          color="primary" 
          className={classes.fabWrap}
          onClick={() => router.push('/diagnosis-page')}
      >
      <ArrowBackIcon className={classes.extendedIcon} />
        Kembali
      </Fab>
      <img src="/img/question-hero.svg" alt="protective wear" className={classes.imgHero} />
    </>
  )
}

export default QuestionHero