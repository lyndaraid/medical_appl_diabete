import diabete from '../assets/diabetes-animate.svg';
import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Home = (props) => {
  return (
    <>
      <Stack alignItems="center">
        <img src={diabete} height="500px" alt="Diabet image" />
        {/* <a href="">
          Transport illustrations by Storyset
        </a> */}
        <Button component={Link} to="students" variant="contained" size="large">
         Aller à la Lists des patients 
        </Button>
      </Stack>
    </>
  );
};

export default Home;
