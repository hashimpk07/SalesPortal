import { Box, Switch, Tooltip, Typography } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { GridColDef } from '@mui/x-data-grid-pro';
import { DateTime } from 'luxon';
import {
    AddSalesDataButton,
    EditSalesDataButton,
} from '../../common/ActionButtons';
import useStore from '../../../store';
import {
    renderAttachmentCell,
    numberOfAttachments,
} from './renderAttachmentCell.tsx';

const ListColumnDef = ({
    toggle,
    handleToggleChange,
    setFormIsOpen,
    t,
    hasEstimates = false,
}: ListColumnDefProps): GridColDef[] => {
    const { setSelectedRow } = useStore();

    return [
        {
            field: 'edit',
            headerName: t('common.edit'),
            width: 60,
            sortable: false,
            disableColumnMenu: true,
            renderCell: ({ row }: { row: RowData }) => {
                const keyField = row?.formData?.keyField;
                const salesData = row?.formData?.salesData;
                const hasSalesData =
                    salesData?.[keyField as keyof typeof salesData];

                return hasSalesData ? (
                    <EditSalesDataButton
                        tooltipText={t('live_campaign.add_revision')}
                        handleClick={() => {
                            setFormIsOpen(true, row);
                            if (!row?.id) {
                                throw new Error('Row id is missing');
                            }

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
            field: 'store',
            headerName: t('common.store'),
            flex: 2,
            renderCell: (params) => {
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
                            {params?.row?.local?.attributes?.name}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_, row) => {
                return row?.local?.name;
            },
        },
        {
            field: 'periodForm',
            headerName: t('common.period'),
            width: 160,
            renderCell: ({ row }) => {
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
                            {row.periodName}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_, row) => {
                return row?.periodNumber;
            },
        },
        {
            field: 'estimated',
            sortable: false,
            disableColumnMenu: true,
            headerName: '',
            headerAlign: 'center',
            align: 'center',
            width: 70,
            valueGetter: (_, row) => {
                return (
                    row?.archive?.campaignData?.attributes?.isEstimate || false
                );
            },
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
            renderCell: ({ value }) => (
                <Tooltip
                    title={
                        value
                            ? t('live_campaign.this_total_includes_estimates')
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
            ),
        },
        {
            field: 'sales',
            headerName: t('common.sales'),
            flex: 2,
            renderCell: ({ value, row }) => {
                let currencyValue;

                if (value) {
                    currencyValue = `
                    ${row?.currencySymbol}${(
                        parseFloat(value) || 0
                    ).toLocaleString(
                        row?.locale || navigator.language || 'en-GB',
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}`;
                }

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
                            {value ? currencyValue : ''}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_, row) => {
                const keyField = row?.formData?.keyField;
                return row?.formData?.salesData?.[keyField];
            },
        },
        {
            field: 'mandatorySubmission',
            headerName: 'mandatorySubmission',
            width: 100,
        },
        {
            field: 'revisions',
            headerName: t('common.revisions'),
            width: 80,
            type: 'number',
            renderCell: ({ value }) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        height: '100%',
                    }}
                >
                    {value}
                </Box>
            ),
            valueGetter: (_, row) => {
                return row?.formData?.revisionsCount || 0;
            },
        },
        {
            field: 'lastEntry',
            headerName: t('common.last_entry'),
            flex: 2,
            renderCell: ({ value }) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        height: '100%',
                    }}
                >
                    {value
                        ? DateTime.fromISO(value).toLocaleString(
                            DateTime.DATETIME_SHORT
                        )
                        : ''}
                </Box>
            ),
            valueGetter: (_, row) => {
                return row?.formData?.updatedAt;
            },
        },
        {
            field: 'attachments',
            headerName: t('common.attachments'),
            flex: 2,
            valueGetter: (_, row) => {
                return numberOfAttachments(row);
            },
            renderCell: ({ row }) => renderAttachmentCell(row),
        },
    ];
};

export default ListColumnDef;
