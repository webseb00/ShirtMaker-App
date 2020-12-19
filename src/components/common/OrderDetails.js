import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import front from '../../images/front.png';
import back from '../../images/back.png';

const useStyles = makeStyles({
  main: {
    position: 'relative',
    width: '250px'
  },
  image: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: '120px'
  }
});

const OrderDetails = ({ img, type }) => {
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.main}>
        <img src={type === 'front' ? front : back} alt="shirt" />
        <img src={img} className={classes.image} /> 
      </div>
    </Paper>
  )
}

export default OrderDetails;