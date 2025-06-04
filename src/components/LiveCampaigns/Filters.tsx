import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Autocomplete,
    TextField,
    FormControl,
} from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import useMainStore from '../../store';

interface FiltersProps {
    localsList: any[];
    localsDict: any;
    periodFormsDict: {
        [k: string]: {
            name: any;
            attributes: any;
            id: string;
        };
    };
    showCampaignPeriodFormsDict: { [k: string]: { id: string } };
    showCampaignAccessLevels: AccessLevel[];
    showCampaignPeriodFormsList: PeriodFormProps[];
}

const Filters = ({
    localsList,
    localsDict,
    periodFormsDict,
    showCampaignAccessLevels: accessLevels,
}: FiltersProps) => {
    const { t } = useTranslation();
    const {
        setCurrentLocal,
        setCurrentlySelectedPeriodForm,
        setAccessLevel,
        setCollectionDates,
        collectionDates,
        currentlySelectedPeriodForm,
        currentLocal,
        accessLevel,
    } = useMainStore();

    const [tempCollection, setTempCollection] = useState<
        [DateTime | null, DateTime | null]
    >([null, null]);

    useEffect(() => {
        setCurrentlySelectedPeriodForm(undefined);
        setCurrentLocal(undefined);
        setAccessLevel(undefined);
        setCollectionDates([null, null]);
    }, [
        setAccessLevel,
        setCollectionDates,
        setCurrentLocal,
        setCurrentlySelectedPeriodForm,
    ]);

    useEffect(() => {
        setTempCollection(collectionDates);
    }, [collectionDates]);

    const handlePeriodSelectChange = (value: OptionsProp) => {
        if (!value) {
            setCurrentlySelectedPeriodForm(undefined);
            return;
        }

        const periodForm = periodFormsDict[
            value.id
        ] as unknown as PeriodFormProps;

        setCurrentlySelectedPeriodForm(periodForm);
    };

    const PeriodFormSelectOptions = Object.values(periodFormsDict).map(
        (period) => ({
            label: period?.name || period?.attributes?.name,
            id: period.id,
        })
    );

    const handleAccessSelectChange = (value: OptionsProp) => {
        if (!value) {
            setAccessLevel(undefined);
            return;
        }

        const newAccessLevel = accessLevels.find(
            (level) => level.id === value.id
        );

        setAccessLevel(newAccessLevel as AccessLevel);
    };

    const accessLevelOptions = accessLevels?.map((level) => ({
        id: level.id,
        label: level?.attributes?.name,
    }));

    const handleLocalsSelectChange = (value: OptionsProp) => {
        if (!value) {
            setCurrentLocal(undefined);
            return;
        }

        const local = localsDict[value.id] as unknown as SingleLocalProps;
        setCurrentLocal(local);
    };

    const localsOptions = localsList.map((local) => ({
        id: local.id,
        label: local?.attributes?.name,
    }));

    const shortcutsItems = [
        {
            label: t('common.calendar_shortcuts.today'),
            id: 'today',
            getValue: () => {
                const today = DateTime.now();
                return [today.startOf('day'), today.endOf('day')];
            },
        },
        {
            label: t('common.calendar_shortcuts.yesterday'),
            id: 'yesterday',
            getValue: () => {
                const yesterday = DateTime.now().minus({ days: 1 });
                return [yesterday.startOf('day'), yesterday.endOf('day')];
            },
        },
        {
            label: t('common.calendar_shortcuts.last_7_days'),
            id: 'last_7_days',
            getValue: () => {
                const today = DateTime.now();
                return [
                    today.minus({ days: 7 }).startOf('day'),
                    today.endOf('day'),
                ];
            },
        },
        {
            label: t('common.calendar_shortcuts.last_30_days'),
            id: 'last_30_days',
            getValue: () => {
                const today = DateTime.now();
                return [
                    today.minus({ days: 30 }).startOf('day'),
                    today.endOf('day'),
                ];
            },
        },
        {
            label: t('common.calendar_shortcuts.this_month'),
            id: 'this_month',
            getValue: () => {
                const today = DateTime.now();
                return [today.startOf('month'), today.endOf('month')];
            },
        },
        {
            label: t('common.calendar_shortcuts.last_month'),
            id: 'last_month',
            getValue: () => {
                const today = DateTime.now();
                const startOfLastMonth = today
                    .minus({ months: 1 })
                    .startOf('month');
                const endOfLastMonth = today
                    .minus({ months: 1 })
                    .endOf('month');
                return [startOfLastMonth, endOfLastMonth];
            },
        },
    ];

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

            <Autocomplete
                disablePortal
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => {
                    handlePeriodSelectChange(value as OptionsProp);
                }}
                options={PeriodFormSelectOptions}
                value={
                    currentlySelectedPeriodForm
                        ? {
                              id: currentlySelectedPeriodForm?.id,
                              label: currentlySelectedPeriodForm?.name,
                          }
                        : null
                }
                sx={{ flex: 2 }}
                renderInput={(params) => (
                    <TextField {...params} label={t('common.period')} />
                )}
            />

            <Autocomplete
                disablePortal
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) =>
                    handleAccessSelectChange(value as OptionsProp)
                }
                options={accessLevelOptions}
                value={
                    accessLevel
                        ? {
                              id: accessLevel?.id,
                              label: accessLevel?.attributes?.name,
                          }
                        : null
                }
                sx={{ flex: 2 }}
                renderInput={(params) => (
                    <TextField {...params} label={t('common.access_level')} />
                )}
            />

            <Autocomplete
                disablePortal
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => {
                    handleLocalsSelectChange(value as OptionsProp);
                }}
                options={localsOptions}
                value={
                    currentLocal
                        ? {
                              id: currentLocal?.id,
                              label: currentLocal?.attributes?.name,
                          }
                        : null
                }
                sx={{ flex: 2 }}
                renderInput={(params) => (
                    <TextField {...params} label={t('common.stores')} />
                )}
            />

            <FormControl sx={{ flex: 3 }}>
                <LocalizationProvider
                    dateAdapter={AdapterLuxon}
                    adapterLocale="en-gb"
                >
                    <DateRangePicker
                        label={t('common.collection_dates')}
                        sx={{ flex: 3 }}
                        value={
                            tempCollection as [DateTime | null, DateTime | null]
                        }
                        onChange={(newValue) => {
                            setTempCollection(newValue);

                            if (newValue[0] && newValue[1]) {
                                setCollectionDates(newValue);
                            }
                        }}
                        slots={{
                            field: SingleInputDateRangeField,
                        }}
                        slotProps={{
                            shortcuts: {
                                items: shortcutsItems,
                            },
                        }}
                    />
                </LocalizationProvider>
            </FormControl>

            <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                    setCurrentlySelectedPeriodForm(undefined);
                    setAccessLevel(undefined);
                    setCurrentLocal(undefined);
                    setCollectionDates([null, null]);
                }}
            >
                {t('common.clear')}
            </Button>
        </Box>
    );
};

export default Filters;
