import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ObjectsList from './Pages/Objects/ObjectsList';
import CalculationsList from "./Pages/Calculations/CalculationsList";
import PollutantsList from "./Pages/Pollutions/PollutantsList";
import Navbar from "./Components/UI/Nav/Navbar";
import Main from "./Pages/Main/Main";
import RadioactiveWasteList from "./Pages/RadioactiveWaste/RadioactiveWasteList";
import TemplateFactory from "bootstrap/js/src/util/template-factory";
import TemporaryPlaceList from "./Pages/TemporaryPlace/TemporaryPlaceList";
import RiskHealthList from "./Pages/RiskHealth/RiskHealthList";
import CompensationsList from "./Pages/Compensations/CompensationsList";
import Footer from "./Components/UI/Footer/Footer";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="root">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/objects" element={<ObjectsList />} />
                        <Route path="/calculations" element={<CalculationsList />} />
                        <Route path="/pollutants" element={<PollutantsList />} />
                        <Route path="/radioactive_waste" element={<RadioactiveWasteList />} />
                        <Route path="/temporary_place" element={<TemporaryPlaceList />} />
                        <Route path="/risk_health" element={<RiskHealthList />} />
                        <Route path="/compensation" element={<CompensationsList />} />
                    </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
