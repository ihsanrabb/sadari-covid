import { useState, useEffect, useRef, useMemo } from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PhoneIcon from '@material-ui/icons/Phone';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as updateLocale from 'dayjs/plugin/updateLocale';

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
  },
  lastUpdatedWrap: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  }
}))

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  relativeTime: {
    // relative time format strings, keep %s %d as the same
    m: 'a menit',
    mm: '%d menit',
  }
})

const HospitalList = () => {
  const classes = useStyles()
  const listHospitalRef = useRef([])
  const groupWilayahRef = useRef({})
  const [listHospital, setListHospital] = useState([])
  const [search, setSearch] = useState('')
  const [wilayahList, setWilayahList] = useState([])
  const [selectedWilayah, setSelectedWilayah] = useState('')
  const [loadingList, setLoadingList] = useState(false)

  useEffect(() => {
    initHospitalList()
  }, [])

  const initHospitalList = async() => {
    setLoadingList(true)
    try {
      const response = await axios.get('https://cors.bridged.cc/https://covidanjing.serverkenceng.net/rs')
      const dataHospital = response.data
      setListHospital(dataHospital)
      listHospitalRef.current = dataHospital
      const groupWilayah =  dataHospital.reduce((newObject, hospital) => {
        newObject[hospital.wilayah] = [...newObject[hospital.wilayah] || [], hospital]
        return newObject
      }, {})
      groupWilayahRef.current = groupWilayah
      setWilayahList(Object.getOwnPropertyNames(groupWilayah))
      setLoadingList(false)
    } catch(error) {
      console.log('error get hospital list', error)
    }
  }

  const filterHospital = useMemo(() => {
    return listHospital.filter((hospital) => {
      return hospital.faskes.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
    })
  }, [listHospital, search])

  const handleChangeWilayah = (e) => {
    setSelectedWilayah(e.target.value)
    if(e.target.value === '') return  setListHospital(listHospitalRef.current)
    setListHospital(groupWilayahRef.current[e.target.value])
  }

  const getAvailableICU = (data) => {
    const totalICU = +data.kosong_icu_negatif_tanpa_ventilator + 
                    +data.kosong_icu_negatif_ventilator + 
                    +data.kosong_icu_tanpa_negatif_tanpa_ventilator + 
                    +data.kosong_icu_tanpa_negatif_ventilator;
    if(totalICU > 0) {
      return (
        <div className="level-green">   
          <p className="title-capsule">Tersedia <b>{totalICU}</b> Ruang ICU</p>
        </div>
      )
    } else {
      return (
        <div className="level-red">   
          <p className="title-capsule">Ruang ICU tidak tersedia</p>
        </div>
      )
    }
  }

  const getAvailableIsolasi = (data) => {
    const totalIsolasi = +data.kosong_isolasi_negatif + +data.kosong_isolasi_tanpa_negatif
    if(totalIsolasi > 0) {
      return (
        <div className="level-green mt-06">   
          <p className="title-capsule">Tersedia <b>{totalIsolasi}</b> Ruang Isolasi</p>
        </div>
      )
    } else {
      return (
        <div className="level-red mt-06">   
          <p className="title-capsule">Ruang Isolasi tidak tersedia</p>
        </div>
      )
    }
  }

  return (
    <div className={classes.listWrap}>
      <Container>
        <p className={classes.titleList}>Lokasi Ketersedian Ruang Isolasi & Ruang ICU Rumah Sakit DKI Jakarta</p>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel>Pilih Wilayah</InputLabel>
          <Select
            value={selectedWilayah}
            onChange={handleChangeWilayah}
          >
            <MenuItem value="">Semua</MenuItem>
            {wilayahList.map((item,index) => (
              <MenuItem value={item} key={index}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField 
          label="Cari Nama Rumah Sakit" 
          variant="filled" 
          className={classes.searchField} 
          onChange={e => setSearch(e.target.value)} 
          value={search} 
        />
        {listHospitalRef.current.length > 0 && (
          <div className={classes.lastUpdatedWrap}>
            <AccessTimeIcon />
            <p className={classes.titleList}>
              Diperbaharui {dayjs(dayjs(listHospitalRef.current[0].updated_time)).fromNow('m')} yang lalu
            </p>
          </div>
        )}
        {loadingList ? (
          <h3>Tunggu sebentar ya...</h3>
        ) : (
          filterHospital.map((hospital) => (
            <div className="box-info" key={hospital._id}>
              <p className="title-hospital">{hospital.faskes} - {hospital.wilayah}</p>
              {getAvailableICU(hospital)}
              {getAvailableIsolasi(hospital)}
              <div className="hotline-wrap">
                <PhoneIcon />
                <a href={`tel:${hospital.nomor_hotline_spgdt}`}> Hubungi : {hospital.nomor_hotline_spgdt}</a>
              </div>
            </div>
        )))}
      </Container>
    </div>
  )
}

export default HospitalList