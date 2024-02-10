import { Box, Button, Grid, InputBase, Select, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useFormContext, Controller} from 'react-hook-form';
import {useState, useEffect} from 'react';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
//Icon for calendar
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import SelectInput from '@material-ui/core/Select/SelectInput';
import React from 'react';


const CustomInput = styled(InputBase)(({ theme }) => ({
  background: '#f2f6ff',
  color: 'dark',
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

// le select
const CustomSelect = styled(Select)(({ theme }) => ({
  background: '#f2f6ff',
  color: 'dark',
  fontWeight: 600,
  textAlign: 'left',
  // padding: theme.spacing(0.5, 1),
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
  background: '#8ec6ff',
  padding: theme.spacing(1, 4),
  color: '#172d44',
  '&:hover': {
    backgroundColor: '#ffc83a',
  },
}));

const SidebarRDV = ({table}) => {
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  const handleClick = () => {
    setAfficherFormulaire(true);
  };
  const handleClose = () => {
    setAfficherFormulaire(false);
  };

  const { control, handleSubmit, reset, getValues} = useFormContext({
    defaultValues:{
      nom:'',
      prenom:'',
      tel:'',
      date:'',
      heureD:'',
      heureF:'',
      // standard: '',
    },
  });
  const [isEditing, setIsEditing]= useState(false);
  const id = getValues("id");

  useEffect(() => {
    if(id) setIsEditing(true);
    else setIsEditing(false);
  }, [id]);
  const onSubmit=(data) => {
    if(isEditing){
      table.options.meta.updateApp({ id,data })
    }else{
      table.options.meta.addApp({ data });
    }
    reset({
      nom:'',
      prenom:'',
      tel:'',
      date:'',
      heureD:'',
      heureF:'',
    });
  };
  return (
    <Box
    component="form"
    onSubmit={handleSubmit(onSubmit)}
      sx={{
        background: '#008fef',
        p: 4,
        borderRadius: 5,
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h4" align="center" color= "#172d44" fontWeight="500">
          RENDEZ VOUS
          {/* <Typography variant="inherit" fontWeight="700" display="inline">
          </Typography> */}
        </Typography>
        <Box>
          <Controller
            name="nom"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} placeholder="Nom"
              onChange={(e) => {
                // Vérifiez si la valeur entrée ne contient que des lettres majuscules ou minuscules
                if (/^[a-zA-Z]*$/.test(e.target.value)) {
                  // Mettez à jour la valeur du champ
                  field.onChange(e);
                }
              }}
              required
            />)}
          />
          <Controller
            name="prenom"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} placeholder="Prénom"
              onChange={(e) => {
                // Vérifiez si la valeur entrée ne contient que des lettres majuscules ou minuscules
                if (/^[a-zA-Z]*$/.test(e.target.value)) {
                  // Mettez à jour la valeur du champ
                  field.onChange(e);
                }
              }}
              required
            />)}
          />
          <Controller
            name="tel"
            control={control}
            render={({ field }) => (
              <CustomInput
              {...field}
              placeholder="Numéro de téléphone"
              onChange={(e) => {
                const inputValue = e.target.value;

                // Vérifiez si la valeur entrée est vide ou contient uniquement des chiffres
                if (/^[0-9]*$/.test(inputValue) || inputValue === '') {
                  // Vérifiez si la longueur totale de la chaîne est inférieure ou égale à 10
                  if (inputValue.length <= 10) {
                    // Mettez à jour la valeur du champ
                    field.onChange(e);
                  }
                }
              }}
              required
            />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} type='date' placeholder="Date du rendez-vous" required />)}
          />
          <Controller
            name="heureD"
            control={control}
            render={({ field }) => (
              <CustomInput
              {...field}
              placeholder="Heure du rendez-vous"
              onChange={(e) => {
                const inputValue = e.target.value.trim(); // Supprimer les espaces inutiles

                // Liste des valeurs valides
                const valeursValides = [
                  "09h30 - 10h15",
                  "10h20 - 11h05",
                  "11h10 - 12h00",
                  "13h10 - 13h55",
                  "14h05 - 14h50",
                  "15h00 - 15h45",
                  "15h55 - 16h40"
                ];

                // Vérifier si la valeur entrée fait partie des valeurs valides
                if (valeursValides.includes(inputValue)) {
                  // Mettez à jour la valeur du champ
                  field.onChange(e);
                }
              }}
              required
            />)}
          />  

        </Box>

        <PrimaryButton onClick={handleClick}>
          <CalendarMonthTwoToneIcon />
        </PrimaryButton>
        {afficherFormulaire && (
        <form style={{ textAlign: 'center', width: '235px', backgroundColor: '#F5F5DC', padding: '20px', borderRadius: '10px' }}>
          {/* Ajoutez vos champs de formulaire ici */}
          <label style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Crénaux horaires disponible :</label>
          <p>09h30 - 10h15</p>
          <p>10h20 - 11h05</p>
          <p>11h10 - 12h00</p>
          <p>13h10 - 13h55</p>
          <p>14h05 - 14h50</p>
          <p>15h00 - 15h45</p>
          <p>15h55 - 16h40</p>
   
          {/* Bouton pour fermer le formulaire */}
          <PrimaryButton onClick={handleClose}>
            <CloseIcon/>
          </PrimaryButton>
        </form>
      )}
      
        <PrimaryButton type="submit" startIcon={ isEditing ? <DoneTwoToneIcon /> : <AddCircleTwoToneIcon />}>
          {isEditing ? 'Modifier le rendez-vous': 'Ajouter le rendez-vous'}
        </PrimaryButton>
      </Stack>
    </Box>
  );
};

export default SidebarRDV;
