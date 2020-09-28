import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import styles from '../styles/components/InformationList.module.scss'
import Link from 'next/link'

const InformationList = (props) => {
  return (
    <Container>
      <h3>Informasi Terbaru</h3>
      <div className={styles['container-list']}>
      {props.newsList.map((news) => (
        <div className={styles['news-wrap']} key={news.id}>
          <Link href={`/information/[id]`} as={`/information/${news.id}`}>
            <Grid container>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="120"
                  image={news.data.imageURL}
                  title="Contemplative Reptile"
                />
              </Grid>
              <Grid item xs={8}>
                <h2>{news.data.title}</h2>
                <p>{news.data.date.toLocaleString('id-ID')}</p>
              </Grid>
            </Grid>
          </Link>
        </div>
      ))}
      </div>
    </Container>
  )
}

export default InformationList