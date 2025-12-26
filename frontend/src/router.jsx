import { createBrowserRouter } from 'react-router-dom';
import Signup from './componets/pages/Signup.jsx';
import Login from './componets/pages/Login.jsx';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Signup />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

export default router;
