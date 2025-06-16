// src/App.tsx
import { AppRoutes } from "./router";
import Navbar from "./components/navbar/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
