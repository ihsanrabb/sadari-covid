import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utilsClass.module.scss'

const HomeHead = () => {
  const [cityLoc, setCityLoc] = useState('')

  useEffect(() => {
    let mounted = true
    if(mounted) {
      getCoordintes()
    }
    return () => mounted = false
  }, [cityLoc]);

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

  function getCity(coordinates) { 
    let xhr = new XMLHttpRequest(); 
    let lat = coordinates[0]; 
    let lng = coordinates[1]; 
  
    // Paste your LocationIQ token below. 
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=71351c589eb051&lat=" + 
    lat + "&lon=" + lng + "&format=json", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
    xhr.addEventListener("readystatechange", processRequest, false); 
  
    function processRequest(e) { 
      if (xhr.readyState == 4 && xhr.status == 200) { 
          let response = JSON.parse(xhr.responseText); 
          let city = response.address.city; 
          setCityLoc(city)
          return; 
      } 
    } 
  }

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <h2>Halo!</h2>
          <LocationOnIcon />
          <span className={utilStyles.text_10}>{cityLoc}</span>
        </Grid>
        <Grid item container xs={6} direction="row" alignItems="center">
          <h3 className={utilStyles.text_right}>Lawan Virus Corona dengan SADARI</h3> 
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeHead