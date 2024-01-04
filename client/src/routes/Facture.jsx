
import '../components/home'
import { 
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';


import { useState,useEffect, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/theme';
import { Box, Grid, IconButton } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { Container } from '@mui/system';
import axios from 'axios';
import Home from '../components/home';
import Sidebar from '../components/sidebar';
import {useForm, FormProvider} from 'react-hook-form';
import {
  
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"


axios.defaults.baseURL ='http://localhost:1337/api';
const boxStyle = {
  height: '100vh',
  width: '100vw',
  bgcolor: 'primary.extraLight',
};

const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor(({attributes}) => attributes.tarifPaye, {
//     id:'tarifPaye',
//     header : 'Tarif Payé',
//   }),columnHelper.accessor(({attributes}) => attributes.dateFacture,{
//    id:'dateFacture',
//     header : 'Date Facture',
//   }),columnHelper.accessor(({attributes}) => attributes.modePaiement,{
//     id:'modePaiement',
//     header : 'Mode paiement',
//   }),columnHelper.accessor(({attributes}) => attributes.nomPatient,{
//     id:'nomPatient',
//     header : '  Nom Patient',
//   }),columnHelper.accessor(({attributes}) => attributes.prenomPatient,{
//     id:'prenomPatient',
//     header : 'Prenom Patient',
//    })
//    ,columnHelper.display({
//        id:'actions',
//        header:'Actions',
//        cell: (props) =>{
//         console.log(props);
//         return(
//          <>
//           <IconButton>
//             <EditTwoToneIcon color='primary'/>
//           </IconButton>
//           <IconButton>
//             <DeleteOutlineTwoToneIcon color='error'/>
//           </IconButton>

//          </>);
//        }
//    }),
// ];

import filter  from 'lodash';
function App() {
  const[data,setData] = useState([]);
  const defaultData = useMemo(() => [], []);
  const methods= useForm();
  const columns = useMemo(() => [
    columnHelper.accessor(({attributes}) => attributes.tarifPaye, {
      id:'tarifPaye',
      header : 'Tarif Payé',
    }),columnHelper.accessor(({attributes}) => attributes.dateFacture,{
     id:'dateFacture',
      header : 'Date Facture',
    }),columnHelper.accessor(({attributes}) => attributes.modePaiement,{
      id:'modePaiement',
      header : 'Mode paiement',
    }),columnHelper.accessor(({attributes}) => attributes.firstName,{
      id:'firstName',
      header : '  Nom Patient',
    }),columnHelper.accessor(({attributes}) => attributes.lastName,{
      id:'lastName',
      header : 'Prenom Patient',
     })
     ,
     ,columnHelper.display({
         id:'actions',
         header:'Actions',
         cell: ({row}) =>{
          
          return(
           <>
             <IconButton
                onClick={() => methods.reset({
                    id: row.original.id,
                    ...row.original.attributes,
                  })
                }
              >
              <EditTwoToneIcon color='primary'/>
            </IconButton>
            <IconButton
                

             onClick={()=>
              table.options.meta.deleteFacture(row.original.id)
             }
            >
              <DeleteOutlineTwoToneIcon color='error'/>
            </IconButton>
  
           </>);
         }
     }),
  ],[] );
 
  useEffect(() => {
    const loadData = async () => {
      const {data } = await axios.get('api/factures?populate=*');

      setData(data.data);  
      console.log(data);
    };
    loadData();
  }, []);
  
  const table = useReactTable({
    data: data ?? defaultData  ,
    columns,
   
    getCoreRowModel: getCoreRowModel(),
    meta:{
      addFacture: async (facture) =>{
        const{data} =await axios.post('/factures',facture);
        console.log(facture);
        setData(prevState =>  [data.data, ...prevState]); 
      },
      updateFacture: async ({ id,...facture}) =>{
        const{data} =await axios.put(`/factures/${id}`,facture);
        console.log(facture);
        setData(prevState =>
           prevState.map((item) => (item.id == id ? data.data : item))); 
      },deleteFacture: async (factureId) =>{
       await axios.delete(`/factures/${factureId}`);
        
        setData(prevState => prevState.filter(item => item.id !=factureId)); 
      },
    },
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <FormProvider {...methods}>
        <CssBaseline />
        <Box sx={boxStyle}>
          <Container maxWidth="xl" sx={{ py: 2 }}>
            <Grid columnSpacing={4} container>
              <Grid item md={3}>
                <Sidebar table={table}  />
              </Grid>
              <Grid item md={9}>
      
           <Home table={table}>
       
   
           </Home>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        </FormProvider>
      </ThemeProvider>
    </>
    
  );
}

export default App;
