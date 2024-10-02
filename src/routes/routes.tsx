import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../screens/login/login';
import Register from '../screens/register/register';
import { Home } from '../screens/home/home';
import { PrivateRoutes } from './index';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;