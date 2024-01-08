import { Box, Button, Grid, InputBase, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useFormContext, Controller} from 'react-hook-form';
import { useEffect, useState } from 'react';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';


const CustomInput = styled(InputBase)(({ theme }) => ({
  sx:{ boxShadow: 3,
    borderRadius: 5,},
  background: theme.palette.primary.main,
  color: theme.palette.primary.dark,
  fontWeight: 600,
  textAlign: 'center',
  padding: theme.spacing(1.5, 4),
  borderRadius: 5,
  display: 'block',
  '&:focus': {
    display: 'none',
  },
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.dark,
  padding: theme.spacing(2, 4),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
  },
}));

const Sidebar = ({table}) => {
  
  const {control,handleSubmit,reset,getValues}= useFormContext({
    defaultValues:{
      titre:'',
      prix:'',
      quantite:'',
      date_exp:'',
        },
  });
  const [isEditing,setIsEditing]= useState(false);
  const id =getValues('id');

  useEffect(()=> {
    if (id) setIsEditing(true);
    else setIsEditing(false);
  },[id]);
  const onSubmit =( data) => {
    if (isEditing){
      table.options.meta.updateMedicament({ id, data});
    } else {
      table.options.meta.addMedicament({data});
    }

    
    reset({
    titre:'',
    prix:'',
    quantite:'',
    date_exp:'',});
  };
  
  return (
    <Box
     component="form"
     onSubmit={handleSubmit(onSubmit)}
      sx={{
        background: '#14A5FA',
        p: 4,
        borderRadius: 5,
         boxShadow: 9,
          borderRadius: 5,
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h4" align="center" color="primary.dark">
          {' '}
          <Typography variant="inherit" fontWeight="700" display="inline">
            gestion  des medicament
          </Typography>
        </Typography>
        <Box>
          <Controller 
          
           name="titre"
           control={control} 
           render={({field})=>(
           
           <CustomInput {...field} placeholder="saisir le titre" />)}
           />
           <Controller 
           name="prix"
           control={control} 
           render={({field})=>(
           <CustomInput {...field} placeholder=" saisir le prix"/>)}
           />
           <Controller 
           name="quantite"
           control={control} 
           render={({ field })=>(
           <CustomInput {...field} placeholder="saisir la qantité"/>)}
           />
           <Controller 
           name="date_exp"
           control={control} 
           render={({field})=>(
           <CustomInput  type='Date' {...field} placeholder="saisir la dat-exp"/>)}
           />
          

          
          
          
        </Box>
        <PrimaryButton  type= "submit" startIcon={isEditing ?  < DoneTwoToneIcon/> : <AddCircleTwoToneIcon />}>
          {isEditing ? 'modifier un medicament': 'creer un medicament'}
        </PrimaryButton>
      </Stack>
    </Box>
  );
};

export default Sidebar;
