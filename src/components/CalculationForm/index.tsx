import { FloatField, IntegerField, DatePickerField } from "./Formfield"
import { useFormik } from "formik"
import { Button, Grid } from "@mui/material"
import * as Yup from "yup"
import dayjs from 'dayjs'
import calculateDeliveryCost from "../../utils/calculator"
import { Result } from "../../types"

const validationSchema = Yup.object({
    cartValue: Yup.string()
        .required("Required")
        .matches(/^[0-9]+([.,][0-9]{0,2})?$/, 'Must be a valid float')
        .test('is-non-negative', 'Must be a non-negative float', (value) => {
            return parseFloat(value.replace(",", ".")) >= 0
        }),
    deliveryDistance: Yup.string()
        .required("Required")
        .matches(/^\d+$/, 'Must be a valid integer')
        .test('is-non-negative', 'Must be a non-negative integer', (value) => {
            return parseInt(value) >= 0
        }),
    numberOfItems: Yup.string()
        .required("Required")
        .matches(/^\d+$/, 'Must be a valid integer')
        .test('is-larger-than-zero', 'Must be larger than 0', (value) => {
            return parseInt(value) > 0
        }),
    time: Yup.date()
        .required("Required")
})

interface CalculationFormProps {
    setCalculationResult: (result: Result | undefined) => void
    setLocale: (locale: string) => void
}

const CalculationForm = ({ setCalculationResult, setLocale }: CalculationFormProps) => {
    /**
     * CalculationForm is a component that creates a form for the user to input the cart 
     * value, delivery distance, number of items, and time.
     * 
     * Two buttons are provided: "Clear" and "Calculate". If the form is invalid, the
     * "Calculate" button is disabled.
     * 
     * @param setCalculationResult - A function to set the calculation result
     * @param setLocale - A function to set the locale based on user input
     */
    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            cartValue: '',
            deliveryDistance: '',
            numberOfItems: '',
            time: dayjs(),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.cartValue.includes(",")) setLocale("fi-FI")
            values.cartValue = values.cartValue.replace(",", ".")
            const calculatorInput = {
                cart: parseFloat(values.cartValue),
                distance: parseInt(values.deliveryDistance),
                numberOfItems: parseInt(values.numberOfItems),
                rushHour: values.time.hour() >= 15 && values.time.hour() <= 19 && values.time.day() === 5,
            }
            const costs = calculateDeliveryCost(calculatorInput)
            setCalculationResult(costs)
            // Pause for a moment to let the DOM update
            setTimeout(() => {
                document.getElementById("results")?.scrollIntoView({
                    behavior: 'smooth'
                })
            }, 100)
        }
    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FloatField
                    label="Cart Value"
                    min={0}
                    dataTestID="cartValue"
                    endAdornment="€"
                    value={formik.values.cartValue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cartValue && Boolean(formik.errors.cartValue)}
                    helperText={formik.touched.cartValue && formik.errors.cartValue}
                />
                <IntegerField
                    label="Delivery Distance"
                    min={0}
                    dataTestID="deliveryDistance"
                    endAdornment="m"
                    value={formik.values.deliveryDistance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.deliveryDistance && Boolean(formik.errors.deliveryDistance)}
                    helperText={formik.touched.deliveryDistance && formik.errors.deliveryDistance}
                />
                <IntegerField
                    label="Number of items"
                    min={1}
                    dataTestID="numberOfItems"
                    value={formik.values.numberOfItems}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.numberOfItems && Boolean(formik.errors.numberOfItems)}
                    helperText={formik.touched.numberOfItems && formik.errors.numberOfItems}
                />
                <DatePickerField
                    label="Date and Time"
                    dataTestID="time"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.time && Boolean(formik.errors.time)}
                    setFieldValue={formik.setFieldValue}
                />
                <Grid item>
                    <Button
                        color="info"
                        onClick={(e) => { formik.handleReset(e); formik.setFieldValue('time', dayjs()); setCalculationResult(undefined) }}
                        sx={{ margin: "1em", outline: "1px solid white", color: "white" }}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!formik.isValid}
                        sx={{ margin: "1em" }}
                    >
                        Calculate
                    </Button>
                </Grid>
            </form>
        </div>
    )

}

export default CalculationForm