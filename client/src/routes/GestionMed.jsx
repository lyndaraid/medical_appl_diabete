import '../components/home1'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/theme1';

import { Box, Grid,IconButton } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'; 
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Container } from '@mui/system';
import axios from 'axios';
import Home from '../components/home1';
import Sidebar from '../components/sidebar1';
import { createColumnHelper,
  getCoreRowModel,
  useReactTable} from '@tanstack/react-table';
import { useEffect, useState ,useMemo } from 'react';
import { useForm, FormProvider} from 'react-hook-form';
axios.defaults.baseURL ='http://localhost:1337/api'
const boxStyle = {
  height: '100vh',
  width: '100vw',
  bgcolor: 'primary.extraLight',
};
const columnHelper =createColumnHelper();
 //const columns =



function GestionMed() {
  const [data,setData] = useState([]);
  const defaultData = useMemo(()=> [],[]);
  const methods = useForm();
  const columns = useMemo(()=>
  [
    columnHelper.accessor( ({attributes}) => attributes.titre, {
      id:'titre',
      header:'titre',}),
    columnHelper.accessor( ({attributes}) => attributes.prix, {
        id:'prix',
        header:'prix',}),
    columnHelper.accessor( ({attributes}) => attributes.quantite, {
       id:'quantite',
       header:'quantite',}),  
    columnHelper.accessor( ({attributes}) => attributes.date_exp, {
        id:'date_exp',
        header:'date_exp',}), 
    columnHelper.display({
    id:'action',
    header:'actions',
    cell: ({ row,table }) =>{
      
      return(
      <>
        <IconButton 
             onClick={()=>
               methods.reset({
                      id: row.original.id,
                      ...row.original.attributes
                    })}>
        <EditTwoToneIcon color='yellow'/>
        </IconButton>
  
        <IconButton  onClick={()=> table.options.meta.deleteMedicament(row.original.id)} >
         <DeleteTwoToneIcon color='error'/>
        </IconButton>
      </>
      );
    },
    }), 
    ],
    [] 
    ); 
  
  useEffect(()=>{
    const loadData = async () => {
      const {data} = await axios.get('/medicaments');
      setData(data.data);

    };
    loadData();
  },[]);

   const table = useReactTable ({
    data:data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      addMedicament:async(medicament) => {
      const {data} = await axios.post('/medicaments', medicament);
      setData((prevState) =>[data.data,...prevState]);
      },
      updateMedicament :async({id,...medicament}) => {
        const {data} = await axios.put(`/medicaments/${id}`, medicament);
      setData((prevState) =>
             prevState.map( item => (item.id == id ? data.data:  item))
             );
        },
      deleteMedicament: async (medicamentId)=>{
         await axios.delete(`/medicaments/${medicamentId}`);  
        setData((prevState)=> prevState.filter(item => item.id  != medicamentId))
        }
     },
   });
  return (
    <>
      <ThemeProvider theme={theme}>
        <FormProvider {...methods}>    
        <CssBaseline />
        <Box sx={boxStyle}>
          <Container maxWidth="xl" sx={{ py: 2 }}>
            <Grid columnSpacing={4} container>
              <Grid item md={3}>
                <Sidebar table ={table} />
              </Grid>
              <Grid item md={9}>
                <Home table = {table} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        </FormProvider>
      </ThemeProvider>
    </>
  );
}

export default GestionMed;