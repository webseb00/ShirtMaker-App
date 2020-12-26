import { Grid, Paper, FormControlLabel, Switch, Button, Divider, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import front from '../../../images/front.png';
import back from '../../../images/back.png';

const useStyles = makeStyles({
  root: {
    '& .order-item': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px',
      margin: '15px 0',
      border: '2px solid #fff'
    },
    '& .order-item.active': {
      borderColor: '#2ecc71'
    },
    '& .summary-cta': {
      display: 'flex',
      flexDirection: 'column',
      margin: '20px'
    },
    '& img': {
      width: '120px'
    }
  }
});

export default function ImageFormSummary({ image, imageStyle, shirtType, setCount, confirm, handleConfirm, message }) {
  const classes = useStyles();
  const { step1, step2, step3 } = confirm;

  const toggleSwitch = e => {
    handleConfirm({ ...confirm, [e.target.name]: e.target.checked });
  }
  const handleClick = num => {
    setCount(num);
  }
  const showAlert = () => {
    return (
      <Grid item xs={12} sm={6}>
        <Alert severity="error">{message}</Alert>
      </Grid>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={3}>
        {message && showAlert()}
        <Grid item xs={12} sm={8}>
          <Paper className={`order-item ${step1 ? 'active' : ''}`}>
            <img src={shirtType === 'front' ? front : back} alt="shirt" />
            <Divider orientation="vertical" flexItem />
            <div className="summary-cta">
              <FormControlLabel
                control={<Switch name="step1" checked={step1} onChange={toggleSwitch} />}
                label="Confirm step"
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleClick(0)}>
                Edit
              </Button>
            </div>
          </Paper>
          <Paper className={`order-item ${step2 ? 'active' : ''}`}>
            <img src={image} alt="image" />
            <Divider orientation="vertical" flexItem />
            <div className="summary-cta">
              <FormControlLabel
                control={<Switch name="step2" checked={step2} onChange={toggleSwitch} />}
                label="Confirm step"
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleClick(1)}>
                Edit
              </Button>
            </div>
          </Paper>
          {
            imageStyle &&
            <Paper className={`order-item ${step3 ? 'active' : ''}`}>
              <img src={imageStyle} alt="shirt" />
              <Divider orientation="vertical" flexItem />
              <div className="summary-cta">
                <FormControlLabel
                  control={<Switch name="step3" checked={step3} onChange={toggleSwitch} />}
                  label="Confirm step"
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleClick(2)}>
                  Edit
                </Button>
              </div>
            </Paper>
          }
        </Grid>
      </Grid>
    </div>
  )
}
