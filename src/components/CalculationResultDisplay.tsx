import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Result } from "../types"
import { formatNumberToCurrency } from "../utils/helper"

interface CalculationResultDisplayProps {
    calculationResult: Result | undefined;
    locale: string;
}

const CalculationResultDisplay = ({ calculationResult, locale }: CalculationResultDisplayProps) => {
    /**
     * CalculationResultDisplay is a component that displays the delivery fee calculation result.
     * 
     * If delivery cost is 0, a message is displayed to congratulate the user for earning free delivery.
     * Otherwise, the delivery cost and the cost breakdown are displayed.
     * 
     * @param calculationResult - The delivery fee, including the cost breakdown
     * @param locale - The locale, used to format the numbers similar to the user's input
     */
    if (!calculationResult) return <></>

    return (
        <div>
            <h2 id="results">Calculation Result</h2>
            <p>
                The delivery cost is <span data-test-id="fee" id="fee">{formatNumberToCurrency(calculationResult.deliveryCost, undefined, "", locale)}</span>€
            </p>
            {calculationResult.costType === "FreeDeliveryForLargeOrders" &&
                <p>
                    Congratulations! You have earned free delivery for large orders. 🎉🎉
                </p>
            }
            {calculationResult.costType === "StandardDelivery" &&
                <>
                    <h3>Cost breakdown</h3>
                    <TableContainer>
                        <Table
                            sx={{ verticalAlign: 'top', color: 'white' }}
                            aria-label="spanning table"
                        >
                            <TableHead>
                                <TableRow style={{ color: 'white' }}>
                                    <TableCell align="left">Cost type</TableCell>
                                    <TableCell align="right">Cost</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {calculationResult.smallOrderSurcharge !== 0 &&
                                    <TableRow>
                                        <TableCell>Small order surcharge cost</TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.smallOrderSurcharge, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                                <TableRow>
                                    <TableCell>Distance cost</TableCell>
                                    <TableCell align="right">{formatNumberToCurrency(calculationResult.distanceCharge + calculationResult.distanceSurcharge, undefined, undefined, locale)}</TableCell>
                                </TableRow>
                                {calculationResult.numberOfItemsSurcharge !== 0 &&
                                    <TableRow>
                                        <TableCell>
                                            Number of items cost
                                        </TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.numberOfItemsSurcharge, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                                {calculationResult.bulkItemSurcharge !== 0 &&
                                    <TableRow>
                                        <TableCell>Bulk item surcharge</TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.bulkItemSurcharge, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                                {calculationResult.rushHourSurcharge !== 0 &&
                                    <TableRow>
                                        <TableCell>Rush hour surcharge</TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.rushHourSurcharge, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                                {calculationResult.capPriceDeduction !== 0 &&
                                    <TableRow>
                                        <TableCell>Cap price deduction</TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.capPriceDeduction, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
        </div>
    )
}

export default CalculationResultDisplay