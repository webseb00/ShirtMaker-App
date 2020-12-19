import { TextField, Paper, Grid, Button, makeStyles } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
// import OrderDetails from '../../common/OrderDetails';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: '500px',
    textAlign: 'center',
    '& .MuiPaper-root': {
      padding: '10px',
      marginBottom: '10px',
      '& .MuiFormControl-root:not(:last-child)': {
        marginBottom: '12px'
      }
    },
    '.MuiAlert-root': {
      marginTop: '20px'
    },
    '& .MuiButtonBase-root': {
      margin: '15px 0'
    }
  }
});

export default function ClientData({ setData, image, shirtType, message }) {
  const classes = useStyles();
  // react hook form features
  const methods = useForm();
  const { register, handleSubmit, errors } = useForm();
  const { control, reset } = methods;

  const onSubmit = data => {
    setData(data);
  };

  const showAlert = () => {
    return <Alert severity="error">{message}</Alert>;
  };
  
  return (
    <Grid container justify="center" spacing={3}>
      {/* <Grid item xs={12} md={4}>
        <p>Your order details:</p>
        <OrderDetails img={image} type={shirtType} />
      </Grid> */}
      <Grid item xs={12}>
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        {message && showAlert()}
          <Paper>
            <TextField
              name="first_name"
              label="First Name"
              id="outlined-basic"
              fullWidth
              variant="outlined"
              control={control}
              inputRef={register({ required: 'First name is required', pattern: /[a-z]/ig })}
              defaultValue=""
              size="small"
              helperText={errors.first_name?.message}
              error={errors.first_name ? true : false}
            />
            <TextField
              name="last_name"
              label="Last Name"
              id="outlined-basic"
              fullWidth
              variant="outlined"
              control={control}
              inputRef={register({ required: 'Last name is required', pattern: /[a-z]/ig })}
              defaultValue=""
              size="small"
              helperText={errors.last_name?.message}
              error={errors.last_name ? true : false}
            />
          </Paper>
          <Paper>
            <TextField 
              id="outlined-basic"
              name="street_name" 
              label="Street name" 
              variant="outlined"
              size="small" 
              fullWidth
              control={control}
              inputRef={register({ required: 'Street name is required' })}
              helperText={errors.street_name?.message}
              error={errors.street_name ? true : false}
            />
            <TextField
              name="home_number" 
              type="number"
              id="outlined-basic" 
              label="Home number" 
              variant="outlined"
              size="small" 
              fullWidth
              control={control}
              inputRef={register({ required: 'Number cannot be lesser than 1', min: 1 })}
              helperText={errors.home_number?.message}
              error={errors.home_number ? true : false}
            />
            <TextField
              name="zip_code"
              id="outlined-basic" 
              label="Zip Code" 
              variant="outlined"
              size="small" 
              fullWidth 
              control={control}
              inputRef={register({ required: 'Zip Code should be in format 00-000', pattern: /^[0-9]{2}\-[0-9]{3}$/})}
              helperText={errors.zip_code?.message}
              error={errors.zip_code ? true : false}
            />
            <TextField
              name="city"
              id="outlined-basic" 
              label="City" 
              variant="outlined"
              size="small" 
              fullWidth  
              control={control}
              inputRef={register({ required: 'Please add city name' })}
              helperText={errors.city?.message}
              error={errors.city ? true : false}
            />
          </Paper>
          <Paper>
            <TextField 
              name="phone_number"
              type="tel"
              id="outlined-basic" 
              label="Phone number" 
              variant="outlined"
              size="small"
              fullWidth  
            />
            <TextField 
              name="email"
              type="email"
              id="outlined-basic" 
              label="Email address" 
              variant="outlined"
              size="small" 
              fullWidth
              control={control}
              inputRef={register({ required: 'Email must contain @ and . symbols', pattern: /\w.+\@\w+\.\w+/g })}
              helperText={errors.email?.message}
              error={errors.email ? true : false}
            />
          </Paper>
          <Button 
            type="submit" 
            color="primary" 
            variant="contained">
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}