import { Avatar, Box, Typography } from '@mui/material';
import type { TFunction } from 'i18next';
import { type GridColDef } from '@mui/x-data-grid-pro';
import BorderLinearProgress from '@/components/DataGrid/styled/BorderLinearProgress.tsx';
import {
    PrimaryTableColumnsInterface,
    SecondaryTableColumnsInterface,
} from '../../../store/liveCampaignTableConfigStore.ts';

interface TimeframedColumnDefProps {
    setFormIsOpen: (isOpen: boolean, row: RowData) => void;
    setSelectedRow: (row: RowData) => void;
    t: TFunction;
    configColumns:
    | SecondaryTableColumnsInterface
    | PrimaryTableColumnsInterface;
    periodFormsDict: DictProps;
    coreDataMapping: any;
    showEstimations?: boolean;
}

const timeframedColumnDef = ({
    t,
    configColumns,
    coreDataMapping,
    // showEstimations = true,
}: TimeframedColumnDefProps): GridColDef[] => {
    const columns: GridColDef[] = [
        {
            field: 'periodForm',
            headerName: t('common.period'),
            width: 250,
            valueGetter: (_blank, row) => {
                return row?.id;
            },
        },
    ];

    // if (showEstimations) {
    //     columns.push({
    //         field: 'isEstimate',
    //         headerName: '',
    //         width: 75,
    //         disableColumnMenu: true,
    //         valueGetter: (_blank, row) => {
    //             return row?.isEstimate || false;
    //         },
    //         renderHeader: () => {
    //             return (
    //                 <Tooltip title={t('live_campaign.estimation')}>
    //                     <ShowChartIcon />
    //                 </Tooltip>
    //             );
    //         },
    //         renderCell: ({ value }) => {
    //             return value ? (
    //                 <Box
    //                     sx={{
    //                         display: 'flex',
    //                         justifyContent: 'center',
    //                         alignItems: 'center',
    //                         height: '100%',
    //                     }}
    //                 >
    //                     <Tooltip
    //                         title={
    //                             value
    //                                 ? t(
    //                                     'live_campaign.this_total_includes_estimates'
    //                                 )
    //                                 : null
    //                         }
    //                     >
    //                         <ShowChartIcon />
    //                     </Tooltip>
    //                 </Box>
    //             ) : (
    //                 <Box />
    //             );
    //         },
    //     });
    // }

    const coreSalesData = [
        {
            field: 'coreDataGrossSales',
            defaultVisible: false,
            headerName: t('common.gross_sales'),
            renderCell: ({ row, value }: { row: any; value: string }) => {
                const amount = `${row?.periods[0].currencySymbol}${(
                    parseFloat(value) || 0
                )?.toLocaleString(row?.locale || 'en-GB', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;

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
                const value = row?.totals?.coreData?.core_data_gross_sales;
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
            valueGetter: (_: unknown, row: any) => {
                const value = row?.totals?.coreData?.core_data_net_sales;
                return value ? parseFloat(value).toFixed(2) : '';
            },
            renderHeader: () =>
                coreDataMapping?.core_data_net_sales?.coreName
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_net_sales?.coreName
                    )
                    : t('common.net_sales'),
            renderCell: ({ value, row }: { row: RowData; value: string }) => {
                const amount = `${row?.currencySymbol}${(
                    parseFloat(value) || 0
                )?.toLocaleString(row?.locale || 'en-GB', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;

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
            valueGetter: (_: unknown, row: any) => {
                const value =
                    row?.totals?.coreData?.core_data_number_transactions;
                return value ? value : '';
            },
            renderHeader: () =>
                coreDataMapping?.core_data_number_transactions?.coreName
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_number_transactions
                            ?.coreName
                    )
                    : t('common.number_of_transactions'),
        },
        {
            field: 'coreDataCertifiedNetSales',
            defaultVisible: false,
            headerName: t('common.certified_net_sales'),
            valueGetter: (_: unknown, row: any) => {
                const value =
                    row?.totals?.coreData?.core_data_certified_net_sales;
                return value ? parseFloat(value).toFixed(2) : '';
            },
            renderHeader: () =>
                coreDataMapping?.core_data_certified_net_sales?.coreName
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_certified_net_sales
                            ?.coreName
                    )
                    : t('common.certified_net_sales'),
            renderCell: ({ value, row }: { row: RowData; value: string }) => {
                const amount = `${row?.currencySymbol}${(
                    parseFloat(value) || 0
                )?.toLocaleString(row?.locale || 'en-GB', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;

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
            valueGetter: (_: unknown, row: any) => {
                const value =
                    row?.totals?.coreData?.core_data_certified_gross_sales
                        ?.value;
                return value ? parseFloat(value).toFixed(2) : '';
            },
            renderHeader: () => {
                return coreDataMapping?.core_data_certified_gross_sales
                    ?.coreName
                    ? t(
                        'core.' +
                        coreDataMapping?.core_data_certified_gross_sales
                            ?.coreName
                    )
                    : t('common.certified_gross_sales');
            },
            renderCell: ({ value, row }: { row: RowData; value: string }) => {
                const amount = `${row?.currencySymbol}${(
                    parseFloat(value) || 0
                )?.toLocaleString(row?.locale || 'en-GB', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;

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

    if (configColumns.revisions) {
        columns.push({
            field: 'revisions',
            headerName: t('common.revisions'),
            width: 150,
            type: 'number',
            valueGetter: (_blank, row) => {
                return row?.totals?.salesData?.revisionsCount || 0;
            },
        });
    }

    // if (configColumns.lastEntryDate) {
    //     columns.push({
    //         flex: 1,
    //         field: 'lastEntry',
    //         headerName: t('common.last_entry'),
    //         valueGetter: (_blank, row) => {
    //             return row?.formData?.updatedAt;
    //         },
    //         renderCell: ({ value }) => {
    //             if (!value) return '';

    //             return DateTime.fromISO(value).toLocaleString(
    //                 DateTime.DATETIME_SHORT
    //             );
    //         },
    //     });
    // }

    if (configColumns.completedBy) {
        columns.push({
            field: 'completed_by',
            headerName: t('common.completed_by'),
            flex: 1,
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
                            sx={{ width: 28, height: 28 }}
                        />
                        {params?.row?.createdByUser?.name}
                    </Box>
                );
            },
        });
    }

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
                            {row.totals.progress?.totalRevisions} /{' '}
                            {row.totals.progress?.totalToComplete}
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
                const totalRevisions = row.totals.progress?.totalRevisions || 0;
                const totalToComplete = row.totals.progress?.totalToComplete || 0;

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
                return (
                    (row.progress?.totalRevisions /
                        row.progress?.totalToComplete) *
                    100
                );
            },
        });
    }

    /**
     * add custom form fields to table
     */
    Object.keys(configColumns.customFormFields).forEach((key) => {
        if (configColumns[key] !== true) {
            return;
        }

        columns.push({
            field: key,
            headerName: key,

            //@ts-expect-error this
            renderCell: ({ row, value }) => {
                if (value === 'attachment' || value === 'multi-attachment') {
                    return '';
                }
                return value;
            },
            valueGetter: (_, row) => {
                const saleValue =
                    row?.totals?.salesData && row?.totals?.salesData[key];
                if (!saleValue) {
                    return undefined;
                }
                return parseFloat(saleValue);
            },
        });
    });

    return [...columns];
};

export default timeframedColumnDef;
