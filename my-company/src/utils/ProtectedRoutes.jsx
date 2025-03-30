import {Outlet, Navigate} from 'react-router-dom';

const ProtectedRoutes = () => {
    const user = null; //if the user is null or not true the page rander only home page in our case.
    return user ? <Outlet/> : <Navigate to="/" />;
}

export default ProtectedRoutes