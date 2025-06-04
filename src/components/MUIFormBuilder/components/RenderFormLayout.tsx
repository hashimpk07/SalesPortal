import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from '@mui/material';
import { MobileDatePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { chooseAttachment } from '@mallcomm/mallcomm-js-utils';
import type { TFunction } from 'i18next';
import { useState } from 'react';
import FormInputProp from '../FormInputProp.ts';
import FileInputDisplay from './FileInputDisplay.tsx';
import { isInputInvalid, showField } from '../validation.ts';
import { getSumField, getTaxFieldValue } from '../extraFieldsMaths.tsx';

const RenderFormLayout = ({
    form,
    data,
    handleUpdateValue,
    centreConfig,
    translations,
    formDirty,
}: {
    form: FormInputProp[];
    data: any;
    centreConfig: any;
    handleUpdateValue: (value: any, key: any) => void;
    translations: TFunction;
    formDirty: boolean;
}) => {
    const [isDirty, setIsDirty] = useState<string[]>([]);

    const shouldShow = (input: FormInputProp) => showField(input, form, data);

    const handleAttachment = (
        input: FormInputProp,
        amountCurrentlyStored = 0
    ) => {
        setIsDirty([...isDirty, input?.name || '']);
        const chooseAttachmentParams = {
            mimeTypes:
                input?.acceptedMimeTypes === 'custom'
                    ? input?.acceptedMimeTypesCustom
                    : input?.acceptedMimeTypes,
            image: input?.image,
            maxFileSize: input?.max_file_size || 5,
            multiple: input?.max_attachments || 1,
            pluginAttributes: {
                inputName: input.name,
                inputType: input.type,
                multipleCurrentlyStored: amountCurrentlyStored,
            },
            callbackFunctionName: 'fileUploadToThread',
        };

        chooseAttachment(JSON.stringify(chooseAttachmentParams));
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.fileUploadToThread = (file: any) => {
        if (file?.pluginAttributes?.pluginAttributes?.inputName) {
            if (
                file?.pluginAttributes?.pluginAttributes?.inputType ===
                'attachment'
            ) {
                handleUpdateValue(
                    file,
                    file?.pluginAttributes?.pluginAttributes?.inputName
                );
            } else if (
                file?.pluginAttributes?.pluginAttributes?.inputType ===
                'multi-attachment'
            ) {
                const newData =
                    data[file?.pluginAttributes?.pluginAttributes?.inputName] ||
                    [];
                handleUpdateValue(
                    [...newData, file],
                    file?.pluginAttributes?.pluginAttributes?.inputName
                );
            }
        }
    };

    const getFormLabel = (input: FormInputProp) =>
        input?.label +
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        (input?.required && input?.required !== 'false' ? '*' : '');

    const isInvalid = (input: FormInputProp) => {
        if (input.name && !formDirty && !isDirty.includes(input.name)) {
            return false;
        }

        return isInputInvalid(input, form, data);
    };

    const component = (input: FormInputProp) => {
        if (!shouldShow(input)) return null;
        switch (input.type) {
            case 'hidden-input': // @TODO CHECK IF THE HIDDEN INPUT ACTUALLY NEEDS TO BE THERE
                return <></>;
            case 'header':
                return <Typography variant="h6">{input?.header}</Typography>;
            case 'subheader':
                return (
                    <Typography variant="subtitle1">
                        {input?.subheader}
                    </Typography>
                );
            case 'itext':
                return (
                    <Box>
                        <Typography variant="subtitle2">
                            {input?.itext}
                        </Typography>
                    </Box>
                );
            case 'currency':
                return (
                    <FormControl error={isInvalid(input)} fullWidth>
                        <InputLabel htmlFor={input?.name}>
                            {getFormLabel(input)}
                        </InputLabel>
                        <OutlinedInput
                            onBlur={() =>
                                setIsDirty([...isDirty, input?.name || ''])
                            }
                            id={input?.name}
                            label={getFormLabel(input)}
                            type="number"
                            inputProps={{ step: 0.01 }}
                            startAdornment={
                                <InputAdornment position="start">
                                    {centreConfig?.default_currency_symbol ||
                                        '$'}
                                </InputAdornment>
                            }
                            value={data[input?.name ?? ''] || ''}
                            onChange={(e) =>
                                handleUpdateValue(e.target.value, input?.name)
                            }
                        />
                    </FormControl>
                );
            case 'number':
                return (
                    <FormControl error={isInvalid(input)} fullWidth>
                        <InputLabel htmlFor={input?.name}>
                            {getFormLabel(input)}
                        </InputLabel>
                        <OutlinedInput
                            onBlur={() =>
                                setIsDirty([...isDirty, input?.name || ''])
                            }
                            id={input?.name}
                            label={getFormLabel(input)}
                            type="number"
                            value={data[input?.name ?? ''] || ''}
                            onChange={(e) =>
                                handleUpdateValue(e.target.value, input?.name)
                            }
                        />
                    </FormControl>
                );
            case 'text':
                return (
                    <FormControl error={isInvalid(input)} fullWidth>
                        <InputLabel htmlFor={input?.name}>
                            {getFormLabel(input)}
                        </InputLabel>
                        <OutlinedInput
                            onBlur={() =>
                                setIsDirty([...isDirty, input?.name || ''])
                            }
                            id={input?.name}
                            label={getFormLabel(input)}
                            type="text"
                            value={data[input?.name ?? ''] || ''}
                            onChange={(e) =>
                                handleUpdateValue(e.target.value, input?.name)
                            }
                        />
                    </FormControl>
                );
            case 'textarea':
                return (
                    <FormControl error={isInvalid(input)} fullWidth>
                        <InputLabel htmlFor={input?.name}>
                            {getFormLabel(input)}
                        </InputLabel>
                        <OutlinedInput
                            onBlur={() =>
                                setIsDirty([...isDirty, input?.name || ''])
                            }
                            id={input?.name}
                            label={getFormLabel(input)}
                            value={data[input?.name ?? ''] || ''}
                            type="text"
                            multiline
                            minRows={2}
                            onChange={(e) =>
                                handleUpdateValue(e.target.value, input?.name)
                            }
                        />
                    </FormControl>
                );
            case 'checkbox-dynamic-fields':
                return (
                    <FormGroup>
                        <InputLabel
                            sx={{ whiteSpace: 'pre-wrap' }}
                            htmlFor={input?.name}
                        >
                            {getFormLabel(input)}
                        </InputLabel>
                        <FormControlLabel
                            color={isInvalid(input) ? 'error' : 'primary'}
                            onBlur={() =>
                                setIsDirty([...isDirty, input?.name || ''])
                            }
                            control={<Checkbox />}
                            label={input?.label_checkbox}
                            value={input?.name}
                            checked={data[input?.name ?? ''].length > 0}
                            onChange={(e) => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                if (e.target?.checked) {
                                    handleUpdateValue(
                                        [input?.name],
                                        input?.name
                                    );
                                } else {
                                    handleUpdateValue([], input?.name);
                                }
                            }}
                        />
                    </FormGroup>
                );
            case 'radio-group-dynamic-fields':
                return (
                    <FormGroup>
                        <InputLabel
                            sx={{ whiteSpace: 'pre-wrap' }}
                            color={isInvalid(input) ? 'error' : 'primary'}
                            id={'label' + input?.name}
                        >
                            {getFormLabel(input)}
                        </InputLabel>
                        <RadioGroup
                            onBlur={() =>
                                setIsDirty([...isDirty, input?.name || ''])
                            }
                            value={data[input?.name ?? ''] || ''}
                            onChange={(e) =>
                                handleUpdateValue(e.target.value, input?.name)
                            }
                        >
                            {input?.options?.map((option, index) => (
                                <FormControlLabel
                                    key={`form-radio-group-dynamic-fields-${input?.name}-${index}`}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    value={option?.label}
                                    control={<Radio />}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    label={option?.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormGroup>
                );
            case 'datepicker':
                return (
                    <FormControl
                        onBlur={() =>
                            setIsDirty([...isDirty, input?.name || ''])
                        }
                        error={isInvalid(input)}
                        fullWidth
                    >
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <MobileDatePicker
                                label={getFormLabel(input)}
                                value={
                                    data[input?.name ?? '']
                                        ? DateTime.fromSQL(
                                            data[input?.name ?? '']
                                        )
                                        : undefined
                                }
                                onChange={(e) => {
                                    handleUpdateValue(
                                        e?.toSQLDate(),
                                        input?.name
                                    );
                                }}
                                slotProps={{
                                    field: {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        error: isInvalid(input),
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </FormControl>
                );
            case 'datetimepicker':
                return (
                    <FormControl
                        onBlur={() =>
                            setIsDirty([...isDirty, input?.name || ''])
                        }
                        error={isInvalid(input)}
                        fullWidth
                    >
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <MobileDateTimePicker
                                label={getFormLabel(input)}
                                value={
                                    data[input?.name ?? '']
                                        ? DateTime.fromFormat(
                                            data[input?.name ?? ''],
                                            'y-LL-d HH:mm:ss'
                                        )
                                        : undefined
                                }
                                onChange={(e) => {
                                    handleUpdateValue(
                                        e?.toFormat('y-LL-d HH:mm:ss'),
                                        input?.name
                                    );
                                }}
                                slotProps={{
                                    field: {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        error: isInvalid(input),
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </FormControl>
                );
            case 'select':
                return (
                    <FormControl
                        onBlur={() =>
                            setIsDirty([...isDirty, input?.name || ''])
                        }
                        error={isInvalid(input)}
                        fullWidth
                    >
                        <InputLabel id={'label' + input?.name}>
                            {getFormLabel(input)}
                        </InputLabel>
                        <Select
                            labelId={'label' + input?.name}
                            id={input?.name}
                            label={getFormLabel(input)}
                            variant="outlined"
                            value={data[input?.name ?? ''] || ''}
                            onChange={(e) => {
                                handleUpdateValue(
                                    e?.target?.value,
                                    input?.name
                                );
                            }}
                        // @TODO IF NOT REQUIRED ALLOW FOR CLEARING
                        >
                            {input?.values?.map((value, index) => (
                                <MenuItem
                                    key={`form-select-fields-${input?.name}-${index}`}
                                    value={value}
                                >
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case 'checkbox-group':
                return (
                    <FormGroup
                        onBlur={() =>
                            setIsDirty([...isDirty, input?.name || ''])
                        }
                    >
                        {/*@TODO SHOW ERRORS SOMEHOW*/}
                        <InputLabel
                            sx={{ whiteSpace: 'pre-wrap' }}
                            htmlFor={input?.name}
                        >
                            {getFormLabel(input)}
                        </InputLabel>
                        {input?.options?.map((option, index) => (
                            <FormControlLabel
                                key={`form-checkbox-group-${input?.name}-${index}`}
                                color={isInvalid(input) ? 'error' : 'primary'}
                                sx={{
                                    color: isInvalid(input) ? 'red' : undefined,
                                }}
                                control={
                                    <Checkbox
                                        color={
                                            isInvalid(input)
                                                ? 'error'
                                                : 'primary'
                                        }
                                    />
                                }
                                label={typeof option === 'string' ? option : ''}
                                checked={data[input?.name ?? '']?.includes(
                                    option
                                )}
                                onChange={(e) => {
                                    setIsDirty([...isDirty, input?.name || '']);
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    if (e?.target?.checked) {
                                        const newValue = [
                                            option,
                                            ...(input.name
                                                ? data[input.name]
                                                : []),
                                        ];
                                        handleUpdateValue(
                                            newValue,
                                            input?.name
                                        );
                                    } else {
                                        const foundIndex = data[
                                            input.name ?? ''
                                        ].findIndex(
                                            (v: string) => v === option
                                        );

                                        if (foundIndex >= 0) {
                                            const newValue =
                                                data[input?.name ?? ''];
                                            newValue.splice(foundIndex, 1);
                                            handleUpdateValue(
                                                newValue,
                                                input?.name
                                            );
                                        }
                                    }
                                }}
                            />
                        ))}
                    </FormGroup>
                );
            case 'radio-group':
                return (
                    <FormGroup
                        onBlur={() =>
                            setIsDirty([...isDirty, input?.name || ''])
                        }
                    >
                        {/*@TODO SHOW ERRORS SOMEHOW*/}
                        <InputLabel
                            sx={{ whiteSpace: 'pre-wrap' }}
                            id={'label' + input?.name}
                        >
                            {getFormLabel(input)}
                        </InputLabel>
                        <RadioGroup
                            value={data[input?.name ?? ''] || ''}
                            onChange={(e) => {
                                setIsDirty([...isDirty, input?.name || '']);
                                handleUpdateValue(e.target.value, input?.name);
                            }}
                        >
                            {input?.options?.map((option, index) => (
                                <FormControlLabel
                                    key={`form-radio-group-${input?.name}-${index}`}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    value={option}
                                    color={
                                        isInvalid(input) ? 'error' : 'primary'
                                    }
                                    sx={{
                                        color: isInvalid(input)
                                            ? 'red'
                                            : undefined,
                                    }}
                                    control={
                                        <Radio
                                            color={
                                                isInvalid(input)
                                                    ? 'error'
                                                    : 'primary'
                                            }
                                        />
                                    }
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                    </FormGroup>
                );
            case 'tax-field-input':
                return (
                    <FormControl fullWidth>
                        <InputLabel htmlFor={input?.name}>
                            {getFormLabel(input)}
                        </InputLabel>
                        <OutlinedInput
                            id={input?.name}
                            label={getFormLabel(input)}
                            type="number"
                            inputProps={{ step: 0.01 }}
                            startAdornment={
                                <InputAdornment position="start">
                                    {centreConfig?.default_currency_symbol ||
                                        '$'}
                                </InputAdornment>
                            }
                            value={getTaxFieldValue(input, data)}
                            readOnly
                        />
                    </FormControl>
                );
            case 'sum-field-input':
                return (
                    <FormControl fullWidth>
                        <InputLabel htmlFor={input?.name}>
                            {getFormLabel(input)}
                        </InputLabel>
                        <OutlinedInput
                            id={input?.name}
                            label={getFormLabel(input)}
                            type="number"
                            inputProps={{ step: 0.01 }}
                            startAdornment={
                                <InputAdornment position="start">
                                    {centreConfig?.default_currency_symbol ||
                                        '$'}
                                </InputAdornment>
                            }
                            value={getSumField(input, data)}
                            readOnly
                        />
                    </FormControl>
                );
            case 'attachment':
                return (
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <FileInputDisplay
                                handleDelete={() => {
                                    handleUpdateValue('', input?.name);
                                }}
                                data={data[input?.name ?? '']}
                                translations={translations}
                            />
                        </Box>
                        <Button
                            sx={{ mt: 2 }}
                            fullWidth
                            onClick={() => handleAttachment(input)}
                            color={isInvalid(input) ? 'error' : 'primary'}
                            variant={
                                isInvalid(input) ? 'contained' : 'outlined'
                            }
                        >
                            <AttachFileIcon />
                            {getFormLabel(input)}
                        </Button>
                    </Box>
                );
            case 'multi-attachment':
                return (
                    <Box>
                        <Box
                            sx={{
                                display: 'grid',
                                justifyContent: 'center',
                                gap: 1,
                                gridTemplateColumns: '1fr 1fr',
                            }}
                        >
                            {data[input.name ?? ''] &&
                                Object.keys(data[input.name ?? '']).map(
                                    (option: any) => (
                                        <FileInputDisplay
                                            key={`form-multi-attachment-${input?.name}-${option}`}
                                            handleDelete={() => {
                                                const newData = Object.values(
                                                    data[input?.name ?? '']
                                                );

                                                if (
                                                    newData &&
                                                    newData.length > 0
                                                ) {
                                                    newData.splice(option, 1);

                                                    handleUpdateValue(
                                                        newData,
                                                        input?.name
                                                    );
                                                }
                                            }}
                                            data={
                                                data[input.name ?? ''][option]
                                            }
                                            translations={translations}
                                        />
                                    )
                                )}
                        </Box>
                        <Button
                            sx={{ mt: 2 }}
                            fullWidth
                            disabled={
                                (input.name && data[input.name]
                                    ? data[input.name].length || 0
                                    : 0) >= (input?.max_attachments || 0)
                            }
                            onClick={() =>
                                handleAttachment(
                                    input,
                                    input.name && data[input.name]
                                        ? data[input.name].length || 0
                                        : 0
                                )
                            }
                            color={isInvalid(input) ? 'error' : 'primary'}
                            variant={
                                isInvalid(input) ? 'contained' : 'outlined'
                            }
                        >
                            <AttachFileIcon />
                            {getFormLabel(input)}
                        </Button>
                    </Box>
                );
            default:
                console.error('UNFOUND FIELD', input.type);
                return <></>;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'column',
                gap: 2,
            }}
        >
            {form
                .filter((item) => shouldShow(item))
                .map((item: any, index) => (
                    <Box key={`form-input-section--${index}`}>
                        {component(item)}
                    </Box>
                ))}
        </Box>
    );
};

export default RenderFormLayout;
