import {
    FormControl,
    TextField,
    InputLabel,
    InputAdornment,
    OutlinedInput,
} from '@mui/material';

const renderTextField = ({
    value,
    label,
    id,
    onChange,
}: {
    value: string;
    label: string;
    onChange: (value: string) => void;
    id: string;
}) => (
    <FormControl key={id} fullWidth sx={{ mb: 2 }}>
        <TextField
            label={label}
            variant="outlined"
            value={value || ''}
            onChange={(e) => {
                onChange(e.target.value);
            }}
        />
    </FormControl>
);

const renderInputField = ({
    value,
    onChange,
    label,
    id,
    isCurrency,
    currencySymbol,
}: {
    value: number | undefined;
    onChange: (value: string) => void;
    label: string;
    id: string;
    isCurrency: boolean;
    currencySymbol: string;
}) => (
    <FormControl key={id} fullWidth sx={{ mb: 2 }}>
        <InputLabel htmlFor={id}>{label}</InputLabel>

        <OutlinedInput
            id={id}
            startAdornment={
                isCurrency ? (
                    <InputAdornment position="start">
                        {currencySymbol}
                    </InputAdornment>
                ) : null
            }
            label={label}
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
        />
    </FormControl>
);

export { renderTextField, renderInputField };
