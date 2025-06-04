import React from 'react';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DateRangeIcon from '@mui/icons-material/DateRange';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { useTranslation } from 'react-i18next';
import { PrimaryTableColumnsInterface } from '../../../../store/liveCampaignTableConfigStore.ts';
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

interface PrimaryTableConfigInterface {
    liveCampaignShallowCopy: PrimaryTableColumnsInterface;
    setTableConfig: (a: keyof PrimaryTableColumnsInterface, b: boolean) => void;
}

const PrimaryTableConfig: React.FC<PrimaryTableConfigInterface> = ({
    liveCampaignShallowCopy,
    setTableConfig,
}) => {
    const { t } = useTranslation();
    const { coreDataMapping } = useMainStore();

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
                    <Typography variant="overline">
                        {t('common.general')}
                    </Typography>
                </Box>

                <Box sx={bodyStyle}>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="default" />}
                        label={t('common.store')}
                        labelPlacement="start"
                        disabled
                        checked
                        sx={{
                            justifyContent: 'space-between',
                        }}
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
                                        'storeId',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label={t('live_campaign.table.store_id')}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                        checked={liveCampaignShallowCopy.storeId}
                    />
                    {/* <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                color="primary"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setTableConfig('unit', event.target.checked)
                                }
                            />
                        }
                        label={t('retailer_data.table.unit')}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        checked={liveCampaignShallowCopy.unit}
                        labelPlacement="start"
                    /> */}
                    {/* <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                color="primary"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setTableConfig(
                                        'leaseReferenceNumber',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label={t('retailer_data.table.lease_reference')}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        checked={liveCampaignShallowCopy.leaseReferenceNumber}
                        labelPlacement="start"
                    /> */}
                </Box>
            </Box>
            <Box>
                <Box sx={headingStyles}>
                    <LocalAtmIcon fontSize="small" />
                    <Typography variant="overline">
                        {t('common.sales')}
                    </Typography>
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
                                        'showIncludeEstimations',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy.showIncludeEstimations}
                        label={t(
                            'live_campaign.config_modal.show_include_estimations_in_totals_toggle'
                        )}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                    />

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
                    <Typography variant="overline">
                        {t('live_campaign.config_modal.time__dates')}
                    </Typography>
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
                                        'dueDateForCompletion',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy.dueDateForCompletion}
                        label={t('live_campaign.table.due_date_for_completion')}
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
                                        'dateCollectionCompleted',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={
                            liveCampaignShallowCopy.dateCollectionCompleted
                        }
                        label={t(
                            'live_campaign.table.date_collection_completed'
                        )}
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
                                        'timeCollectionCompleted',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={
                            liveCampaignShallowCopy.timeCollectionCompleted
                        }
                        label={t(
                            'live_campaign.table.time_collection_completed'
                        )}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                    /> */}
                </Box>
            </Box>
            <Box>
                <Box sx={headingStyles}>
                    <ChecklistRtlIcon fontSize="small" />
                    <Typography variant="overline">
                        {t('common.attributes')}
                    </Typography>
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
                                        'completedVsAll',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy.completedVsAll}
                        label={t('live_campaign.config_modal.completed_vs_all')}
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
                                        'progressOfCompletion',
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        checked={liveCampaignShallowCopy.progressOfCompletion}
                        label={t(
                            'live_campaign.config_modal.progress_of_completion'
                        )}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                        labelPlacement="start"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PrimaryTableConfig;
