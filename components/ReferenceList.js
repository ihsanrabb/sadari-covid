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
  }
}))

const ReferenceList = ({hospitalData}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [localHospital, setLocalHospital] = useState([])
  const [search, setSearch] = useState('')

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // console.log('komponen', hospitalData)

  useEffect(() => {
    let groupHospital = hospitalData.reduce((newObject,hospital)=> {
      newObject[hospital.province] = [...newObject[hospital.province] || [], hospital]
      return newObject
    }, {})  

    setLocalHospital(groupHospital['Jawa Tengah'])
  }, [])

  let filteredHospital = localHospital.filter((hospital) => {
    return hospital.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  return (
    <div className={classes.listWrap}>
      <Container>
        <p className={classes.titleList}>Rumah Sakit</p>
        <TextField 
          label="Cari Rumah Sakit" 
          variant="filled" 
          className={classes.searchField} 
          onChange={e => setSearch(e.target.value)} 
          value={search} />

        {filteredHospital.map((hospital, index) => {
          return (
            <Accordion key={index} className={classes.accordionWrap} square={true} classes={{root: classes.MuiAccordionroot}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <p>{hospital.name}</p>
              </AccordionSummary>
              <AccordionDetails classes={{root: classes.MuiAccordionDetails}}>
                <Typography className={classes.iconWrap} >
                  <MapIcon className={classes.iconStyle} /> Alamat: {hospital.address}
                </Typography>
                <Typography className={classes.iconWrap} >
                <a href={`tel:${hospital.phone}`}><PhoneIcon className={classes.iconStyle} /> Hubungi : {hospital.phone}</a>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })}

      </Container>
    </div>
  )
}

ReferenceList.propTypes = {
  hospitalData: propTypes.array
}

export default ReferenceList