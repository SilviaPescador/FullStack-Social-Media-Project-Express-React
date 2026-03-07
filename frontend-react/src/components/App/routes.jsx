import { Outlet, Navigate } from 'react-router-dom';
import HomeLogin from '../../pages/Home/HomeLogin';
import Feed from '../../pages/Feed/Feed';
import Friends from '../../pages/Friends/Friends';
import Register from '../../pages/Register/Register';
import PublicFeed from '../../pages/PublicFeed/PublicFeed';
import Profile from '../../pages/Profile/Profile';
import Admin from '../../pages/Admin/Admin';
import AccountSettings from '../../pages/AccountSettings/AccountSettings';
import AdminQuerys from '../../pages/AdminQuerys/AdminQuerys';


const routes = (isLoggedIn, isAdmin) => [
      {
        path: '/',
        children: [
          { path: '/', element: <HomeLogin /> },
          { path: 'register', element: <Register /> },
          { path: 'public', element: <PublicFeed /> },
          {
            path: 'app',
            element: isLoggedIn ? <Outlet /> : <Navigate to="/" replace />,
            children: [
              { path: 'feed', element: isLoggedIn ? <Feed /> : <Navigate to="/" replace /> },
              { path: 'friends', element: isLoggedIn ? <Friends /> : <Navigate to="/" replace /> },
              { path: 'profile', element: isLoggedIn ? <Profile /> : <Navigate to="/" replace /> },
              { path: 'settings', element: isLoggedIn ? <AccountSettings /> : <Navigate to="/" replace /> },
              { path: 'admin-querys', element: isLoggedIn ? <AdminQuerys /> : <Navigate to="/" replace /> },
              { path: 'admin', element: isLoggedIn && isAdmin ? <Admin /> : <Navigate to="/" replace /> },
            ],
          },
        ],
      },
    ];

export default routes;