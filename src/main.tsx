import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';

// The React Router future flag is set in `index.html` before modules load.
// We both set the global `__REACT_ROUTER__` early and also pass the
// `future` option to `createBrowserRouter` / `RouterProvider` below. This
// is deliberate and defensive: setting the global flag helps code that may
// evaluate during module initialization, while passing `future` to the
// router render-time ensures React Router sees an explicit opt-in and
// avoids the v7 deprecation warning even if earlier imports occurred.
// Dynamically import react-router-dom after setting the global flag so the
// runtime picks it up and suppresses the v7 startTransition warning.
// Dynamically load react-router-dom and App after setting the global flag
// to ensure the router picks up the future flag before it initializes.
(async () => {
  // Log presence of the global future flag before importing router
  try {
    // eslint-disable-next-line no-console
    console.log('[main] pre-import __REACT_ROUTER__ =', (window as any).__REACT_ROUTER__);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('[main] pre-import __REACT_ROUTER__ (access error)', e);
  }

  const mods = await Promise.all([
    import('react-router-dom'),
    import('./App.tsx'),
    import('./components/Login'),
    import('./components/Dashboard'),
    import('./components/CastList'),
    import('./components/Logout'),
    import('./components/Auth'),
  ]);

  // Log again after the dynamic import so we can compare timing
  try {
    // eslint-disable-next-line no-console
    console.log('[main] post-import __REACT_ROUTER__ =', (window as any).__REACT_ROUTER__);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('[main] post-import __REACT_ROUTER__ (access error)', e);
  }

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
