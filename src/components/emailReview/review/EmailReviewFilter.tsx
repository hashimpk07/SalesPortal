import React from 'react';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import useEmailSubmissionsReview from '../../../store/emailSubmissionsReview.ts';

interface EmailPendingFilterProps {
    centres: any[];
    stores: any[];
    campaigns: any[];
    periodForms: any[];
}

const EmailReviewFilter: React.FC<EmailPendingFilterProps> = ({
    centres = [],
    stores = [],
    campaigns = [],
    periodForms = [],
}) => {
    const { t } = useTranslation();

    const {
        centre,
        setCentre,
        store,
        setStore,
        campaign,
        setCampaign,
        period,
        setPeriod,
        resetFilterState,
    } = useEmailSubmissionsReview();

    const getEventValue = (
        event: SelectChangeEvent<string | number | null>
    ): string | number | null => event.target.value;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4,
            }}
        >
            <Typography variant="h6">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterAltOutlinedIcon /> Filter:
                </Box>
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="centre-label">
                    {t('common.filter_header.centre')}
                </InputLabel>
                <Select
                    labelId="centre-label"
                    label={t('common.filter_header.centre')}
                    value={centre}
                    onChange={(e) => setCentre(getEventValue(e) as number)}
                    endAdornment={
                        centre && (
                            <IconButton
                                onClick={() => setCentre(null)}
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        )
                    }
                    variant="outlined"
                >
                    {centres?.map((centre) => (
                        <MenuItem
                            key={'centres-select-' + centre.id}
                            value={centre.id}
                        >
                            {centre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="campaigns-label">
                    {t('common.campaign')}
                </InputLabel>
                <Select
                    labelId="campaigns-label"
                    label={t('common.campaign')}
                    value={campaign}
                    onChange={(e) => setCampaign(getEventValue(e) as number)}
                    endAdornment={
                        campaign && (
                            <IconButton
                                onClick={() => {
                                    setCampaign(null);
                                    setPeriod(null);
                                    setStore(null);
                                }}
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        )
                    }
                    variant="outlined"
                >
                    {campaigns?.map((campaign) => (
                        <MenuItem
                            key={'campaigns-select-' + campaign.id}
                            value={campaign.id}
                        >
                            {campaign.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth disabled={!campaign}>
                <InputLabel id="stores-label">{t('common.stores')}</InputLabel>
                <Select
                    labelId="stores-label"
                    label={t('common.stores')}
                    value={store}
                    onChange={(e) => setStore(getEventValue(e) as number)}
                    endAdornment={
                        store && (
                            <IconButton
                                onClick={() => setStore(null)}
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        )
                    }
                    variant="outlined"
                >
                    {stores?.map((store) => (
                        <MenuItem
                            key={'stores-select-' + store.id}
                            value={store.id}
                        >
                            {store.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth disabled={!campaign}>
                <InputLabel id="period-label">{t('common.period')}</InputLabel>
                <Select
                    labelId="period-label"
                    label={t('common.period')}
                    value={period}
                    onChange={(e) => setPeriod(getEventValue(e) as number)}
                    endAdornment={
                        period && (
                            <IconButton
                                onClick={() => setPeriod(null)}
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        )
                    }
                    variant="outlined"
                >
                    {periodForms?.map((period) => (
                        <MenuItem
                            key={'campaigns-select-' + period.id}
                            value={period.id}
                        >
                            {period.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/*<FormControl fullWidth>*/}
            {/*    <LocalizationProvider dateAdapter={AdapterDayjs}>*/}
            {/*        <DatePicker*/}
            {/*            label={t('common.date')}*/}
            {/*            value={date as Dayjs | null}*/}
            {/*            onChange={(newValue) => setDate(newValue)}*/}
            {/*        />*/}
            {/*    </LocalizationProvider>*/}
            {/*</FormControl>*/}

            <Button
                variant="text"
                size="small"
                sx={{ width: '10px' }}
                onClick={() => {
                    resetFilterState();
                }}
            >
                {t('common.filter_header.clear_filters')}
            </Button>
        </Box>
    );
};

export default EmailReviewFilter;
