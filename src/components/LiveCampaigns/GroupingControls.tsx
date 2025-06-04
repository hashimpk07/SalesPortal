import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useFilterStore from '../../store/filtersStore';

interface GroupedControlsProps {
    groups: string[];
    defaultValue: string;
}

const GroupedControls: React.FC<GroupedControlsProps> = ({
    groups,
    defaultValue,
}) => {
    const { selectedGroup, setSelectedGroup } = useFilterStore();

    const { t } = useTranslation();

    // Filter options based on the default value
    const getAvailableOptions = (defaultValue: string): string[] => {
        const index = groups.indexOf(defaultValue);
        return index !== -1 ? groups.slice(0, index + 1) : groups;
    };

    const availableOptions = getAvailableOptions(defaultValue);

    const handleChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ): void => {
        setSelectedGroup(event.target.value as string);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4,
            }}
        >
            <FormControl fullWidth>
                <InputLabel
                    id="dropdown-label"
                    sx={{ backgroundColor: 'white' }}
                >
                    {t('live_campaign.select_grouping')}
                </InputLabel>
                <Select
                    labelId="dropdown-label"
                    defaultValue={defaultValue}
                    value={selectedGroup}
                    // @ts-expect-error this
                    onChange={handleChange}
                    inputProps={{ name: 'group' }}
                >
                    {availableOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default GroupedControls;
