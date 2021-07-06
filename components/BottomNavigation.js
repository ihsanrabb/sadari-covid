import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    boxShadow: '0px -.5px 7px 3px rgba(0,0,0,0.1)'
  },
});

const SimpleBottomNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const router = useRouter()

  useEffect(() => {
    switch (router.pathname) {
      case '/':
        setValue(0)
        break
      case '/hospital-list':
        setValue(1)
        break
      case '/vaksin':
        setValue(2)
        break
      default:
        setValue(0)
    }
  }, [])

  return (
    <BottomNavigation
      value={value}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction 
        label="Beranda" 
        icon={<HomeRoundedIcon />} 
        onClick={() => router.push('/')} />
      <BottomNavigationAction 
        label="Rumah Sakit" 
        icon={<LocalHotelIcon />} 
        onClick={() => router.push('/hospital-list')} />
      <BottomNavigationAction 
        label="Lokasi Vaksin" 
        icon={<LocalHospitalIcon />} 
        onClick={() => router.push('/vaksin')} />
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation

