import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import MapIcon from '@material-ui/icons/Map';
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';  
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  listWrap: {
    backgroundColor: '#EEF3FF',
    paddingBottom: '3rem'
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
  summaryHead: {
    justifyContent: 'space-between'
  },
  levelRed: {
    padding: '.3rem .5rem',
    borderRadius: '20px',
    backgroundColor: '#FFA8A7'
  },
  levelOrange: {
    padding: '.3rem .5rem',
    borderRadius: '20px',
    backgroundColor: '#F1C796'
  },
  levelYellow: {
    padding: '.3rem .5rem',
    borderRadius: '20px',
    backgroundColor: '#FBF7D8'
  },
  levelGreen: {
    padding: '.3rem .5rem',
    borderRadius: '20px',
    backgroundColor: '#D1F8D2'
  },
  zonaTitle: {
    margin: '0',
    fontSize: '12px'
  }
}))

const ConfirmedList = ({locationData}) => {
  const classes = useStyles();
  const [search, setSearch] = useState('')

  let filteredLocation = locationData.data.filter((location) => {
    return location.provinsi.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  function renderZona(cases) {
    if(cases > 4000) {
      return (
        <div className={classes.levelRed}>   
          <p className={classes.zonaTitle}>Zona Merah</p>
        </div>
      )
    } else if (cases > 3000 && cases < 4000) {
      return (
        <div className={classes.levelOrange}>   
          <p className={classes.zonaTitle}>Zona Orange</p>
        </div>
      )
    } else if (cases > 2000 && cases < 3000) {
      return (
        <div className={classes.levelYellow}>   
          <p className={classes.zonaTitle}>Zona Kuning</p>
        </div>
      )
    } else {
      return (
        <div className={classes.levelGreen}>   
          <p className={classes.zonaTitle}>Zona Hijau</p>
        </div>
      )
    }
  }
  
  return (
    <div className={classes.listWrap}>
      <Container>
        <p className={classes.titleList}>Lokasi Area Provinsi</p>
        <TextField 
          label="Cari Lokasi" 
          variant="filled" 
          className={classes.searchField} 
          onChange={e => setSearch(e.target.value)} 
          value={search} />

        {filteredLocation.map((location, index) => {
          return (
            <Accordion className={classes.accordionWrap} square={true} classes={{root: classes.MuiAccordionroot}} key={location.kodeProvi}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel1-content`}
                id={`panel1-header`}
                className={classes.summaryHead}
              >
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <p>{location.provinsi}</p>
                  {renderZona(location.kasusPosi)}
                </Grid>
                
              </AccordionSummary>
              <AccordionDetails classes={{root: classes.MuiAccordionDetails}}>
                <ul className={classes.listDetail}>
                  <li>Kasus Positif: {location.kasusPosi}</li>
                  <li>Kasus Sembuh: {location.kasusSemb}</li>
                  <li>Kasus Meninggal: {location.kasusMeni}</li>
                </ul>
              </AccordionDetails>
            </Accordion>
          )
        })}

      </Container>
    </div>
  )
}

export default ConfirmedList