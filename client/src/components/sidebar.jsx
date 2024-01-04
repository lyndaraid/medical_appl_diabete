import { Box, Button, Grid, InputBase, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { shadows } from '@mui/system';
import {useFormContext,Controller} from 'react-hook-form';
import { useEffect, useState } from 'react';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';

const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z-]+$/;

const CustomInput = styled(InputBase)(({theme}) => ({
  
  sx:{ boxShadow: 3,
    borderRadius: 5,},
  margin: theme.spacing(3, 1),
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
  background: theme.palette.primary.light,
  color:"white",
  padding: theme.spacing(2, 4),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Sidebar = ({table}) => {
  const {control,handleSubmit,reset,getValues} = useFormContext({
      defaultValues:{
        tarifPaye:'',
        dateFacture:'',
        modePaiement:'',
        firstName:'',
        lastName:'',
      },
  });

 
  const [isEditing,setEditing] = useState(false);
  const id = getValues('id');
  console.log("id::::",id);

  useEffect(() => {
    if (id)setEditing(true);
      
    else setEditing(false);
      
  },[id]);
 const onSubmit =(data) =>{
  if (isEditing) {
    table.options.meta.updateFacture({ id,data});
  } else {
    table.options.meta.addFacture({ data});
  }
  
  reset({
    tarifPaye:'',
    dateFacture:'',
    modePaiement:'',
    firstName:'',
    lastName:'',
  });
 };

  return (
      <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ boxShadow: 3,
      p: 4,
      borderRadius: 5, }}>
      <Stack spacing={4}>
        <Typography variant="h4" align="center" color="grey.main">
          {' '}
          <Typography variant="inherit" fontWeight="700" display="inline">
            Nouvelle Facture
          </Typography>
        </Typography>
        <Box>
        
        <Controller
        name="firstName"
        control={control}
        render={({field}) =>(
          <Box sx={{ boxShadow: 3,
            borderRadius: 5, }}> 
            <CustomInput  {...field} onKeyDown={(event) => {
              const key = event.key;
          
              // Allow backspace key (code 8) and delete key (code 46)
              if (key !== 'Backspace' && key !== 'Delete' && !ALPHA_NUMERIC_DASH_REGEX.test(key)) {
                event.preventDefault();
              }
            }} type='text'  placeholder="Insérez le nom"  required/></Box>
        ) }
        />
        <Controller
        name="lastName"
        control={control}
        render={({field}) =>(
          <Box sx={{ boxShadow: 3,
            borderRadius: 5, }}><CustomInput {...field}  onKeyDown={(event) => {
              const key = event.key;
          
              // Alow backspace key (code 8) and delete key (code 46)
              if (key !== 'Backspace' && key !== 'Delete' && !ALPHA_NUMERIC_DASH_REGEX.test(key)) {
                event.preventDefault();
              }
            }} type='text' placeholder="Insérez le prénom" required/></Box>
        ) }
        />
        <Controller
        name="tarifPaye"
        control={control}
        render={({field}) =>(
          <Box sx={{ boxShadow: 3,
            borderRadius: 5, }}><CustomInput {...field} type='number' placeholder="Tarife payé" /></Box>
        ) }
        required/>
        <Controller
        name="dateFacture"
        control={control}
        render={({field}) =>(
          <Box sx={{ boxShadow: 3,
            borderRadius: 5,  }}><CustomInput {...field} type='date' placeholder="Date de la facture" /></Box>
        ) }
        required/>
        <Controller
        name="modePaiement"
        control={control}
        render={({field}) =>(
          <Box sx={{ boxShadow: 3,
            borderRadius: 5, }}><CustomInput {...field}  onKeyDown={(event) => {
              const key = event.key;
          
              // Allow backspace key (code 8) and delete key (code 46)
              if (key !== 'Backspace' && key !== 'Delete' && !ALPHA_NUMERIC_DASH_REGEX.test(key)) {
                event.preventDefault();
              }
            }} type='text' placeholder="Choisissez le mode de paiement" required /></Box>
        ) }
        required/>
        
        
         
        </Box>
        <PrimaryButton type='submit' startIcon={ isEditing ? <DoneTwoToneIcon/> : <AddCircleTwoToneIcon />}  >
          {isEditing ? 'Modifier facture' : 'Créer afcture'}
        </PrimaryButton>

        
      </Stack>
      </Box>
  
  );
};


export default Sidebar;
