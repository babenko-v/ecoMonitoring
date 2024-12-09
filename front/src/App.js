import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ObjectsList from './Pages/Objects/ObjectsList';
import CalculationsList from "./Pages/Calculations/CalculationsList";
import PollutionsList from "./Pages/Pollutions/PollutionsList";
import Navbar from "./Components/Nav/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/objects" element={<ObjectsList />} />
                <Route path="/calculations" element={<CalculationsList />} />
                <Route path="/pollutions" element={<PollutionsList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
