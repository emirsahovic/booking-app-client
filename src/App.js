import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/PublicRoute';

import { routesConfig } from './routes/routesConfig';

import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
    ]
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path={routesConfig.register.path} element={<AuthRoute />}>
            <Route path={routesConfig.register.path} element={routesConfig.register.element} />
          </Route>
          <Route path={routesConfig.login.path} element={<AuthRoute />}>
            <Route path={routesConfig.login.path} element={routesConfig.login.element} />
          </Route>
          <Route path={routesConfig.home.path} element={routesConfig.home.element} />
          <Route path={routesConfig.singleAcc.path} element={routesConfig.singleAcc.element} />
          <Route path={routesConfig.accommodations.path} element={routesConfig.accommodations.element} />
          <Route path={routesConfig.reservation.path} element={routesConfig.reservation.element} />
          <Route path={routesConfig.payment.path} element={routesConfig.payment.element} />
          <Route path={routesConfig.contact.path} element={routesConfig.contact.element} />
          <Route path={routesConfig.about.path} element={routesConfig.about.element} />
          <Route path={routesConfig.hotel.path} element={routesConfig.hotel.element} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
