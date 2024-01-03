// App.jsx
import React from 'react';
import { CssBaseline, Container, Paper, Box } from '@mui/material';
import LinearStepper from '../components/LinearStepper';

const AideDiagnostic = (props) => {
    return (
        <>
          <CssBaseline />
          <Container component={Box} p={4}>
            <Paper component={Box} p={3}>
              <LinearStepper />
            </Paper>
          </Container>
        </>
      );
  };
  
  export default AideDiagnostic;
 
