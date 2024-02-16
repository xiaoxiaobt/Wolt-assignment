import calculateDeliveryCost from './calculator'

describe('calculateDeliveryCost function', () => {
    test('free delivery', () => {
        expect(calculateDeliveryCost({ cart: 200, distance: 0, numberOfItems: 3, rushHour: false })).toStrictEqual({
            "bulkItemSurcharge": 0, "capPriceDeduction": 0, "costType": "FreeDeliveryForLargeOrders",
            "deliveryCost": 0, "distanceCharge": 0, "distanceSurcharge": 0, "numberOfItemsSurcharge": 0,
            "rushHourSurcharge": 0, "smallOrderSurcharge": 0
        })
    })

    test('standard delivery', () => {
        expect(calculateDeliveryCost({ cart: 20, distance: 2000, numberOfItems: 24, rushHour: true })).toStrictEqual({
            "bulkItemSurcharge": 1.2,
            "capPriceDeduction": -3.2399999999999993,
            "costType": "StandardDelivery",
            "deliveryCost": 15,
            "distanceCharge": 2,
            "distanceSurcharge": 2,
            "numberOfItemsSurcharge": 10,
            "rushHourSurcharge": 3.04,
            "smallOrderSurcharge": 0,
        })
    })

    test('negative cart value', () => {
        expect(() => calculateDeliveryCost({ cart: -20, distance: 2000, numberOfItems: 24, rushHour: true })).toThrow(
            'Total should be non-negative.'
        )
    })

})