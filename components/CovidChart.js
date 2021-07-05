import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import styles from '../styles/components/CovidChart.module.scss'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import * as dayjs from 'dayjs'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin:'.9rem'
  },
}));

const CovidChart = () => {
  const classes = useStyles();
  const [lastestUpdate, setLastestUpdate] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatedCovid, setUpdatedCovid] = useState({})
  const [totalCovid, setTotalCovid] = useState({})
  const [totalVaccine, setTotalVaccine] = useState({})
  const [loadingVaccine, setLoadingVaccine] = useState(true)

  useEffect(() => {
    getTotalCovid()
    getTotalVaccine()
  }, []);

  const getTotalCovid = () => {
    axios.get('https://cors.bridged.cc/https://data.covid19.go.id/public/api/update.json')
      .then((res) => {
        let update_data = res.data.update.penambahan
        let update_total = res.data.update.total
        setUpdatedCovid(update_data)
        setTotalCovid(update_total)
        setLastestUpdate(update_data.created)
        setLoading(false)
      }).catch(err => console.log(err))
  }

  const getTotalVaccine = async () => {
    try {
      const response = await axios.get('https://vaksincovid19-api.vercel.app/api/vaksin')
      setTotalVaccine(response.data)
      setLoadingVaccine(false)
    } catch(error) {
      console.log('failed get total vaccine', error)
    }
  }

  const filterNumber = (data) => {
    if(!data) return ''
    return data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
  }

  return (
    <Container>
      <h3>Jumlah COVID-19 di Indonesia</h3>
      <p>Pembaharuan terakhir {dayjs(lastestUpdate).format('DD MMMM YYYY, HH:mm')}</p>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.positif_wrap}>
            <h5>Positif</h5>
            {loading ? 
              <>
                <div className={classes.root}>
                  <CircularProgress color="secondary"  />
                </div>
              </> : 
              <>
                <p>+{filterNumber(updatedCovid.jumlah_positif)}</p>
                <span>{filterNumber(totalCovid.jumlah_positif)}</span>
              </>
            }
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.sembuh_wrap}>
            <h5>Sembuh</h5>
            {loading ? 
              <>
                <div className={classes.root}>
                  <CircularProgress />
                </div>
              </> : 
              <>
                <p>+{filterNumber(updatedCovid.jumlah_sembuh)}</p>
                <span>{filterNumber(totalCovid.jumlah_sembuh)}</span>
              </>
            }
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.meninggal_wrap}>
            <h5>Meninggal</h5>
            {loading ? 
              <>
                <div className={classes.root}>
                  <CircularProgress />
                </div>
              </> :
              <>
                <p>+{filterNumber(updatedCovid.jumlah_meninggal)}</p>
                <span>{filterNumber(totalCovid.jumlah_meninggal)}</span>
              </>
            }
          </Paper>
        </Grid>
      </Grid>
      <h3>Jumlah Vaksinasi di indonesia</h3>
      <p>Pembaharuan terakhir {dayjs(totalVaccine.lastestUpdate).format('DD MMMM YYYY, HH:mm')}</p>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3} className={styles.positif_wrap}>
            <h5>Vaksinasi Dosis 1</h5>
            {loadingVaccine ? (
              <div className={classes.root}>
                <CircularProgress color="secondary"  />
              </div>
            ) : (
              <p>{filterNumber(totalVaccine.vaksinasi1)}</p>
            )}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className={styles.sembuh_wrap}>
            <h5>Sembuh</h5>
            {loadingVaccine ? (
              <div className={classes.root}>
                <CircularProgress />
              </div>
            ) : (
              <p>{filterNumber(totalVaccine.vaksinasi2)}</p>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CovidChart