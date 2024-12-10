import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ObjectsList from './Pages/Objects/ObjectsList';
import CalculationsList from "./Pages/Calculations/CalculationsList";
import PollutantsList from "./Pages/Pollutions/PollutantsList";
import Navbar from "./Components/UI/Nav/Navbar";
import Main from "./Pages/Main/Main";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/objects" element={<ObjectsList />} />
                <Route path="/calculations" element={<CalculationsList />} />
                <Route path="/pollutants" element={<PollutantsList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
