import { Box, Typography } from '@mui/material';
import type { TFunction } from 'i18next';
import { type GridColDef } from '@mui/x-data-grid-pro';
import {
    PrimaryTableColumnsInterface,
    SecondaryTableColumnsInterface,
} from '../../../store/liveCampaignTableConfigStore.ts';
import BorderLinearProgress from '@/components/DataGrid/styled/BorderLinearProgress.tsx';

const createTimeframedDetailsColumns = (
    configColumns:
        | PrimaryTableColumnsInterface
        | SecondaryTableColumnsInterface,
    t: TFunction,
    coreDataMapping: any
): GridColDef[] => {
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('common.store'),
            width: 200,
            valueGetter: (_blank, row) => {
                return row?.storeName;
            },
        },
        {
            field: 'mandatorySubmission',
            headerName: 'mandatorySubmission',
            width: 100,
        },
    ];

    const coreSalesData = [
        {
            field: 'coreDataGrossSales',
            defaultVisible: false,
            headerName: t('common.gross_sales'),
            renderCell: ({ row, value }: { row: any; value: string }) => {
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
            valueGetter: (_: unknown, row: any) => {
                const value = row?.coreData?.core_data_gross_sales;
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
                const value = row?.coreData?.core_data_net_sales;
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
                const value = row?.coreData?.core_data_number_transactions;
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
                const value = row?.coreData?.core_data_certified_net_sales;
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
                    row?.coreData?.core_data_certified_gross_sales?.value;
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
                return row?.salesData?.revisionsCount || 0;
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
                            {row.progress?.totalRevisions} /{' '}
                            {row.progress?.totalToComplete}
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
                const totalRevisions = row.progress?.totalRevisions || 0;
                const totalToComplete = row.progress?.totalToComplete || 0;

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

    Object.keys(configColumns.customFormFields).forEach((key) => {
        if (configColumns[key] !== true) {
            return;
        }

        columns.push({
            field: key,
            headerName: key,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            //@ts-expect-error this
            renderCell: ({ row, value }) => {
                if (value === 'attachment' || value === 'multi-attachment') {
                    return '';
                }
                return value;
            },
            valueGetter: (_, row) => {
                const saleValue = row?.salesData && row?.salesData[key];
                if (!saleValue) {
                    return undefined;
                }
                return parseFloat(saleValue);
            },
        });
    });

    // columns.push

    return columns;
};

export default createTimeframedDetailsColumns;
