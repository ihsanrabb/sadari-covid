import { useState, useEffect, useRef, useMemo } from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MapIcon from '@material-ui/icons/Map';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  listWrap: {
    backgroundColor: '#EEF3FF',
    paddingBottom: '3rem',
    marginBottom: '2rem'
  },
  titleList: {
    margin: '0'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  searchField: {
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  listDetail: {
    marginLeft: '0',
    paddingLeft: '1rem'
  },
  accordionWrap: {
    borderRadius: '10px',
    marginBottom: '.5rem',
    left: 'unset'
  },
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      left: 'unset'
    }
  },
  MuiAccordionDetails: {
    display: 'block'
  },
  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '.3rem'
  },
  iconStyle: {
    marginRight: '.5rem'
  },
  formControl: {
    minWidth: '100%',
    marginTop: '1rem',
  }
}))

const VaccineLocationList = () => {
  const classes = useStyles()
  const districtListRef = useRef([])
  const groupLocationRef = useRef({})
  const [locationData, setLocationData] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [search, setSearch] = useState('')
  const [loadingList, setLoadingList] = useState(false)

  useEffect(() => {
    initVaccineLocation()
  }, [])

  const initVaccineLocation = async() => {
    setLoadingList(true)
    try {
      const response = await axios.get('https://cors.bridged.cc/https://vaksin-jakarta.yggdrasil.id/')
      const dataLocation = response.data
      setLocationData(dataLocation)
      districtListRef.current = dataLocation
      const groupLocation = dataLocation.reduce((newObject,location) => {
        newObject[location.kecamatan] = [...newObject[location.kecamatan] || [], location]
        return newObject
      }, {})
      setDistrictList(Object.getOwnPropertyNames(groupLocation))
      groupLocationRef.current = groupLocation
      setLoadingList(false)
    } catch(error) {
      console.log('error get data vaccine location', error)
    }
  }

  const handleChangeDistrict = (e) => {
    setSelectedDistrict(e.target.value)
    if(e.target.value === '') return setLocationData(districtListRef.current)
    setLocationData(groupLocationRef.current[e.target.value])
  }

  const filterVaccineLocation = useMemo(() => {
    return locationData.filter((hospital) => {
      return hospital.nama_faskes.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
    })
  }, [locationData, search])

  return (
    <div className={classes.listWrap}>
      <Container>
        <p className={classes.titleList}>Lokasi Vaksinasi</p>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel>Pilih Kecamatan</InputLabel>
          <Select
            value={selectedDistrict}
            onChange={handleChangeDistrict}
          >
            <MenuItem value="">Semua</MenuItem>
            {districtList.map((item,index) => (
              <MenuItem value={item} key={index}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField 
          label="Cari Lokasi Vaksinasi" 
          variant="filled" 
          className={classes.searchField} 
          onChange={e => setSearch(e.target.value)} 
          value={search} 
        />
        {loadingList ? (
          <h3>Tunggu sebentar ya...</h3>
        ) : (
        filterVaccineLocation.map((location, index) => (
          <Accordion 
            key={location.kode_lokasi_vaksinasi} 
            className={classes.accordionWrap} 
            square={true} 
            classes={{root: classes.MuiAccordionroot}}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <p>{location.nama_faskes}</p>
            </AccordionSummary>
            <AccordionDetails classes={{root: classes.MuiAccordionDetails}}>
              <Typography className={classes.iconWrap}>
                <MapIcon className={classes.iconStyle} /> 
                Alamat: {location.alamat_lokasi_vaksinasi}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )))}
      </Container>
    </div>
  )
}

export default VaccineLocationList