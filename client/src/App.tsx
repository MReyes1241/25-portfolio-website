import { useLocation } from 'react-router-dom';
import { AppRoutes } from "./router";
import Navbar from "./components/navbar/Navbar.tsx";

function App() {
  const location = useLocation();

  const isTeachingPage = location.pathname.startsWith("/teaching");

  return (
    <>
      {!isTeachingPage && <Navbar />}
      <main className={isTeachingPage ? "" : "pt-[70px]"}>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;