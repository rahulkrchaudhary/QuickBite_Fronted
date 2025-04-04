// import { Button, Grid, TextField } from '@mui/material'
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
// // import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs';
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { createEvent } from '../../component/State/Restaurant/Action'

// export const CreateEvent = () => {

//   const dispatch=useDispatch()
//   const jwt=localStorage.getItem("jwt")
//   const {restaurant}=useSelector(store=>store)

//   const [formValues, setFormValues] = React.useState({
//     image: '',
//     location: '',
//     name: '',
//     // startAt: dayjs(),
//     // endAt: dayjs()
//     startAt: null,
//     endAt: null
//   })
//   const handleSubmit=(e)=>{
//     e.preventDefault()
//     console.log("submit output",formValues)
//     dispatch(createEvent({
//       data:formValues, 
//       restaurantId:restaurant.usersRestaurant?.id, 
//       jwt
//     }))
//     setFormValues({
//       image: '', 
//       location: '',
//       name: '',
//       startAt: null,
//       endAt: null
//       })
    
//   }
//   const handleFormChange=(e)=>{
//     setFormValues({
//       ...formValues,
//       [e.target.name]:e.target.value
//     })
//   }
//   const handleDateChange=(date, dateType)=>{
//     // const formatedDate=dayjs(date).format("DD/MM/YYYY HH:mm")
//     const formatedDate=dayjs(date).format("MMMM DD, YYYY hh:mm A")

//     setFormValues({
//       ...formValues,
//       [dateType]:formatedDate 
//     })

//   }
  
//   return (
//     <div className=''>
//         <div  className='p-0'>
//             <h1 className='text-gray-400 text-center text-xl pb-10'>Create Event</h1>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <TextField
//                     name='image'
//                     label="Image URL"
//                     variant='outlined'
//                     fullWidth
//                     value={formValues.image}
//                     onChange={handleFormChange}>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     name='location'
//                     label="Location"
//                     variant='outlined'
//                     fullWidth
//                     value={formValues.location}
//                     onChange={handleFormChange}>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     name='name'
//                     label="Name"
//                     variant='outlined'
//                     fullWidth
//                     value={formValues.name}
//                     onChange={handleFormChange}>
//                   </TextField>
//                 </Grid> 
//                 <Grid item xs={12}>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     {/* <Grid> */}
//                       <DateTimePicker
//                         // renderInput={(props) => <TextField {...props} />}
//                         label="Start Date and Time"
//                         value={formValues.startAt}
//                         onChange={(newValue) => handleDateChange(newValue, "startAt")}
//                         // inputFormat="MM/dd/yyyy hh:mm a"
//                         // className='w-full'
//                         // sx={{ width: "100%" }}
//                         sx={{ width: "100%" }}
//                         slotProps={{textField: {fullWidth: true}}}
//                         >
//                       </DateTimePicker>
//                     {/* </Grid> */}
//                   </LocalizationProvider>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DateTimePicker
//                       // renderInput={(props) => <TextField {...props} />}
//                       label="End Date and Time"
//                       value={formValues.endAt}
//                       onChange={(newValue) => handleDateChange(newValue, "endAt")}
//                       // inputFormat="MM/dd/yyyy hh:mm a"
//                       className='w-full'
//                       sx={{ width: "100%" }}
//                       slotProps={{textField: {fullWidth: true}}}>
//                     </DateTimePicker>
//                   </LocalizationProvider>
//                 </Grid>
//                 <Grid item xs={12} >
//                   <Button fullWidth type="submit" variant='contained'>Submit</Button>
//                 </Grid>
//               </Grid>
//              </form>
//         </div>
//     </div>
//   )
// }

import { Button, Grid, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../component/State/Restaurant/Action';

export const CreateEvent = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);

  const [formValues, setFormValues] = useState({
    image: '',
    location: '',
    name: '',
    startedAt: dayjs(), // Ensures the date picker works properly
    endsAt: dayjs()
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.startedAt || !formValues.endsAt) {
      alert("Please select valid start and end dates");
      return;
    }

    const formattedData = {
      ...formValues,
      startAt: formValues.startedAt.format("YYYY-MM-DD HH:mm:ss"),
      endAt: formValues.endsAt.format("YYYY-MM-DD HH:mm:ss"),
    };

    console.log("Submit output:", formattedData);
    
    dispatch(createEvent({
      data: formattedData,
      restaurantId: restaurant.usersRestaurant?.id,
      jwt
    }));

    setFormValues({
      image: '',
      location: '',
      name: '',
      startedAt: dayjs(),
      endsAt: dayjs()
    });
  };

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({
      ...formValues,
      [dateType]: dayjs(date)
    });
  };

  return (
    <div>
      <div className="p-0">
        <h1 className="text-gray-400 text-center text-xl pb-10">Create Event</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="image"
                label="Image URL"
                variant="outlined"
                fullWidth
                value={formValues.image}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="location"
                label="Location"
                variant="outlined"
                fullWidth
                value={formValues.location}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={formValues.name}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Date and Time"
                  value={formValues.startedAt}
                  onChange={(newValue) => handleDateChange(newValue, "startedAt")}
                  sx={{ width: "100%" }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="End Date and Time"
                  value={formValues.endsAt}
                  onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                  sx={{ width: "100%" }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};
