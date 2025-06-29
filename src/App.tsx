// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* future routes: once-off, study, habit, chore */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
