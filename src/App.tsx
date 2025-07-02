// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OnceOffPage from "./pages/OnceOffPage";
import ChorePage from "./pages/ChorePage";
import HabitPage from "./pages/HabitPage";
import StudyPage from "./pages/StudyPage";
import SubjectDetailPage from "./pages/SubjectDetailPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/once-off" element={<OnceOffPage />} />
        <Route path="/chore" element={<ChorePage/>}/>
        <Route path="/habit" element={<HabitPage/>}/>
        <Route path="/study" element={<StudyPage/>}/>
        <Route path="/study/:subjectId" element={<SubjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

