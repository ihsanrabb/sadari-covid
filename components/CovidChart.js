import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styles from '../styles/components/CovidChart.module.scss'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin:'.9rem'
  },
}));

const CovidChart = () => {
  const classes = useStyles();

  const [confirmed, setConfirmed] = useState('')
  const [recovered, setRecovered] = useState('')
  const [deaths, setDeaths] = useState('')
  const [totalConfirmed, setTotalConfirmed] = useState('')
  const [totalRecovered, setTotalRecovered] = useState('')
  const [totalDeaths, setTotalDeaths] = useState('')
  const [lastestUpdate, setLastestUpdate] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://data.covid19.go.id/public/api/update.json')
      .then((res) => {
        let update_data = res.data.update.penambahan
        let update_total = res.data.update.total
        filterNumber(setConfirmed, update_data.jumlah_positif)
        filterNumber(setRecovered, update_data.jumlah_sembuh)
        filterNumber(setDeaths, update_data.jumlah_meninggal)
        filterNumber(setTotalConfirmed, update_total.jumlah_positif)
        filterNumber(setTotalRecovered, update_total.jumlah_sembuh)
        filterNumber(setTotalDeaths, update_total.jumlah_meninggal)
        setLastestUpdate(update_data.created)
        setLoading(false)
        console.log('update', lastestUpdate)
      }).catch(err => console.log(err))
  }, []);

  function filterNumber(state, data) {
    return state(data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
  }

  return (
    <Container>
      <h3>Statistik COVID-19 di Indonesia</h3>
      <p>{lastestUpdate} berdasarkan www.covid19.go.id</p>
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
                <p>+{confirmed}</p>
                <span>{totalConfirmed}</span>
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
                <p>+{recovered}</p>
                <span>{totalRecovered}</span>
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
                <p>+{deaths}</p>
                <span>{totalDeaths}</span>
              </>
            }
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CovidChart