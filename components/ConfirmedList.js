import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import propTypes from 'prop-types';  
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  listWrap: {
    backgroundColor: '#EEF3FF',
    paddingBottom: '3rem'
  },
  titleList: {
    margin: '0'
  },
  subTilte: {
    margin: '0',
    textDecoration: 'underline',
    color: '#1E7AA2'
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
  }
}))

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="subtitle1">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const ConfirmedList = ({locationData}) => {
  const classes = useStyles();
  const [search, setSearch] = useState('')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let filteredLocation = locationData.data.filter((location) => {
    return location.provinsi.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  function renderZona(cases) {
    if(cases > 4000) {
      return (
        <div className="level-red">   
          <p className="title-capsule">Zona Merah</p>
        </div>
      )
    } else if (cases > 3000 && cases < 4000) {
      return (
        <div className="level-orange">   
          <p className="title-capsule">Zona Orange</p>
        </div>
      )
    } else if (cases > 2000 && cases < 3000) {
      return (
        <div className="level-yellow">   
          <p className="title-capsule">Zona Kuning</p>
        </div>
      )
    } else {
      return (
        <div className="level-green">   
          <p className="title-capsule">Zona Hijau</p>
        </div>
      )
    }
  }
  
  return (
    <div className={classes.listWrap}>
      <Container>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <p className={classes.titleList}>Lokasi Area Provinsi</p>
        <p className={classes.subTilte} onClick={handleClickOpen}>Pelajarin Level Zona</p>
      </Grid>
        
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
                <Divider />
                <ul className={classes.listDetail}>
                  <li>Kasus Positif: {location.kasusPosi}</li>
                  <li>Kasus Sembuh: {location.kasusSemb}</li>
                  <li>Kasus Meninggal: {location.kasusMeni}</li>
                </ul>
              </AccordionDetails>
            </Accordion>
          )
        })}

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          ARTI LEVEL ZONA TIAP AREA
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.levelRed}>   
            <p className={classes.zonaTitle}>Zona Merah</p>
          </div>
          <p className={classes.titleList}>Pada wilayah dengan zona merah, tingkat transmisi penyeberan virus corona Covid-19 sangat cepat. Ciri cirinya adalah:</p>
          <ul className={classes.listDetail}>
            <li>Terjadi transmisi lokal atau penyebaran virus corona antarwarga setempat di satu wilayah dengan cepat.</li>
          </ul>
          <div className={classes.levelOrange}>   
            <p className={classes.zonaTitle}>Zona Orange</p>
          </div>
          <p className={classes.titleList}>Pada wilaya dengan zona oranye ini tingkat transmisi penyebaran corona Covid-19 masih tinggi.</p>
          <ul className={classes.listDetail}>
            <li>Kluster baru harus terpantau dan dikontrol melalui testing dan racing secara agresif</li>
          </ul>
          <div className={classes.levelYellow}>   
            <p className={classes.zonaTitle}>Zona Kuning</p>
          </div>
          <p className={classes.titleList}> Pada wilayah dengan zona kuning:</p>
          <ul className={classes.listDetail}>
            <li>Kemungkinan terjadinya transmisi lokal masih cukup besar dan mungkin cepat. • Transmisi dari imported cases bisa terjadi cepat</li>
          </ul>
          <div className={classes.levelGreen}>   
              <p className={classes.zonaTitle}>Zona Hijau</p>
            </div>
          <p className={classes.titleList}>Pada wilayah dengan status zona hijau memiliki ciri-ciri sebagai berikut</p>
          <ul className={classes.listDetail}>
            <li>Pengawasan ketat dan berkala dilakukan untuk mencegah timbulnya potensi kasus baru.</li>
          </ul>
        </DialogContent>
      </Dialog>

      </Container>
    </div>
  )
}

propTypes.ConfirmedList = {
  locationData: propTypes.object.isRequired
}

export default ConfirmedList