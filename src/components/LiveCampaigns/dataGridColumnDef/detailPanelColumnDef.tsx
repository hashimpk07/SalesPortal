import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import type { TFunction } from 'i18next';
import { type GridColDef } from '@mui/x-data-grid-pro';
import { DateTime } from 'luxon';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
    EditSalesDataButton,
    AddSalesDataButton,
} from '../../common/ActionButtons.tsx';
import {
    PrimaryTableColumnsInterface,
    SecondaryTableColumnsInterface,
} from '../../../store/liveCampaignTableConfigStore.ts';
import {
    renderAttachmentCell,
    numberOfAttachments,
} from './renderAttachmentCell.tsx';

interface DetailPanelColumnDefProps {
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

const detailPanelColumnDef = ({
    setFormIsOpen,
    setSelectedRow,
    t,
    configColumns,
    coreDataMapping,
    showEstimations = true,
}: DetailPanelColumnDefProps): GridColDef[] => {
    const columns: GridColDef[] = [
        {
            field: 'edit',
            headerName: t('common.edit'),
            width: 100,
            renderCell: ({ row }: { row: RowData }) => {
                return (parseInt(row?.formData?.revisionsCount as string, 10) ||
                    0) > 0 ? (
                    <EditSalesDataButton
                        tooltipText={t('live_campaign.add_revision')}
                        handleClick={() => {
                            setFormIsOpen(true, row);
                            setSelectedRow(row);
                        }}
                    />
                ) : (
                    <AddSalesDataButton
                        tooltipText={t('live_campaign.add_sales')}
                        handleClick={() => {
                            setFormIsOpen(true, row);
                            setSelectedRow(row);
                        }}
                    />
                );
            },
        },
        {
            field: 'periodForm',
            headerName: t('common.period'),
            width: 250,
            valueGetter: (_blank, row) => {
                return row?.periodName;
            },
        },
    ];

    if (showEstimations) {
        columns.push({
            field: 'isEstimate',
            headerName: '',
            width: 75,
            disableColumnMenu: true,
            valueGetter: (_blank, row) => {
                return row?.isEstimate || false;
            },
            renderHeader: () => {
                return (
                    <Tooltip title={t('live_campaign.estimation')}>
                        <ShowChartIcon />
                    </Tooltip>
                );
            },
            renderCell: ({ value }) => {
                return value ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <Tooltip
                            title={
                                value
                                    ? t(
                                        'live_campaign.this_total_includes_estimates'
                                    )
                                    : null
                            }
                        >
                            <ShowChartIcon />
                        </Tooltip>
                    </Box>
                ) : (
                    <Box />
                );
            },
        });
    }

    const coreSalesData = [
        {
            field: 'coreDataGrossSales',
            defaultVisible: false,
            headerName: t('common.gross_sales'),
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
                const value =
                    row?.combinedCoreDict?.core_data_gross_sales?.value;
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
                const value = row?.combinedCoreDict?.core_data_net_sales?.value;
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
            valueGetter: (_: unknown, row: any) => {
                const value =
                    row?.combinedCoreDict?.core_data_number_transactions?.value;
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
                    row?.combinedCoreDict?.core_data_certified_net_sales?.value;
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
            valueGetter: (_: unknown, row: any) => {
                const value =
                    row?.combinedCoreDict?.core_data_certified_gross_sales
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

    if (configColumns.revisions) {
        columns.push({
            field: 'revisions',
            headerName: t('common.revisions'),
            width: 150,
            type: 'number',
            valueGetter: (_blank, row) => {
                return row?.formData?.revisionsCount || 0;
            },
        });
    }

    if (configColumns.lastEntryDate) {
        // @TODO FIX THIS
        columns.push({
            flex: 1,
            field: 'lastEntry',
            headerName: t('common.last_entry'),
            valueGetter: (_blank, row) => {
                return row?.formData?.updatedAt;
            },
            renderCell: ({ value }) => {
                if (!value) return '';

                return DateTime.fromISO(value).toLocaleString(
                    DateTime.DATETIME_SHORT
                );
            },
        });
    }

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

    const findValueOf = (
        key: string,
        name: string,
        array: []
    ): string | undefined => {
        if (!array) return undefined;
        // @ts-expect-error this
        const obj = array.find((item) => item.name === name);
        // If the object is found, return the value of the specified key
        return obj ? obj[key] : undefined;
    };
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
            renderCell: ({ row, value }) => {
                if (value === 'attachment' || value === 'multi-attachment') {
                    return renderAttachmentCell(row);
                }
                return value;
            },
            valueGetter: (_, row) => {
                const saleValue =
                    row?.formData?.salesData && row?.formData?.salesData[key];
                if (!saleValue) {
                    return undefined;
                }
                const saleType = findValueOf('type', key, row.customFormFields);

                switch (saleType) {
                    case 'number':
                        return parseFloat(saleValue);
                    case 'attachment':
                    case 'multi-attachment':
                        return saleType;

                    default:
                        return saleValue;
                }
            },
        });
    });

    columns.push({
        field: 'attachments',
        headerName: t('common.attachments'),
        flex: 1,
        valueGetter: (_, row) => {
            return numberOfAttachments(row);
        },
        renderCell: ({ row }) => renderAttachmentCell(row),
    });

    return [...columns];
};

export default detailPanelColumnDef;
