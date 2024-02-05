import { EmptyResult, Result } from "../types"

interface CalculationResultDisplayProps {
    calculationResult: Result | EmptyResult;
}

const CalculationResultDisplay = ({ calculationResult }: CalculationResultDisplayProps) => {
    if (Object.keys(calculationResult).length === 0) return <></>

    return (
        <div>
            <h2>Calculation Result</h2>
            <p>
                The delivery cost is {(calculationResult as Result).deliveryCost}€
            </p>
            <pre>
                {JSON.stringify(calculationResult, null, 2)}
            </pre>
        </div>
    )
}

export default CalculationResultDisplay