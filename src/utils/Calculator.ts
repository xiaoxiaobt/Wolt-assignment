import { CalculatorInput, Result, DeliveryFeeType } from "../types";


// Define the function calculateDeliveryCost
// It takes an object with the following properties:
// cart: number - the total cost of the items in the cart
// distance: number - the distance in meters from the store to the delivery address
// numberOfItems: number - the number of items in the cart
// rushHour: boolean - whether the delivery is during rush hour

// It returns an object with the following properties:
// costType: DeliveryFeeType - the type of delivery fee
// deliveryCost: number - the total cost of the delivery
// smallOrderSurcharge: number - the surcharge for small orders
// distanceCharge: number - the base cost for distance
// distanceSurcharge: number - the surcharge for distance
// numberOfItemsSurcharge: number - the surcharge for the number of items
// rushHourSurcharge: number - the surcharge for rush hour
// capPriceDeduction: number - the cap price deduction

const calculateDeliveryCost = ({ cart, distance, numberOfItems, rushHour }: CalculatorInput): Result => {
    if (cart < 0) {
        throw new Error('Total should be non-negative.');
    } else if (distance < 0) {
        throw new Error('Distance should be non-negative.');
    } else if (numberOfItems <= 0) {
        throw new Error('Number of items should be positive.');
    }
    const FREE_DELIVERY_THRESHOLD = 200;
    const SMALL_ORDER_SURCHARGE = 10;
    const DISTANCE_BASE_DISTANCE = 1000;
    const DISTANCE_BASE_COST = 2;
    const DISTANCE_SURCHARGE_DISTANCE = 500;
    const DISTANCE_SURCHARGE_UNIT_COST = 1;
    const ITEM_SURCHARGE_BASE_ITEMS = 4;
    const ITEM_SURCHARGE_UNIT_COST = 0.5;
    const ITEM_SURCHARGE_BULK_ITEMS = 12;
    const ITEM_SURCHARGE_BULK_COST = 1.2;
    const RUSH_HOUR_MULTIPLIER = 0.2;
    const CAP_PRICE = 15;

    if (cart >= FREE_DELIVERY_THRESHOLD) {
        const result = {
            costType: "FreeDeliveryForLargeOrders" as DeliveryFeeType,
            deliveryCost: 0,
            smallOrderSurcharge: 0, distanceCharge: 0,
            distanceSurcharge: 0, numberOfItemsSurcharge: 0,
            rushHourSurcharge: 0, capPriceDeduction: 0
        };
        return result;
    }

    const result = {
        costType: "StandardDelivery" as DeliveryFeeType,
        deliveryCost: 0,
        smallOrderSurcharge: 0, distanceCharge: DISTANCE_BASE_COST,
        distanceSurcharge: 0, numberOfItemsSurcharge: 0,
        rushHourSurcharge: 0, capPriceDeduction: 0
    };
    result.smallOrderSurcharge = Math.max(SMALL_ORDER_SURCHARGE - cart, 0);
    result.distanceSurcharge = DISTANCE_SURCHARGE_UNIT_COST * Math.ceil(Math.max(distance - DISTANCE_BASE_DISTANCE, 0) / DISTANCE_SURCHARGE_DISTANCE);
    result.numberOfItemsSurcharge = ITEM_SURCHARGE_UNIT_COST * Math.max(numberOfItems - ITEM_SURCHARGE_BASE_ITEMS, 0) + (numberOfItems > ITEM_SURCHARGE_BULK_ITEMS ? ITEM_SURCHARGE_BULK_COST : 0);
    const deliveryCostBeforeRushHour = result.smallOrderSurcharge + result.distanceCharge + result.distanceSurcharge + result.numberOfItemsSurcharge;
    result.rushHourSurcharge = rushHour ? deliveryCostBeforeRushHour * RUSH_HOUR_MULTIPLIER : 0;
    result.capPriceDeduction = Math.min(CAP_PRICE - deliveryCostBeforeRushHour - result.rushHourSurcharge, 0);
    if (result.capPriceDeduction > 0) {
        throw new Error("Cap price deduction should be non-positive.");
    }
    result.deliveryCost = deliveryCostBeforeRushHour + result.rushHourSurcharge + result.capPriceDeduction;
    return result;
}

export default calculateDeliveryCost;