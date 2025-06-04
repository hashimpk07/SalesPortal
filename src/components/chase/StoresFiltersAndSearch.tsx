import {
    Box,
    Button,
    Autocomplete,
    Typography,
    TextField,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useTranslation } from 'react-i18next';
// import useChasePageFilters from '../../store/chasePageFiltersStore.ts';

interface FiltersAndSearchProps {
    selectedStoreFilter: any;
    setSelectedStoreFilter: any;
    selectedAddedSalesFilter: any;
    setSelectedAddedSalesFilter: any;
    selectedStatusFilter: any;
    setSelectedStatusFilter: any;
    selectedPortfolioCampaignFilter: any;
    setSelectedPortfolioCampaignFilter: any;
    storesFilterOptions: any[];
    statusFilterOptions: any[];
    portfolioCampaignFilterOptions: any[];
}

const FiltersAndSearch = ({
    selectedStoreFilter,
    setSelectedStoreFilter,
    selectedAddedSalesFilter,
    setSelectedAddedSalesFilter,
    selectedStatusFilter,
    setSelectedStatusFilter,
    selectedPortfolioCampaignFilter,
    setSelectedPortfolioCampaignFilter,
    storesFilterOptions,
    statusFilterOptions,
    portfolioCampaignFilterOptions,
}: FiltersAndSearchProps) => {
    const { t } = useTranslation();

    const filters = [
        {
            id: 'stores',
            label: t('common.stores'),
            onChange: (_: any, value: any) =>
                setSelectedStoreFilter(value as any),
            options: storesFilterOptions || [],
            value: selectedStoreFilter || null,
        },
        {
            id: 'addedSales',
            label: t('common.filter_header.added_sales'),
            onChange: (_: any, value: any) => {
                if (value && value.id) {
                    setSelectedAddedSalesFilter(value.id as any);
                } else {
                    setSelectedAddedSalesFilter(null);
                }
            },
            options: [
                { label: t('common.sort_by.true'), id: 'true' },
                { label: t('common.sort_by.false'), id: 'false' },
            ],
            value: selectedAddedSalesFilter
                ? selectedAddedSalesFilter === 'true'
                    ? { label: t('common.sort_by.true'), id: 'true' }
                    : { label: t('common.sort_by.false'), id: 'false' }
                : null,
        },
        {
            id: 'status',
            label: t('common.filter_header.status'),
            onChange: (_: any, value: any) =>
                setSelectedStatusFilter(value as any),
            options: statusFilterOptions || [],
            value: selectedStatusFilter || null,
        },
        {
            id: 'portfolioCampaignFilter',
            label: t('common.filter_header.portfolio_campaign'),
            onChange: (_: any, value: any) =>
                setSelectedPortfolioCampaignFilter(value as any),
            options: portfolioCampaignFilterOptions || [],
            value: selectedPortfolioCampaignFilter || null,
        },
    ];

    const renderFilters = () =>
        filters.map((filter) => (
            <Autocomplete
                key={filter.id}
                disablePortal
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={filter.onChange}
                options={filter.options}
                value={filter.value as any}
                sx={{ flex: 2 }}
                renderInput={(params) => (
                    <TextField {...params} label={filter.label} />
                )}
            />
        ));

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

            {renderFilters()}

            <Button
                variant="contained"
                color="inherit"
                size="small"
                sx={{ width: 100 }}
                onClick={() => {
                    // TODO: reset all filters
                }}
            >
                {t('clear')}
            </Button>
        </Box>
    );
};

export default FiltersAndSearch;
