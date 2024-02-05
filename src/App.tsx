import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CalculationForm from "./components/CalculationForm";
import { EmptyResult, Result } from './types';
import CalculationResultDisplay from './components/CalculationResultDisplay';


function App() {
  const [calculationResult, setCalculationResult] = useState<Result|EmptyResult>({});
  
  return (
    <>
      <h1>Wolt Delivery Fee Calculator</h1>
      <CalculationForm setCalculationResult={setCalculationResult} />
      <CalculationResultDisplay calculationResult={calculationResult}/>
    </>
  )
}

export default App
