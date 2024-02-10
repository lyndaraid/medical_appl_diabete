import { Box, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import bg from '../assets/mybg.jpg';
import { flexRender } from '@tanstack/react-table';
import { useFormContext } from "react-hook-form";

const Home = ({ table }) => {
  const { reset } = useFormContext() ;
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffff',
        backgroundImage: table.getRowModel().rows.length == 0 ? `url('${bg}')` : null,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
      }}
    >
      {table.getRowModel().rows.length > 0 && <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} >
                    {headerGroup.headers.map(header => (
                        <TableCell align="center" key={header.id}>
                          {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableCell>
                    ))}
                  </TableRow>
                ))
              }
            </TableHead>
            <TableBody>
              {
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <TableCell align='center'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      }
    </Box>
  );
};

export default Home;
