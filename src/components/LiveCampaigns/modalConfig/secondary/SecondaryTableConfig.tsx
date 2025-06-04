import React, { useRef, useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';
import { SecondaryTableColumnsInterface } from '../../../../store/liveCampaignTableConfigStore.ts';
import useMainStore from '../../../../store';

const headingStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
};

const bodyStyle = {
    display: 'flex',
    flexFlow: 'column',
    gap: 1,
};

const customBodyStyle = {
    display: 'flex',
    flexFlow: 'column',
    gap: 1,
    maxHeight: '10rem',
    overflow: 'scroll',
    whiteSpace: 'nowrap', // Prevent wrapping
    textOverflow: 'ellipsis',
    position: 'relative',
};

const chevronStyles = {
    position: 'absolute',
    bottom: '1.6rem',
    right: '1.6rem',
    zIndex: 1,
    cursor: 'pointer',
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '0px 0.4rem 0.8rem rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2rem',
    height: '2rem',
};

interface SecondaryTableConfigInterface {
    liveCampaignShallowCopy: SecondaryTableColumnsInterface;
    setTableConfig: (
        a: keyof SecondaryTableColumnsInterface,
        b: boolean
    ) => void;
}

const SecondaryTableConfig: React.FC<SecondaryTableConfigInterface> = ({
    liveCampaignShallowCopy,
    setTableConfig,
}) => {
    const { t } = useTranslation();
    const { coreDataMapping } = useMainStore();

    const [chevronState, setChevronState] = useState<'up' | 'down' | 'hidden'>(
        'down'
    );
    const customBodyRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (customBodyRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = customBodyRef.current;

            if (scrollTop < 30) {
                setChevronState('down');
            } else if (scrollTop + clientHeight >= scrollHeight - 20) {
                setChevronState('up');
            } else {
                setChevronState('hidden');
            }
        }
    };

    const handleChevronClick = () => {
        if (customBodyRef.current) {
            if (chevronState === 'up') {
                customBodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (chevronState === 'down') {
                customBodyRef.current.scrollBy({ top: 60, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const currentRef = customBodyRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
            return () => currentRef.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 2,
                ' > *': {
                    borderRight: 'solid 1px lightgray',
                    pr: 2,
                    label: {
                        ml: 0,
                    },
                },
            }}
        >
            <Box>
                <Box sx={headingStyles}>
                    <DisplaySettingsIcon fontSize="small" />
                    <Typography variant="overline">General</Typography>
                </Box>

                <Box sx={bodyStyle}>
                    <FormControlLabel
                        value="period"
                        control={<Switch color="default" />}
                        label={t('common.period')}
                        labelPlacement="start"
                        disabled
                        checked
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    />
                </Box>
            </Box>
            <Box>
                <Box sx={headingStyles}>
                    <LocalAtmIcon fontSize="small" />
                    <Typography variant="overline">Sales</Typography>
                </Box>
                <Box sx={bodyStyle}>
                    {coreDataMapping?.core_data_gross_sales?.name && (
                        <FormControlLabel
                            value="start"
                            control={
                                <Switch
                                    color="primary"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setTableConfig(
                                            'coreDataGrossSales',
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            checked={liveCampaignShallowCopy.coreDataGrossSales}
                            label={t(
                                'core.' +
                                coreDataMapping?.core_data_gross_sales
                                    ?.coreName
                            )}
                            sx={{
                                justifyContent: 'space-between',
                            }}
                            labelPlacement="start"
                        />
                    )}

                    {coreDataMapping?.core_data_net_sales?.name && (
                        <FormControlLabel
                            value="start"
                            control={
                                <Switch
                                    color="primary"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setTableConfig(
                                            'coreDataNetSales',
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            checked={liveCampaignShallowCopy.coreDataNetSales}
                            label={t(
                                'core.' +
                                coreDataMapping?.core_data_net_sales
                                    ?.coreName
                            )}
                            sx={{
                                justifyContent: 'space-between',
                            }}
                            labelPlacement="start"
                        />
                    )}
                    {coreDataMapping?.core_data_number_transactions?.name && (
                        <FormControlLabel
                            value="start"
                            control={
                                <Switch
                                    color="primary"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setTableConfig(
                                            'coreDataNumberTransactions',
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            checked={
                                liveCampaignShallowCopy.coreDataNumberTransactions
                            }
                            label={t(
                                'core.' +
                                coreDataMapping
                                    ?.core_data_number_transactions
                                    ?.coreName
                            )}
                            sx={{
                                justifyContent: 'space-between',
                            }}
                            labelPlacement="start"
                        />
                    )}

                    {coreDataMapping?.core_data_certified_net_sales?.name && (
                        <FormControlLabel
                            value="start"
                            control={
                                <Switch
                                    color="primary"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setTableConfig(
                                            'coreDataCertifiedNetSales',
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            checked={
                                liveCampaignShallowCopy.coreDataCertifiedNetSales
                            }
                            label={t(
                                'core.' +
                                coreDataMapping
                                    ?.core_data_certified_net_sales
                                    ?.coreName
                            )}
                            sx={{
                                justifyContent: 'space-between',
                            }}
                            labelPlacement="start"
                        />
                    )}

                    {coreDataMapping?.core_data_certified_gross_sales?.name && (
                        <FormControlLabel
                            value="start"
                            control={
                                <Switch
                                    color="primary"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setTableConfig(
                                            'coreDataCertifiedGrossSales',
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                            checked={
                                liveCampaignShallowCopy.coreDataCertifiedGrossSales
                            }
                            label={t(
                                'core.' +
                                coreDataMapping
                                    ?.core_data_certified_gross_sales
                                    ?.coreName
                            )}
                            sx={{
                                justifyContent: 'space-between',
                            }}
                            labelPlacement="start"
                        />
                    )}
                </Box>
            </Box>
            <Box>
                <Box sx={headingStyles}>
                    <DateRangeIcon fontSize="small" />
                    <Typography variant="overline">Time & Dates</Typography>
                </Box>
                <Box sx={bodyStyle}>
                    <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                color="primary"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setTableConfig(
                                        'revisions',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy.revisions}
                        label={t('common.revisions')}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                color="primary"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setTableConfig(
                                        'lastEntryDate',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy.lastEntryDate}
                        label={t('common.last_entry_date')}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                    />
                    {/* <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                color="primary"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setTableConfig(
                                        'lastEntryTime',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy.lastEntryTime}
                        label={t('common.last_entry_time')}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                    /> */}
                </Box>
            </Box>
            <Box>
                <Box sx={headingStyles}>
                    <PeopleAltIcon fontSize="small" />
                    <Typography variant="overline">People</Typography>
                </Box>
                <Box sx={bodyStyle}>
                    <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                color="primary"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setTableConfig(
                                        'completedBy',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy.completedBy}
                        label={t('common.completed_by')}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                    />

                    {/* <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                color="primary"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setTableConfig(
                                        'assignee',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy?.assignee}
                        label={t('live_campaign.table.assignee')}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                    /> */}
                </Box>
            </Box>
            <Box sx={{ position: 'relative' }}>
                <Box sx={headingStyles}>
                    <ChecklistRtlIcon fontSize="small" />
                    <Typography variant="overline">
                        {t('common.other')}
                    </Typography>
                    {chevronState !== 'hidden' && (
                        <Box sx={chevronStyles} onClick={handleChevronClick}>
                            {chevronState === 'up' ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </Box>
                    )}
                </Box>
                <Box sx={customBodyStyle} ref={customBodyRef}>
                    {Object.entries(
                        liveCampaignShallowCopy.customFormFields
                    ).map(([key, value]) => {
                        const toggle = liveCampaignShallowCopy[key];
                        return (
                            <FormControlLabel
                                key={key}
                                value={value}
                                control={
                                    <Switch
                                        color="primary"
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setTableConfig(
                                                key,
                                                event.target.checked
                                            )
                                        }
                                    />
                                }
                                //@ts-expect-error this
                                checked={toggle}
                                label={key}
                                sx={{
                                    justifyContent: 'space-between',
                                }}
                                labelPlacement="start"
                            />
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default SecondaryTableConfig;
