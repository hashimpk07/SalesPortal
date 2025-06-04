import { Dispatch } from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    Typography,
    Autocomplete,
    TextField,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface FiltersProps {
    centresFilters: OptionsProp[];
    selectedCentreFilter: { id: string; label: string } | null;
    setSelectedCentresFilter: Dispatch<
        React.SetStateAction<OptionsProp | undefined>
    >;
    search: string;
    setSearch: Dispatch<React.SetStateAction<string>>;
}

const Filters = ({
    centresFilters,
    selectedCentreFilter,
    setSelectedCentresFilter,
    search,
    setSearch,
}: FiltersProps) => {
    const { t } = useTranslation();

    const handleCentresSelectChange = (selectedOption: OptionsProp) => {
        const selected = centresFilters?.find(
            (centre) => centre.id.toString() === selectedOption?.id
        );

        setSelectedCentresFilter(selected);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 4,
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
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        setSelectedCentresFilter(undefined);
                    }}
                >
                    {t('common.clear')}
                </Button>
            </Box>

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

                <Autocomplete
                    disablePortal
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    onChange={(_, value) =>
                        handleCentresSelectChange(value as OptionsProp)
                    }
                    value={selectedCentreFilter || { id: '0', label: '' }}
                    options={centresFilters}
                    getOptionLabel={(option) => option?.label || ''}
                    sx={{ width: 400 }}
                    renderInput={(params) => (
                        <TextField {...params} label={t('common.centre')} />
                    )}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.label}
                        </li>
                    )}
                />

                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        setSelectedCentresFilter(undefined);
                    }}
                >
                    {t('common.clear')}
                </Button>
            </Box>
        </>
    );
};

export default Filters;
