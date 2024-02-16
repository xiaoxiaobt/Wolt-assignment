import { CalculatorInput, Result, DeliveryFeeType } from "../types"

const constants = Object.fromEntries(Object.entries(process.env).map(([key, value]) => [key, parseFloat(value || '0')]))

const calculateDeliveryCost = ({ cart, distance, numberOfItems, rushHour }: CalculatorInput): Result => {
    /**
     * This function calculates the delivery cost based on the input parameters.
     * @param cart The total value of the items in the cart.
     * @param distance The distance of the delivery, in meters.
     * @param numberOfItems The number of items in the cart.
     * @param rushHour Whether the delivery is during rush hour.
     * @returns The delivery cost and the breakdown of the cost.
     * @throws Error if the input parameters are invalid.
     */
    if (cart < 0) {
        throw new Error('Total should be non-negative.')
    } else if (distance < 0) {
        throw new Error('Distance should be non-negative.')
    } else if (numberOfItems <= 0) {
        throw new Error('Number of items should be positive.')
    }

    if (cart >= constants.FREE_DELIVERY_THRESHOLD) {
        const result = {
            costType: "FreeDeliveryForLargeOrders" as DeliveryFeeType,
            deliveryCost: 0,
            smallOrderSurcharge: 0, distanceCharge: 0,
            distanceSurcharge: 0, numberOfItemsSurcharge: 0, bulkItemSurcharge: 0,
            rushHourSurcharge: 0, capPriceDeduction: 0
        }
        return result
    }

    const result = {
        costType: "StandardDelivery" as DeliveryFeeType,
        deliveryCost: 0,
        smallOrderSurcharge: 0, distanceCharge: constants.DISTANCE_BASE_COST,
        distanceSurcharge: 0, 
        numberOfItemsSurcharge: 0, bulkItemSurcharge: 0,
        rushHourSurcharge: 0, capPriceDeduction: 0
    }
    result.smallOrderSurcharge = Math.max(constants.SMALL_ORDER_SURCHARGE - cart, 0)
    result.distanceSurcharge = constants.DISTANCE_SURCHARGE_UNIT_COST * Math.ceil(Math.max(distance - constants.DISTANCE_BASE_DISTANCE, 0) / constants.DISTANCE_SURCHARGE_DISTANCE)
    result.numberOfItemsSurcharge = constants.ITEM_SURCHARGE_UNIT_COST * Math.max(numberOfItems - constants.ITEM_SURCHARGE_BASE_ITEMS, 0)
    result.bulkItemSurcharge =  numberOfItems > constants.ITEM_SURCHARGE_BULK_ITEMS ? constants.ITEM_SURCHARGE_BULK_COST : 0
    const deliveryCostBeforeRushHour = result.smallOrderSurcharge + result.distanceCharge + result.distanceSurcharge + result.numberOfItemsSurcharge + result.bulkItemSurcharge
    result.rushHourSurcharge = rushHour ? deliveryCostBeforeRushHour * constants.RUSH_HOUR_MULTIPLIER : 0
    result.capPriceDeduction = Math.min(constants.CAP_PRICE - deliveryCostBeforeRushHour - result.rushHourSurcharge, 0)
    if (result.capPriceDeduction > 0) {
        throw new Error("Cap price deduction should be non-positive.")
    }
    result.deliveryCost = deliveryCostBeforeRushHour + result.rushHourSurcharge + result.capPriceDeduction
    return result
}

export default calculateDeliveryCost