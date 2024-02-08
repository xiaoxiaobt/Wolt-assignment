import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CalculationForm from "./components/CalculationForm";
import { Result } from './types';
import CalculationResultDisplay from './components/CalculationResultDisplay';
import { getClientLocale } from './utils/helper';

function App() {
  const [calculationResult, setCalculationResult] = useState<Result|undefined>();
  const [locale, setLocale] = useState<string>(getClientLocale());

  return (
    <>
      <h1>Wolt Delivery Fee Calculator</h1>
      <CalculationForm setCalculationResult={setCalculationResult} setLocale={setLocale} />
      <CalculationResultDisplay calculationResult={calculationResult} locale={locale}/>
    </>
  )
}

export default App
