// src/App.tsx
import { useLocation } from 'react-router-dom';
import { AppRoutes } from "./router";
import Navbar from "./components/navbar/Navbar.tsx";

function App() {
  const location = useLocation();
  
  // Define routes where navbar should be hidden
  const hideNavbarRoutes = [
    '/teaching',
    '/teaching/csci133/unit1',
    // Add more stuff here routes as needed
  ];
  
  const shouldHideNavbar = hideNavbarRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(route + '/')
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main className={shouldHideNavbar ? "" : "pt-20"}>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;