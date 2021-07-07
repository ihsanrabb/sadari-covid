import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import axios from 'axios'
import utilStyles from '../styles/utilsClass.module.scss'

const HomeHead = () => {
  // const [cityLoc, setCityLoc] = useState('')

  // useEffect(() => {
  //   let mounted = true
  //   if(mounted) {
  //     getCoordintes()
  //   }
  //   return () => mounted = false
  // }, []);

  function getCoordintes() { 
    let options = { 
      enableHighAccuracy: true, 
      timeout: 5000, 
      maximumAge: 0 
    }; 
  
    function success(pos) {
      let crd = pos.coords; 
      let lat = crd.latitude.toString(); 
      let lng = crd.longitude.toString(); 
      let coordinates = [lat, lng]; 
      getCity(coordinates); 
      return; 
    } 
  
    function error(err) { 
      console.warn(`ERROR(${err.code}): ${err.message}`); 
    } 

    navigator.geolocation.getCurrentPosition(success, error, options); 
  } 

  const getCity = async (coordinates) => {
    const lat = coordinates[0]
    const lng = coordinates[1]
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=71351c589eb051&lat=${lat}&lon=${lng}&format=json`)
      setCityLoc(response.data.display_name)
    } catch(error) {
      console.log('error get city', error)
    }
  }

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <h2>Halo!</h2>
          {/* <LocationOnIcon />
          <span className={utilStyles.text_10}>{cityLoc}</span> */}
        </Grid>
        <Grid item container xs={6} direction="row" alignItems="center">
          <h3 className={utilStyles.text_right}>Lawan Virus Corona dengan SADARI</h3> 
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeHead