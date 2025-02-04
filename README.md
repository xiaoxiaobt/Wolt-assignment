# Wolt Assignment

## URL

The project is accessible at <https://wolt-assignment.taige.wang/>.

## Description

This is a simple web application that calculates the delivery fee for a given order. The rules are the following:

* If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.
* A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
  * Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
  * Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
  * Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
* If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€
  * Example 1: If the number of items is 4, no extra surcharge
  * Example 2: If the number of items is 5, 50 cents surcharge is added
  * Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
  * Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
  * Example 5: If the number of items is 14, 6,20€ surcharge is added ((10 * 50 cents) + 1,20€)
* The delivery fee can __never__ be more than 15€, including possible surcharges.
* The delivery is free (0€) when the cart value is equal or more than 200€.
* During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€). Considering timezone, for simplicity, __use UTC as a timezone in backend solutions__ (so Friday rush is 3 - 7 PM UTC). __In frontend solutions, use the timezone of the browser__ (so Friday rush is 3 - 7 PM in the timezone of the browser).

## Requirements

* Node.js 18 LTS
  * `npm`

## Setup

To install the project, run the following commands:

```bash
npm i
```

Run the project with:

```bash
npm start
```

The project is also accessible at <https://wolt-assignment.taige.wang/>.

## Accessibility, development, and design choices

The following design choices were made to ensure the best possible user experience and accessability:

* Color contrast and color-blindness friendly colors
* Keyboard navigation
* Responsive design
* Passed Lighthouse audit
* Straight-forward user interface
* Consistent and clear error messages
* Locale support (English and Finnish)
  * When user inputs a number with a comma as the decimal separator, the input accepts it and displays results with the same format
* Input mode support (numerical keyboard for number fields on mobile devices)
* Unit tests
* End-to-end tests
* Flexible and maintainable codebase (values not hard-coded, comments, etc.)

And some features that were not implemented:

* Loading-state animations (as the page is very lightweight and loads quickly)
* Animations
