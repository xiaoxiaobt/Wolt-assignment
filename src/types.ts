export type DeliveryFeeType = "FreeDeliveryForLargeOrders" | "StandardDelivery";

export interface Result {
    costType: DeliveryFeeType
    deliveryCost: number
    smallOrderSurcharge: number
    distanceCharge: number
    distanceSurcharge: number
    numberOfItemsSurcharge: number
    rushHourSurcharge: number
    capPriceDeduction: number
}

export interface CalculatorInput {
    cart: number
    distance: number
    numberOfItems: number
    rushHour: boolean
}

export interface EmptyResult { }