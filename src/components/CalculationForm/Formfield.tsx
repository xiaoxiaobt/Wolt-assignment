import {
  TextField as TextFieldMUI,
} from "@mui/material";
import * as dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface NumberProps {
  value: string;
  label: string;
  min: number;
  dataTestID: string;
  endAdornment?: string;
}

interface TimeProps {
  value: dayjs.Dayjs;
  label: string;
  dataTestID: string;
}

interface FormikProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  error: boolean | undefined;
  helperText?: string | false | undefined;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface NumberFormikProps extends NumberProps, FormikProps { }
interface TimeFormikProps extends TimeProps, FormikProps { }

export const IntegerField = ({ label, min, dataTestID, endAdornment, value, onChange, onBlur, error, helperText }: NumberFormikProps) => {

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
            helperText: helperText
          }
        }}
      />
    </LocalizationProvider>

  );
};