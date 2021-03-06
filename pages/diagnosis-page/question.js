import QuestionHero from '../../components/QuestionHero'
import Container from '@material-ui/core/Container'
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useState } from 'react'
import styles from '../../styles/pages/question.module.scss'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slide from '@material-ui/core/Slide';
import FormHelperText from '@material-ui/core/FormHelperText';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';

const QuestionPage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [answer, setAnswer] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: ""
  });
  const [checked, setChecked] = useState(true);
  const [error, setError] = useState(false);
  const [finish, setFinish] = useState(false)

  const handleAnswer = e => {
    const {name, value} = e.target;
    setAnswer(prevState => ({
      ...prevState,
      [name] : value
    }))
  }

  const onNext = () => {
    switch(activeStep + 1) {
      case 1:
        if(!answer.question1){
          setError(true)
        } else {
          handleNext()
        }
        break;
      case 2:
        if(!answer.question2){
          setError(true)
        } else {
          handleNext()
        }
        break;
      case 3:
        if(!answer.question3){
          setError(true)
        } else {
          handleNext()
        }
        break;
      case 4:
        if(!answer.question4){
          setError(true)
        } else {
          handleNext()
        }
        break;
      default:
        setError(false)
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleAnimation()
    setError(false)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleAnimation()
  };

  const handleSubmit = () => {
    if(!answer.question5){
      setError(true)
    } else {
      setError(false)
      setFinish(true)
      console.log('submit', answer)
    }
  }

  function handleAnimation() {
    setChecked((prev) => !prev);
    setTimeout(() => {
      setChecked((prev) => !prev);
    }, 300)
  }

  function getStepContent(step) {
    switch (step) {
      case 0 :
        return (
          <div className={styles["question-wrap"]}>
            <h3>Apakah anda pernah bertemu dengan pasien positif COVID-19 (berada dalam satu ruangan yang sama / kontak dalam jarak 1 meter)?</h3>
            <FormControl component="fieldset" error={error} >
              <RadioGroup aria-label="gender" name="question1" value={answer.question1} onChange={handleAnswer}>
                <FormControlLabel value="1" control={<Radio />} label="Ya" />
                <FormControlLabel value="2" control={<Radio />} label="Tidak/ Tidak Tahu" />
              </RadioGroup>
              {error && <FormHelperText>Please select an option.</FormHelperText>}
            </FormControl>
          </div>
        )
      case 1 :
        return (
          <div className={styles["question-wrap"]}>
            <h3>Apakah anda pernah berkunjung ke negara terjangkit/di area transmisi lokal COVID-19 dalam 14 hari?</h3>
            <FormControl component="fieldset" error={error}>
              <RadioGroup aria-label="gender" name="question2" value={answer.question2} onChange={handleAnswer}>
                <FormControlLabel value="1" control={<Radio />} label="Ya" />
                <FormControlLabel value="2" control={<Radio />} label="Tidak" />
              </RadioGroup>
              {error && <FormHelperText>Please select an option.</FormHelperText>}
            </FormControl>
          </div>
        )
      case 2 :
        return (
          <div className={styles["question-wrap"]}>
            <h3>Saya pergi keluar rumah</h3>
            <FormControl component="fieldset" error={error}>
              <RadioGroup aria-label="gender" name="question3" value={answer.question3} onChange={handleAnswer}>
                <FormControlLabel value="1" control={<Radio />} label="Ya" />
                <FormControlLabel value="2" control={<Radio />} label="Tidak" />
              </RadioGroup>
              {error && <FormHelperText>Please select an option.</FormHelperText>}
            </FormControl>
          </div>
        )
      case 3 :
        return (
          <div className={styles["question-wrap"]}>
            <h3>Saya menggunakan transportasi umum(transportasi online, angkot, bus, taksi, kereta)</h3>
            <FormControl component="fieldset" error={error}>
              <RadioGroup aria-label="gender" name="question4" value={answer.question4} onChange={handleAnswer}>
                <FormControlLabel value="1" control={<Radio />} label="Ya" />
                <FormControlLabel value="2" control={<Radio />} label="Tidak" />
              </RadioGroup>
              {error && <FormHelperText>Please select an option.</FormHelperText>}
            </FormControl>
          </div>
        )
      case 4 :
        return (
          <div className={styles["question-wrap"]}>
            <h3>Saya memakai masker pada saat berkumpul dengan orang lain</h3>
            <FormControl component="fieldset" error={error}>
              <RadioGroup aria-label="gender" name="question5" value={answer.question5} onChange={handleAnswer}>
                <FormControlLabel value="1" control={<Radio />} label="Ya" />
                <FormControlLabel value="2" control={<Radio />} label="Tidak" />
              </RadioGroup>
              {error && <FormHelperText>Please select an option.</FormHelperText>}
            </FormControl>
          </div>
        )  
      default :
        return 'default content'
    }
  }

  function nextButtonContent(step) {
    switch (step) {
      case 4:
        return (
          <Button size="small" onClick={handleSubmit}>
            Finish
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        )
      default:
        return (
          <Button size="small" onClick={onNext} disabled={activeStep === 4}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        )
    }
  }

  return (
    <Container>
      <QuestionHero />
      {finish &&
        <Fade in={finish} timeout={800, 1000}>
          <Alert severity="warning">Diagnosa mandiri hanyalah sebuah simulasi.</Alert>
        </Fade>
      }

      <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
        {getStepContent(activeStep)}
      </Slide>

      <MobileStepper
        variant="progress"
        steps={5}
        position="bottom"
        activeStep={activeStep}
        nextButton={nextButtonContent(activeStep)}
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Container>
  )
}

export default QuestionPage