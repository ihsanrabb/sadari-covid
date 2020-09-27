import Slider from "react-slick";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Link from 'next/link'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginRight: '5px',
    marginLeft: '5px'
  },
  containerNews: {
    marginBottom: '5rem'
  }
});

const HomeNews = () => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  };
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    db.collection("news").orderBy("date", "desc").limit(4).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let data = {
          title: doc.data().title,
          date: doc.data().date.toDate(),
          description: doc.data().description,
          imageURL: doc.data().imageURL
        }
        setNewsList(prevList => [...prevList, {
          id:doc.id,
          data:data
        }])
      });
    });
  }, [])

  return (
    <Container className={classes.containerNews}>
      <h3>Informasi Terbaru</h3>
      {newsList !== [] && 
        <Slider {...settings}>
          {newsList.map((news) => (
            <div key={news.id}>
              <Link href={`/information/[id]`} as={`/information/${news.id}`}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="120"
                      image={news.data.imageURL}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="subtitle1" component="h5">
                        {news.data.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {news.data.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </div>
          ))}
        </Slider>
      }
    </Container>
  )
}

export default HomeNews