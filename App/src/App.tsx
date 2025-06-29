import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import SharedBrain from "./pages/SharedBrain";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/share/:id' element={<SharedBrain />} />
        <Route path="*" element={<Signin />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
