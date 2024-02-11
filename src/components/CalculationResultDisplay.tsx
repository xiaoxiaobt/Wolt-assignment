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
                The delivery cost is <strong><span data-test-id="fee" id="fee">{formatNumberToCurrency(calculationResult.deliveryCost, undefined, "", locale)}</span></strong>€
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
                            <TableHead sx={{ borderBottom: '2px solid' }}>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ fontWeight: "bold" }} align="left">Cost type</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="right">Cost</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {calculationResult.smallOrderSurcharge !== 0 &&
                                    <TableRow>
                                        <TableCell colSpan={2} >Small order surcharge cost</TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.smallOrderSurcharge, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                                <TableRow>
                                    <TableCell colSpan={2}>Distance cost</TableCell>
                                    <TableCell align="right">{formatNumberToCurrency(calculationResult.distanceCharge + calculationResult.distanceSurcharge, undefined, undefined, locale)}</TableCell>
                                </TableRow>
                                {calculationResult.numberOfItemsSurcharge !== 0 &&
                                    <TableRow>
                                        <TableCell colSpan={2} >Number of items cost</TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.numberOfItemsSurcharge, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }

                                {calculationResult.bulkItemSurcharge !== 0 &&
                                    <TableRow>
                                        <TableCell colSpan={2} >Bulk item surcharge</TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.bulkItemSurcharge, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                                <TableRow sx={{ borderBottom: '2px solid' }} />
                                {calculationResult.rushHourSurcharge !== 0 &&
                                    <TableRow>
                                        <TableCell />
                                        <TableCell align="left">Rush hour surcharge <span style={{ fontSize: 'smaller', color: '#525252' }}>×1.2</span></TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.rushHourSurcharge, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                                {calculationResult.capPriceDeduction !== 0 &&
                                    <TableRow>
                                        <TableCell />
                                        <TableCell align="left">Cap price deduction</TableCell>
                                        <TableCell align="right">{formatNumberToCurrency(calculationResult.capPriceDeduction, undefined, undefined, locale)}</TableCell>
                                    </TableRow>
                                }
                                <TableRow sx={{ borderTop: '3px solid', borderBottom: '3px solid' }}>
                                    <TableCell />
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Total</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{formatNumberToCurrency(calculationResult.deliveryCost, undefined, undefined, locale)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
        </div>
    )
}

export default CalculationResultDisplay