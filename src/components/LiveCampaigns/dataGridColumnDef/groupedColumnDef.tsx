import { Tooltip, Avatar, Box, Switch, Typography } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { TFunction } from 'i18next';
import { type GridColDef } from '@mui/x-data-grid-pro';
import { DateTime } from 'luxon';
import BorderLinearProgress from '../../DataGrid/styled/BorderLinearProgress.tsx';
import { PrimaryTableColumnsInterface } from '../../../store/liveCampaignTableConfigStore.ts';

const createGroupedColumns = (
    toggle: boolean,
    handleToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    configColumns: PrimaryTableColumnsInterface,
    t: TFunction,
    coreDataMapping?: any,
    hasEstimates: boolean = false
): GridColDef[] => {
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('common.store'),
            width: 200,
        },
        {
            field: 'mandatorySubmission',
            headerName: 'mandatorySubmission',
            width: 100,
            valueGetter: (_, row) => {
                return row?.config?.sales_in_lease ? 'true' : 'false'; // @TODO
            },
        },
    ];

    if (configColumns.storeId) {
        columns.push({
            field: 'id',
            headerName: t('live_campaign.table.store_id'),
            renderCell: ({ value }) => value,
            valueGetter: (value) => value,
        });
    }

    if (configColumns.unit) {
        // TODO: Where is the data coming from?
        // we don't have it yet - disabled in column config modal
        columns.push({
            field: 'unit',
            headerName: t('retailer_data.table.unit'),
        });
    }

    if (configColumns.leaseReferenceNumber) {
        // TODO: Where is the data coming from?
        // we don't have it yet - disabled in column config modal
        columns.push({
            field: 'leaseReferenceNumber',
            headerName: t('retailer_data.table.lease_reference'),
        });
    }

    if (configColumns.showIncludeEstimations) {
        columns.push({
            field: 'estimated',
            disableColumnMenu: true,
            headerName: '',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            width: 100,
            renderHeader: () => (
                <Tooltip
                    disableHoverListener={hasEstimates}
                    disableFocusListener={hasEstimates}
                    disableTouchListener={hasEstimates}
                    title={
                        <>
                            {t('live_campaign.show_hide_estimates')}
                            <br />
                            {t('live_campaign.not_enough_data_estimates')}
                            <br />
                            <a
                                href="https://support.mallcommapp.com/knowledge/sales-portal"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#d5f3ff' }}
                            >
                                {t('live_campaign.learn_more_estimates')}
                            </a>
                        </>
                    }
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Switch
                            checked={toggle}
                            onChange={handleToggleChange}
                            disabled={!hasEstimates}
                        />
                    </Box>
                </Tooltip>
            ),
            valueGetter: (_, row) => {
                return (
                    row?.entries?.find((r: any) => {
                        return r?.isEstimate;
                    }) !== undefined
                );
            },
            renderCell: ({ value }) => {
                return (
                    <Tooltip
                        title={
                            value
                                ? t(
                                    'live_campaign.this_total_includes_estimates'
                                )
                                : null
                        }
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            {value ? <ShowChartIcon /> : null}
                        </Box>
                    </Tooltip>
                );
            },
        });
    }

    const coreSalesData = [
        {
            field: 'coreDataGrossSales',
            defaultVisible: false,
            headerName: t('common.gross_sales'),
            width: 150,
            renderCell: ({ row, value }: { row: RowData; value: string }) => {
                const amount = `${row?.currencySymbol}${(
                    parseFloat(value) || 0
                )?.toLocaleString(
                    row?.locale || navigator.language || 'en-GB',
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }
                )}`;

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {value ? amount : ''}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_: unknown, row: any) => {
                const value = row?.coreSalesDict?.core_data_gross_sales?.value;
                return value ? parseFloat(value).toFixed(2) : '';
            },
            renderHeader: () => {
                return coreDataMapping?.core_data_gross_sales?.name
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_gross_sales?.coreName
                    )
                    : t('common.gross_sales');
            },
        },
        {
            field: 'coreDataNetSales',
            defaultVisible: false,
            headerName: t('common.net_sales'),
            width: 150,
            valueGetter: (_: unknown, row: any) => {
                const value = row?.coreSalesDict?.core_data_net_sales?.value;
                return value ? parseFloat(value).toFixed(2) : '';
            },
            renderHeader: () =>
                coreDataMapping?.core_data_net_sales?.name
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_net_sales?.coreName
                    )
                    : t('common.net_sales'),
            renderCell: ({ value, row }: { row: RowData; value: string }) => {
                const amount = `${row?.currencySymbol}${(
                    parseFloat(value) || 0
                )?.toLocaleString(
                    row?.locale || navigator.language || 'en-GB',
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }
                )}`;

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {value ? amount : ''}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'coreDataNumberTransactions',
            defaultVisible: false,
            headerName: t('common.number_of_transactions'),
            width: 150,
            valueGetter: (_: unknown, row: any) => {
                const value =
                    row?.coreSalesDict?.core_data_number_transactions?.value;
                return value ? value : '';
            },
            renderHeader: () =>
                coreDataMapping?.core_data_number_transactions?.name
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_number_transactions
                            ?.coreName
                    )
                    : t('common.number_of_transactions'),
            renderCell: ({ value, row }: { row: RowData; value: string }) => {
                return (parseFloat(value) || 0)?.toLocaleString(
                    row?.locale || navigator.language || 'en-GB'
                );
            },
        },
        {
            field: 'coreDataCertifiedNetSales',
            defaultVisible: false,
            headerName: t('common.certified_net_sales'),
            width: 175,
            valueGetter: (_: unknown, row: any) => {
                const value =
                    row?.coreSalesDict?.core_data_certified_net_sales?.value;
                return value ? parseFloat(value).toFixed(2) : '';
            },
            renderHeader: () =>
                coreDataMapping?.core_data_certified_net_sales?.name
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_certified_net_sales
                            ?.coreName
                    )
                    : t('common.certified_net_sales'),
            renderCell: ({ value, row }: { row: RowData; value: string }) => {
                const amount = `${row?.currencySymbol}${(
                    parseFloat(value) || 0
                )?.toLocaleString(
                    row?.locale || navigator.language || 'en-GB',
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }
                )}`;

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {value ? amount : ''}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'coreDataCertifiedGrossSales',
            defaultVisible: false,
            headerName: t('common.certified_gross_sales'),
            width: 175,
            valueGetter: (_: unknown, row: any) => {
                const value =
                    row?.coreSalesDict?.core_data_certified_gross_sales?.value;
                return value ? parseFloat(value).toFixed(2) : '';
            },
            renderHeader: () =>
                coreDataMapping?.core_data_certified_gross_sales?.name
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_certified_gross_sales
                            ?.coreName
                    )
                    : t('common.certified_gross_sales'),
            renderCell: ({ value, row }: { row: RowData; value: string }) => {
                const amount = `${row?.currencySymbol}${(
                    parseFloat(value) || 0
                )?.toLocaleString(
                    row?.locale || navigator.language || 'en-GB',
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }
                )}`;

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {value ? amount : ''}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    coreSalesData?.forEach((col) => {
        if (configColumns?.[col.field as keyof typeof configColumns]) {
            columns.push({
                ...(col as GridColDef),
                field: `core-${col.field}`,
            });
        }
    });

    if (configColumns.dueDateForCompletion) {
        columns.push({
            field: 'dueDateForCompletion',
            flex: 2,
            headerName: t('live_campaign.table.due_date_for_completion'),
            valueGetter: (_, row) => {
                const scheduleStartDate =
                    row?.lastPeriod?.attributes?.scheduleStartDate ||
                    row?.lastPeriod?.scheduleStartDate;
                return scheduleStartDate ? scheduleStartDate : '';
            },
            renderCell: ({ value }) => {
                if (!value) {
                    return '';
                }

                return DateTime.fromISO(value).toLocaleString(
                    DateTime.DATETIME_SHORT
                );
            },
        });
    }

    if (configColumns.dateCollectionCompleted) {
        columns.push({
            field: 'lastEntry',
            flex: 2,
            headerName: t('live_campaign.table.date_collection_completion'),
            valueGetter: (_, row) => {
                const updatedAt =
                    row?.lastPeriod?.attributes?.updatedAt ||
                    row?.lastPeriod?.updatedAt;
                return updatedAt ? updatedAt : undefined;
            },
            renderCell: ({ value }) => {
                if (!value) {
                    return '';
                }

                return DateTime.fromISO(value).toLocaleString(
                    DateTime.DATETIME_SHORT
                );
            },
        });
    }

    if (configColumns.timeCollectionCompleted) {
        columns.push({
            field: 'lastEntry',
            headerName: t('live_campaign.table.time_collection_completion'),
        });
    }

    if (configColumns.completedBy) {
        columns.push({
            field: 'completedBy',
            headerName: t('common.completed_by'),
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            height: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt={params.value}
                            src={params.value || 'fail'}
                        />
                    </Box>
                );
            },
        });
    }

    // if (configColumns.assignee) {
    //     columns.push({
    //         field: 'assignee',
    //         headerName: t('live_campaign.table.assignee'),
    //         renderCell: (params) => {
    //             return (
    //                 <Box
    //                     sx={{
    //                         display: 'flex',
    //                         gap: 2,
    //                         height: '100%',
    //                         alignItems: 'center',
    //                     }}
    //                 >
    //                     <Avatar
    //                         alt={params.value}
    //                         src={params.value || 'fail'}
    //                     />
    //                 </Box>
    //             );
    //         },
    //     });
    // }

    if (configColumns.completedVsAll) {
        columns.push({
            field: 'fraction',
            headerName: t('common.completed'),
            width: 150,
            renderCell: ({ row }) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            height: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {row.totalRevisions} / {row.totalToComplete}
                        </Typography>
                    </Box>
                );
            },
        });
    }

    if (configColumns.progressOfCompletion) {
        columns.push({
            field: 'progress',
            headerName: t('common.progress'),
            width: 150,
            flex: 2,
            renderCell: ({ row }) => {
                const totalRevisions = row.totalRevisions || 0;
                const totalToComplete = row.totalToComplete || 0;

                if (totalRevisions === 0 && totalToComplete === 0) {
                    return <Box />;
                }

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <Box sx={{ minWidth: 40, pr: 2 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >{`${Math.round((totalRevisions / totalToComplete) * 100)}%`}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <BorderLinearProgress
                                variant="determinate"
                                value={(totalRevisions / totalToComplete) * 100}
                            />
                        </Box>
                    </Box>
                );
            },
            valueGetter: (_, row) => {
                return (row.totalRevisions / row.totalToComplete) * 100;
            },
        });
    }

    return columns;
};

export default createGroupedColumns;
