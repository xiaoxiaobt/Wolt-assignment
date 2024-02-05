import { FloatField, IntegerField, DatePickerField } from "./Formfield"
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";
import * as Yup from "yup";
import * as dayjs from 'dayjs'
import calculateDeliveryCost from "../../utils/Calculator";
import { EmptyResult, Result } from "../../types";

const validationSchema = Yup.object({
    cartValue: Yup.string()
        .required("Required")
        .matches(/^[0-9]+([.,][0-9]{0,2})?$/, 'Must be a valid float')
        .test('is-non-negative', 'Must be a non-negative float', (value) => {
            return parseFloat(value.replace(",", ".")) >= 0;
        }),
    deliveryDistance: Yup.string()
        .required("Required")
        .matches(/^\d+$/, 'Must be a valid integer')
        .test('is-non-negative', 'Must be a non-negative integer', (value) => {
            return parseInt(value) >= 0;
        }),
    numberOfItems: Yup.string()
        .required("Required")
        .matches(/^\d+$/, 'Must be a valid integer')
        .test('is-larger-than-zero', 'Must be larger than 0', (value) => {
            return parseInt(value) > 0;
        }),
    time: Yup.date()
        .required("Required")
});


// const initialValues = {
//     costType: null ,
//     deliveryCost: 0,
//     smallOrderSurcharge: 0, distanceCharge: DISTANCE_BASE_COST,
//     distanceSurcharge: 0, numberOfItemsSurcharge: 0,
//     rushHourSurcharge: 0, capPriceDeduction: 0
// };}

interface CalculationFormProps {
    setCalculationResult: (result: Result | EmptyResult) => void;
}


const CalculationForm = ({setCalculationResult}: CalculationFormProps) => {


    const formik = useFormik({
        initialValues: {
            cartValue: '',
            deliveryDistance: '',
            numberOfItems: '',
            time: dayjs(),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.cartValue = values.cartValue.replace(",", ".");
            const calculatorInput = {
                cart: parseFloat(values.cartValue),
                distance: parseInt(values.deliveryDistance),
                numberOfItems: parseInt(values.numberOfItems),
                rushHour: values.time.hour() >= 15 && values.time.hour() <= 19 && values.time.day() == 5,
            };
            const costs = calculateDeliveryCost(calculatorInput);
            setCalculationResult(costs);
            // alert(JSON.stringify(costs, null, 2));
        }
    });
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
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Calculate
                    </Button>
                </Grid>
            </form>
        </div>
    );

};

export default CalculationForm;