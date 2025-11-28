import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';

(async () => {
  const mods = await Promise.all([
    import('react-router-dom'),
    import('./App.tsx'),
    import('./components/Login'),
    import('./components/Dashboard'),
    import('./components/CastList'),
    import('./components/Logout'),
    import('./components/Auth'),
  ]);

  const { createBrowserRouter, RouterProvider } = mods[0] as any;
  const App = mods[1].default;
  const Login = mods[2].default;
  const Dashboard = mods[3].default;
  const CastList = mods[4].default;
  const Logout = mods[5].default;
  const Auth = mods[6].default;

  const router = createBrowserRouter([
    // Public/login routes render without the App layout (no Navbar)
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    // Protected routes render within the App layout which includes Navbar
    { path: '/dashboard', element: <App><Auth><Dashboard /></Auth></App> },
    { path: '/castList', element: <App><Auth><CastList /></Auth></App> },
    { path: '/logout', element: <App><Auth><Logout /></Auth></App> },
    // fallback -> redirect to login
    { path: '*', element: <Login /> }
  ], {
    // Keep the explicit future option as well (cast to any for TS compatibility)
    future: ({ v7_startTransition: true } as any)
  });

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </React.StrictMode>
  );
})();
