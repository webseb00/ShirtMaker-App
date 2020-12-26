import { useState } from 'react';
import { Grid, Paper, FormControl, FormControlLabel, RadioGroup, Radio, Typography, Switch, TextField, makeStyles, Button } from '@material-ui/core/';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    '& .MuiGrid-root': {
      width: '100%',
      '& .MuiPaper-root': {
        padding: '15px'
      }
    },
    '& .MuiTextField-root': {
      marginBottom: '15px'
    }
  }
});

export default function OrderMethod({ clientData, setClientData, delivery, setDelivery, deliveryInfo, setDeliveryInfo, message }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const methods = useForm();
  const { register, handleSubmit, errors } = useForm();
  const { control, reset } = methods;

  const handleField = e => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  }

  const handleChange = e => {
    setDelivery(e.target.value);
  }

  const toggleChecked = () => {
    let deliveryData;
    setChecked(prev => !prev);
    // if toggle button is checked, assign default values or remove them
    if(!checked) {
      const { street_name, home_number, zip_code, city } = clientData;
      deliveryData = {
        street_name,
        home_number,
        zip_code,
        city
      };
    } else {
      deliveryData = {
        street_name: '',
        home_number: '',
        zip_code: '',
        city: ''
      };
    }

    setDeliveryInfo({ ...deliveryData });
  }

  const showAlert = () => {
    return <Alert severity="error">{message}</Alert>;
  }

  const showForm = () => {
    return (
      <>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={toggleChecked}
              color="primary"
            />
          }
          label="Adres taki sam jak na rachunku"
        />
        <form>
          <TextField
            id="outlined-basic"
            name="street_name"
            label="Street name"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleField}
            control={control}
            inputRef={register({ required: 'Street name is required' })}
            value={deliveryInfo.street_name}
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
            onChange={handleField}
            control={control}
            inputRef={register({ required: 'Number cannot be lesser than 1', min: 1 })}
            value={deliveryInfo.home_number}
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
            onChange={handleField}
            control={control}
            inputRef={register({ required: 'Zip Code should be in format 00-000', pattern: /^[0-9]{2}\-[0-9]{3}$/})}
            value={deliveryInfo.zip_code}
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
            onChange={handleField}
            control={control}
            inputRef={register({ required: 'Please add city name' })}
            value={deliveryInfo.city}
            helperText={errors.city?.message}
            error={errors.city ? true : false}
          />
          <Button type="submit" color="primary" variant="contained">Submit</Button>
        </form>
      </>
    )
  }

  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Grid item xs={12} sm={6}>
        {message && showAlert()}
        <Paper>
          <Typography variant="h6">Choose way of delivery:</Typography>
          <FormControl>
            <RadioGroup aria-label="gender" name="gender1" value={delivery} onChange={handleChange}>
              <FormControlLabel value="personal" control={<Radio />} label="Personal pickup" />
              <FormControlLabel value="shipment" control={<Radio />} label="Shipment" />
            </RadioGroup>
          </FormControl>
          {delivery === 'shipment' ? showForm() : false}
        </Paper>
      </Grid>
    </Grid>
  );
};
