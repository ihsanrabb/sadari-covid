import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { db } from '../../firebase' 

const useStyles = makeStyles(() => ({
  fabWrap: {
    marginTop: '1rem'
  },
  detailImg: {
    maxWidth: '100%',
    marginTop: '2rem'
  }
}));

const DetailInfo = () => {
  const classes = useStyles()
  const router = useRouter()
  const [detailNews, setDetailNews] = useState('')
  const { id } = router.query

  useEffect(() => {
    if(id) {
      db.collection("news").doc(id).get().then(function(doc) {
        if (doc.exists) {
          let data = {
            title: doc.data().title,
            date: doc.data().date.toDate(),
            description: doc.data().description,
            imageURL: doc.data().imageURL
          }
          setDetailNews(data)
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  }, [id])

  return (
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

      {detailNews && 
        <>
          <img src={detailNews.imageURL} alt="Detail News" className={classes.detailImg} />
          <p>{detailNews.date.toLocaleString('id-ID')}</p>
          <p dangerouslySetInnerHTML={{__html: detailNews.description}} />
        </>
      }
      
    </Container>
  )
}

export default DetailInfo