import {
  TextField as TextFieldMUI,
} from "@mui/material";
import * as dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MyActionBar from "./ActionBar";


interface NumberProps {
  /** NumberProps contains props used in number-textfield */
  value: string;
  label: string;
  min: number;
  dataTestID: string;
  endAdornment?: string;
}

interface TimeProps {
  /** TimeProps contains props used in datetime-textfield */
  value: dayjs.Dayjs;
  label: string;
  dataTestID: string;
}

interface FormikProps {
  /** FormikProps contains props used in formik */
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  error: boolean | undefined;
  helperText?: string | false | undefined;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface NumberFormikProps extends NumberProps, FormikProps { }
interface TimeFormikProps extends TimeProps, FormikProps { }

export const IntegerField = ({ label, min, dataTestID, endAdornment, value, onChange, onBlur, error, helperText }: NumberFormikProps) => {
  /** 
   * IntegerField is a component that creates a textfield for integer input 
   */
  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        id={dataTestID}
        name={dataTestID}
        label={label}
        placeholder={String(min)}
        type="text"
        color={error ? "error" : "success"}
        value={value}
        InputProps={{
          inputProps: {
            "data-test-id": dataTestID
          },
          endAdornment: endAdornment
        }}
        error={error}
        helperText={helperText}
        required={true}
        onChange={(e) => { if (/^$|^\d+$/.test(e.target.value) && onChange) { onChange(e) } }}
        onBlur={onBlur}
      />
    </div>
  );
};


export const FloatField = ({ label, min, dataTestID, endAdornment, value, onChange, onBlur, error, helperText }: NumberFormikProps) => {
  /** 
   * FloatField is a component that creates a textfield for float input
   * It accepts either comma and dot as decimal separator 
   */
  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        id={dataTestID}
        name={dataTestID}
        label={label}
        placeholder={String(min)}
        type="text"
        color={error ? "error" : "success"}
        value={value}
        InputProps={{
          inputProps: {
            "data-test-id": dataTestID
          },
          endAdornment: endAdornment,
        }}
        required={true}
        onChange={(e) => { if (/^$|^([0-9]+([.,][0-9]{0,2})?)$/.test(e.target.value) && onChange) onChange(e) }}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
      />
    </div>
  );
};


export const DatePickerField = ({ label, value, dataTestID, setFieldValue, onBlur, error, helperText }: TimeFormikProps) => {
  /** 
   * DatePickerField is a component that creates a textfield for date input
   */
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        format="MM/DD/YYYY HH:mm"
        label={label}
        value={value}
        onChange={(t) => setFieldValue && setFieldValue('time', t)}
        ampm={false}
        slotProps={{
          textField: {
            fullWidth: true,
            required: true,
            id: dataTestID,
            name: dataTestID,
            inputProps: {
              "data-test-id": dataTestID
            },
            onBlur: onBlur,
            error: error,
            helperText: helperText,
          },
          openPickerButton: {
            id: "openPickerButton"  // Used for testing
          }
        }}
        slots={{
          actionBar: MyActionBar
        }}
      />
    </LocalizationProvider>

  );
};