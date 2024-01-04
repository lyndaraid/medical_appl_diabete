import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

import { flexRender } from '@tanstack/react-table';
import { useFormContext } from 'react-hook-form';
import bg from '../assets/money-income-animate (1).svg';
const Home = ({table}) => {
  const {reset} =useFormContext();
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        // backgroundImage: `url('${bg}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
      }}
       
    >
       
       <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        align="center"
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell align="center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    </Box>
  );
};

// export default Home;

// import {
//   Box,
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
  
// } from '@mui/material';
// import { useTable } from '@mui/material';


// import { flexRender } from '@tanstack/react-table';
// import bg from '../assets/money-income-animate (1).svg';

// const Home = (props) => {
//   const { table } = useMemo(() => useTable(props));

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         height: '100%',
//         backgroundImage: `url('${bg}')`,
//         backgroundRepeat: 'no-repeat',
//         backgroundPositionX: 'center',
//         backgroundPositionY: 'center',
//       }}
       
//     >
//       <Paper>
//         <TableContainer>
//           <Table>
//             <TableHead>
//             {table.getHeaderGroups().map((headerGroup) => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <TableCell>
//                         { flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//             </TableHead>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// };

export default Home;

