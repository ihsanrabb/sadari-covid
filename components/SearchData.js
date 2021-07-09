import { useState, useRef } from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import PhoneIcon from '@material-ui/icons/Phone'
import Divider from '@material-ui/core/Divider'
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  listWrap: {
    backgroundColor: '#EEF3FF',
    paddingBottom: '3rem',
    marginBottom: '2rem'
  },
  titleList: {
    margin: '0'
  },
  formControl: {
    minWidth: '100%',
    marginTop: '1rem',
  },
  margin: {
    margin: theme.spacing(1),
    marginBottom: '1.5rem'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  ctaWrap: {
    textAlign: 'center',
    marginTop: '.8em'
  },
  lastUpdatedWrap: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  emoji: {
    fontSize: '25px',
    marginRight: '.2em'
  }
}))

const tabProvinsi = [
  'Jkt',
  'Aceh',
  'Kep. Riau',
  'Sumut',
  'Sumbar',
  'Sumsel',
  'Riau',
  'Bangka Belitung',
  'Jambi',
  'Lampung',
  'Banten',
  'Jabar',
  'Jateng',
  'Yogya',
  'Jatim',
  'Bali',
  'NTT',
  'NTB',
  'Ternate',
  'Kaltim',
  'Kalteng',
  'Kalbar',
  'Sulses',
  'Sulteng',
  'Sulut'
];

const categoryNeeds = [
  'Rumah sakit',
  'Puskesmas',
  'Oksigen',
  'Donor Plasma',
  'Ambulans',
  'Kontak penting',
  'Donasi'
];

const initErrors = {provinsi: false, category: false}

const SearchData = () => {
  const classes = useStyles()
  const wilayahRef = useRef('')
  const categoryRef = useRef('')
  const [dataWarga, setDataWarga] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [errorSelect, setErrorSelect] = useState(initErrors)

  const onSearchData = async () => {
    let errors = {}
    if(!wilayahRef.current.value) {
      errors = {
        ...errors,
        provinsi: true
      }
    }
    if(!categoryRef.current.value) {
      errors = {
        ...errors,
        category: true
      }
    }

    if(Object.keys(errors).length !== 0) {
      setErrorSelect(errors)
      return
    }

    setLoadingData(true)
    try {
      const endpoint = `https://v1.nocodeapi.com/ihsanrabbs/google_sheets/eErlNknWyuAaSpEo`
      const response = await axios.get(`${endpoint}?tabId=${wilayahRef.current.value}`)
      const dataResult = response.data.data
      const filterData = dataResult.filter((data) => {
        return data.Kebutuhan.toLowerCase().indexOf(categoryRef.current.value.toLowerCase()) !== -1
      })
      setDataWarga(filterData)
      setLoadingData(false)
      setShowResult(true)
    } catch(error) {
      console.log('error search data', error)
      setLoadingData(false)
    }
  }

  const onResetSearch = () => {
    setShowResult(false)
    setErrorSelect(initErrors)
    setDataWarga([])
  }

  return (
    <div className={classes.listWrap}>
      <Container>
        <div className={classes.lastUpdatedWrap}>
          <InfoIcon />
          <p className={classes.titleList}>
            Data diambil dari situs <a href="https://wargabantuwarga.com/" target="_blank">#wargabantuwarga</a>
          </p>
        </div>
        {!showResult && (
          <>
            <FormControl 
              variant="filled" 
              className={classes.formControl} 
              error={errorSelect.provinsi}
            >
              <InputLabel>Pilih Provinsi</InputLabel>
              <Select
                defaultValue=""
                inputProps={{inputRef: wilayahRef}}
              >
                <MenuItem value="" disabled>Pilih Provinsi</MenuItem>
                {tabProvinsi.map((item,index) => (
                  <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
              </Select>
              {errorSelect.provinsi && <FormHelperText>Provinsi harus kamu pilih</FormHelperText>}
            </FormControl>
            <FormControl 
              variant="filled" 
              className={classes.formControl}
              error={errorSelect.category}
            >
              <InputLabel>Kategori Kebutuhan</InputLabel>
              <Select
                defaultValue=""
                inputProps={{inputRef: categoryRef}}
              >
                <MenuItem value="" disabled>Kategori Kebutuhan</MenuItem>
                {categoryNeeds.map((item,index) => (
                  <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
              </Select>
              {errorSelect.category && <FormHelperText>Kategori harus kamu pilih</FormHelperText>}
            </FormControl>
            <div className={classes.ctaWrap}>
              <Fab
                variant="extended"
                size="medium"
                color="secondary"
                aria-label="add"
                className={classes.margin}
                onClick={onSearchData}
                disabled={loadingData}
              >
                <KeyboardArrowRightIcon className={classes.extendedIcon} />
                {loadingData ? 'Memuat Informasi' : 'Cari Informasi'}
              </Fab>
            </div>
          </>
        )}
        {showResult && (
          <>
            <div className={classes.ctaWrap}>
              <Fab
                variant="extended"
                size="medium"
                color="secondary"
                aria-label="add"
                className={classes.margin}
                onClick={onResetSearch}
              >
                Cari Ulang
              </Fab>
            </div>
            {dataWarga.length > 0 ? (
              dataWarga.map((data) => (
                <div className="box-info" key={data.row_id}>
                  <h5 className="title-hospital">{data.Penyedia} {data.Penyedia && '-'} {data.Lokasi}</h5>
                  <Divider />
                  <p><b>Keterangan:</b> {data.Keterangan}</p>
                  {data.Alamat && (
                    <p><b>Alamat:</b> {data.Alamat}</p>
                  )}
                  {data['Terakhir Diupdate'] && (
                    <p><b>Terakhir Diupdate:</b> {data['Terakhir Diupdate']}</p>
                  )}
                  {data.Tautan && (
                    <p><b>Tautan:</b> <a href={data.Tautan} target="_blank">{data.Penyedia}</a></p>
                  )}
                  {data.Kontak && (
                    <div className="hotline-wrap">
                      <PhoneIcon />
                      <a href={`tel:${data.Kontak}`}> Hubungi : {data.Kontak}</a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h3>
                <span className={classes.emoji}>😷</span>
                Informasi yang kamu cari belum ada untuk saat ini
              </h3>
            )}
          </>
        )}     
      </Container>
    </div>
  )
}

export default SearchData