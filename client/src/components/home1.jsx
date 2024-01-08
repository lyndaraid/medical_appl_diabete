import { Box,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
     } from '@mui/material'; 
    import Pharmacist from '../assets/Pharmacist.svg';
    import { flexRender} from '@tanstack/react-table';
    import { blue } from '@mui/material/colors';
    
    
    const Home = ({table}) => {
      
      return (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url('${Pharmacist}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
          }}
        >
           <Paper style={{ opacity: 0.9}}>
            <TableContainer>
              <Table>
                <TableHead>
    
                  {table.getHeaderGroups().map((headerGroup) =>(
                   <TableRow key={headerGroup.id}>
                    {
                      headerGroup.headers.map(header =>(
                      <TableCell  align="center" key={header.id}>
                        { header.isPlaceholder
                        ? null
    
                          :flexRender(
                            header.column.columnDef.header,
                            header.getContext())
                        }
                      </TableCell>
                      ))
                    }
                   </TableRow>
                  )
    
                  )}
                </TableHead>
                        < TableBody>
                 {table.getRowModel().rows.map((row) => (
    
                         <TableRow key ={row.id}>
                            {
                               row.getVisibleCells().map( (cell) => (
                                  <TableCell align="center" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell,
                                    cell.getContext())}
                                  </TableCell>
                                          ))
                             }
                         </TableRow>
                    
                    
                    ))
                 
                }
                 </TableBody>
                 
              
              </Table>
            </TableContainer>
    
          </Paper>
        </Box>
      );
    };
    
    export default Home;