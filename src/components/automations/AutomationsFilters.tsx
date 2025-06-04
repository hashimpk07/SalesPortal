import React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    // eslint-disable-next-line import/named
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import useAutomationsStore, {
    AutomatedCompletedProps,
} from '../../store/automationsStore.ts';

interface AutomationsFiltersProps {
    centres: unknown[];
    campaigns: unknown[];
    setCreateAutomation: () => void;
}

const AutomationsFilters: React.FC<AutomationsFiltersProps> = ({
    centres,
    campaigns,
    setCreateAutomation,
}) => {
    const { t } = useTranslation();
    const {
        status,
        setStatus,
        campaign,
        setCampaign,
        centre,
        setCentre,
        as,
        setAs,
        search,
        setSearch,
    } = useAutomationsStore();

    const getEventValue = (
        event: SelectChangeEvent<string | number | null>
    ): string | number | null => event.target.value;

    const CentresList =
        centres?.map((centre: any) => ({
            label: centre?.name || centre?.attributes?.name,
            id: centre.id,
        })) || [];

    const CampaignsList =
        campaigns?.map((campaign: any) => ({
            label: campaign?.name || campaign?.attributes?.name,
            id: campaign.id,
        })) || [];

    const handleCentresChanges = (value: AutomatedCompletedProps) => {
        setCentre(value);
    };

    const handleCampaignChanges = (value: AutomatedCompletedProps) => {
        setCampaign(value);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <TextField
                    id="input-with-icon-textfield"
                    label={t('common.search')}
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: '50%' }}
                    variant="outlined"
                />
                <Button
                    onClick={() => {
                        setCreateAutomation();
                    }}
                >
                    Create Automation
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    pt: 2,
                }}
            >
                <FormControl fullWidth>
                    <Autocomplete
                        disableClearable
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        onChange={(_, value) => {
                            handleCentresChanges(value);
                        }}
                        options={CentresList}
                        value={centre as any}
                        sx={{ flex: 2 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('common.centres')}
                            />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="status-label">
                        {t('common.filter_header.status')}
                    </InputLabel>
                    <Select
                        labelId="status-label"
                        label={t('common.filter_header.status')}
                        value={status}
                        onChange={(e) => setStatus(getEventValue(e) as any)}
                        endAdornment={
                            status && (
                                <IconButton
                                    onClick={() => setStatus(null)}
                                    size="small"
                                >
                                    <ClearIcon />
                                </IconButton>
                            )
                        }
                        variant="outlined"
                    >
                        <MenuItem key={'status-select-expired'} value="expired">
                            {t('automations.expired')}
                        </MenuItem>
                        <MenuItem key={'status-select-active'} value="active">
                            {t('automations.active')}
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <Autocomplete
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        onChange={(_, value) => {
                            handleCampaignChanges(value as any);
                        }}
                        options={CampaignsList}
                        value={campaign}
                        sx={{ flex: 2 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('common.campaigns')}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="as-label">
                        {t('automations.filter_headers.as')}
                    </InputLabel>
                    <Select
                        labelId="as-label"
                        label={t('automations.filter_headers.as')}
                        value={as}
                        onChange={(e) => setAs(getEventValue(e) as any)}
                        endAdornment={
                            as && (
                                <IconButton
                                    onClick={() => setAs(null)}
                                    size="small"
                                >
                                    <ClearIcon />
                                </IconButton>
                            )
                        }
                        variant="outlined"
                    >
                        <MenuItem
                            key={'as-select-push_notification'}
                            value="push"
                        >
                            {t('automations.push_notification')}
                        </MenuItem>
                        <MenuItem key={'status-select-email'} value="email">
                            {t('automations.email')}
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

export default AutomationsFilters;
