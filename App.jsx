import {useState, useEffect, useMemo} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/themeRDV';
import { Box, Grid, Icon, IconButton} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Container } from '@mui/system';
import axios from "axios";
import Home from '../components/homeRDV';
import Sidebar from '../components/sidebarRDV';
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useForm, FormProvider} from 'react-hook-form';

axios.defaults.baseURL='http://localhost:1337/api';

const boxStyle = {
  height: '100vh',
  width: '100vw',
  bgcolor: 'white',
};

const columnHelper = createColumnHelper();

//juste pour la couleur de edit
const EditColor = "#008fef";

// const columns = 

function App() {
  const [data, setData] = useState([]);
  const defaultData = useMemo(() => [], []);
  const methods = useForm();
  const columns = useMemo(() => [
    columnHelper.accessor(({attributes}) => attributes.nom, {
      id: 'nom',
      header:'Nom',
    }),
    columnHelper.accessor(({attributes}) => attributes.prenom, {
      id: 'prenom',
      header:'Prénom',
    }),
    columnHelper.accessor(({attributes}) => attributes.tel, {
      id: 'tel',
      header:'Téléphone',
    }),
    columnHelper.accessor(({attributes}) => attributes.date, {
      id: 'date',
      header:'Date',
    }),
    columnHelper.accessor(({attributes}) => attributes.heureD, {
      id: 'heureD',
      header:'De - À',
    }),
    columnHelper.display({
      id:"actions",
      header: 'Actions',
      cell: ({row, table}) => {
        return(
          <>
            <IconButton
             onClick={() => methods.reset({
              id: row.original.id,
              ...row.original.attributes
             })}
            >
              <EditTwoToneIcon style={{ color: EditColor }} />
            </IconButton>
            <IconButton onClick={() => table.options.meta.deleteApp(row.original.id)}>
              <DeleteTwoToneIcon color="error" />
            </IconButton>
          </>
        );
      },
    }),
  ],
  []
  );

  useEffect(() => {
    const loadData = async () => {
      const {data} = await axios.get('/appointments');
      setData(data.data);
      // console.log(data);
    };
    loadData();
  }, []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      addApp:async (appointment)=> {
        const {data} = await axios.post("/appointments", appointment);
        setData(prevState => [data.data, ...prevState])
      },
      updateApp:async ({id,...appointment})=> {
        const {data} = await axios.put(`/appointments/${id}`, appointment);
        setData(prevState =>
          prevState.map( (item) => (item.id == id ? data.data : item))
        );
      },
      deleteApp:async (appId) => {
        await axios.delete(`/appointments/${appId}`);
        setData((prevState)=>prevState.filter(item => item.id != appId))
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
                    <Sidebar table={table} />
                </Grid>
                <Grid item md={9}>
                  <Home table={table} />
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
