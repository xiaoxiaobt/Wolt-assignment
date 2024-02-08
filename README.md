# Wolt Assignment

## Setup

To install the project, run the following commands:

```bash
npm i
```

Run the project with:

```bash
npm start
```

The project is also accessible at <https://wolt.web.taige.wang/>.

## Accessibility, development, and design choices

The following design choices were made to ensure the best possible user experience and accessability:

- Color contrast and color-blindness friendly colors
- Keyboard navigation
- Responsive design
- Passed Lighthouse audit
- Straight-forward user interface
- Consistent and clear error messages
- Locale support (English and Finnish)
  - When user inputs a number with a comma as the decimal separator, the input accepts it and displays results with the same format
- Unit tests
- End-to-end tests
- Flexible and maintainable codebase (values not hard-coded, comments, etc.)

And some features that were not implemented:

- Loading-state animations (as the page is very lightweight and loads quickly)
- Animations
- Dark mode
