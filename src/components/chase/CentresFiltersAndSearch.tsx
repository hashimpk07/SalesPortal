import { Dispatch, SetStateAction, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Autocomplete,
    TextField,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useTranslation } from 'react-i18next';
import useMainStore from '../../store';

interface ChaseFiltersAndSearchProps {
    periodTypeFilters: OptionsProp[];
    selectedPeriodType: OptionsProp | undefined;
    setSelectedPeriodType: Dispatch<
        SetStateAction<never | undefined | OptionsProp>
    >;
    periodFilters: OptionsProp[];
    selectedPeriod: OptionsProp | undefined;
    setSelectedPeriod: Dispatch<
        SetStateAction<never | undefined | OptionsProp>
    >;
    centreFilters: OptionsProp[];
    selectedCentre: OptionsProp | undefined;
    setSelectedCentre: Dispatch<
        SetStateAction<never | undefined | OptionsProp>
    >;
    portfolioCampaignFilters: OptionsProp[];
    selectedPortfolioCampaign: OptionsProp[] | undefined;
    setSelectedPortfolioCampaign: Dispatch<
        SetStateAction<OptionsProp[] | undefined>
    >;
}

const ChaseFiltersAndSearch = ({
    periodTypeFilters,
    selectedPeriodType,
    setSelectedPeriodType,
    periodFilters,
    selectedPeriod,
    setSelectedPeriod,
    centreFilters,
    selectedCentre,
    setSelectedCentre,
    portfolioCampaignFilters,
    selectedPortfolioCampaign,
    setSelectedPortfolioCampaign,
}: ChaseFiltersAndSearchProps) => {
    const { t } = useTranslation();
    const {
        setChaseSelectedCentre,
        setChaseSelectedPeriodType,
        setChaseSelectedPeriod,
        setChaseSelectedPortfolioCampaign,
    } = useMainStore();

    useEffect(() => {
        setChaseSelectedCentre(undefined);
        setChaseSelectedPeriodType(undefined);
        setChaseSelectedPeriod(undefined);
        setChaseSelectedPortfolioCampaign(undefined);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterAltOutlinedIcon />
                <Typography variant="h6">Filter:</Typography>
            </Box>

            <Autocomplete
                disablePortal
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => {
                    setSelectedCentre(value as unknown as OptionsProp);
                    setChaseSelectedCentre(value as any);
                }}
                options={centreFilters || []}
                value={selectedCentre || null}
                sx={{ flex: 2 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t('common.filter_header.centre')}
                    />
                )}
            />

            <Autocomplete
                disablePortal
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => {
                    setSelectedPeriodType(value as OptionsProp);
                    setChaseSelectedPeriodType(value as any);
                }}
                options={periodTypeFilters || []}
                value={selectedPeriodType || null}
                sx={{ flex: 2 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t('common.filter_header.period_type')}
                    />
                )}
            />

            <Autocomplete
                disabled={!selectedPeriodType}
                disablePortal
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => {
                    setSelectedPeriod(value as OptionsProp);
                    setChaseSelectedPeriod(value as any);
                }}
                options={periodFilters || []}
                value={selectedPeriodType ? selectedPeriod || null : null}
                sx={{ flex: 2 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t('common.filter_header.period')}
                    />
                )}
            />

            <Autocomplete
                disablePortal
                multiple
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => {
                    setSelectedPortfolioCampaign(value as OptionsProp[]);
                    setChaseSelectedPortfolioCampaign(value as any[]);
                }}
                options={portfolioCampaignFilters || []}
                value={selectedPortfolioCampaign || []}
                sx={{ flex: 2 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t('common.filter_header.portfolio_campaign')}
                    />
                )}
            />

            <Button
                variant="contained"
                color="inherit"
                size="small"
                sx={{ width: 100 }}
                onClick={() => {
                    setSelectedPeriodType(undefined);
                    setSelectedPeriod(undefined);
                    setSelectedCentre(undefined);
                    setSelectedPortfolioCampaign([]);
                }}
            >
                {t('clear')}
            </Button>
        </Box>
    );
};

export default ChaseFiltersAndSearch;
