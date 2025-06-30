// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OnceOffPage from "./pages/OnceOffPage";
import ChorePage from "./pages/ChorePage";
import HabitPage from "./pages/HabitPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/once-off" element={<OnceOffPage />} />
        <Route path="/chore" element={<ChorePage/>}/>
        <Route path="/habit" element={<HabitPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

