import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styles from '../styles/components/CovidChart.module.scss'
import React, { useEffect, useState } from 'react';


const CovidChart = ({casesData}) => {
  const [confirmed, setConfirmed] = useState('')
  const [recovered, setRecovered] = useState('')
  const [deaths, setDeaths] = useState('')

  useEffect(() => {
    filterNumber(setConfirmed, casesData.confirmed.value)
    filterNumber(setRecovered, casesData.recovered.value)
    filterNumber(setDeaths, casesData.deaths.value)
  });

  function filterNumber(state, data) {
    return state(data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
  }

  return (
    <Container>
      <h3>Statistik COVID-19 di Indonesia</h3>
      <p>15 September 2020 berdasarkan www.covid19.go.id</p>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.positif_wrap}>
            <h5>Positif</h5>
            <p>+3.507</p>
            <span>{confirmed}</span>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.sembuh_wrap}>
            <h5>Sembuh</h5>
            <p>+3.507</p>
            <span>{recovered}</span>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.meninggal_wrap}>
            <h5>Meninggal</h5>
            <p>+3.507</p>
            <span>{deaths}</span>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}



export default CovidChart