import Button from "@mui/material/Button/Button"
import DialogActions from "@mui/material/DialogActions/DialogActions"
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar"

const MyActionBar = ({
    onAccept,
    onCancel,
    onSetToday,
    className
}: PickersActionBarProps) => {
/**
 * This component is a custom action bar for the date picker.
 * This allows "Now" to be selected, which is more intuitive than the default action "Today".
 */
    return (
        <div>
            <DialogActions style={{ display: 'block' }} className={className}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onAccept}>Accept</Button>
                <Button onClick={onSetToday}>Now</Button>
            </DialogActions >
        </div>
    )
}

export default MyActionBar