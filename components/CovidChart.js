import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import styles from '../styles/components/CovidChart.module.scss'
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';  


const CovidChart = ({casesData}) => {

  const [confirmed, setConfirmed] = useState('')
  const [recovered, setRecovered] = useState('')
  const [deaths, setDeaths] = useState('')
  const [totalConfirmed, setTotalConfirmed] = useState('')
  const [totalRecovered, setTotalRecovered] = useState('')
  const [totalDeaths, setTotalDeaths] = useState('')

  useEffect(() => {
    filterNumber(setConfirmed, casesData.update.penambahan.jumlah_positif)
    filterNumber(setRecovered, casesData.update.penambahan.jumlah_sembuh)
    filterNumber(setDeaths, casesData.update.penambahan.jumlah_meninggal)
    filterNumber(setTotalConfirmed, casesData.update.total.jumlah_positif)
    filterNumber(setTotalRecovered, casesData.update.total.jumlah_sembuh)
    filterNumber(setTotalDeaths, casesData.update.total.jumlah_meninggal)
  });

  function filterNumber(state, data) {
    return state(data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
  }

  return (
    <Container>
      <h3>Statistik COVID-19 di Indonesia</h3>
      <p>{casesData.update.penambahan.tanggal} berdasarkan www.covid19.go.id</p>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.positif_wrap}>
            <h5>Positif</h5>
            <p>+{confirmed}</p>
            <span>{totalConfirmed}</span>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.sembuh_wrap}>
            <h5>Sembuh</h5>
            <p>+{recovered}</p>
            <span>{totalRecovered}</span>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={styles.meninggal_wrap}>
            <h5>Meninggal</h5>
            <p>+{deaths}</p>
            <span>{totalDeaths}</span>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

CovidChart.propTypes = {
  casesData: propTypes.object
}

export default CovidChart