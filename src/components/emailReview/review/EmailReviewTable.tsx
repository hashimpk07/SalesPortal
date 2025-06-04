import React, { useEffect, useState } from 'react';
import {
    DataGridPro,
    type GridColDef,
    GridFilterModel,
    GridLogicOperator,
    type GridRowId,
    type GridValidRowModel,
} from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import type { TFunction } from 'i18next';
import { DateTime } from 'luxon';
import useEmailSubmissionsReview from '../../../store/emailSubmissionsReview.ts';

const EmailReviewTableColumns = (
    t: TFunction,
    handleEmailImport: (id: number) => void,
    centres: any,
    stores: any,
    periodForms: any,
    campaigns: any
) =>
    [
        {
            field: 'submission_date',
            headerName: t('email_pending.submission_date'),
            flex: 1,
            valueGetter: (_params, row) => {
                return DateTime.fromSQL(
                    row?.attributes?.submittedDate
                ).toLocaleString(DateTime.DATETIME_MED);
            },
        },
        {
            field: 'transaction_date',
            headerName: t('email_pending.transaction_date'),
            flex: 1,
            valueGetter: (_params, row) => {
                return DateTime.fromSQL(
                    row?.attributes?.transactionDate
                ).toLocaleString(DateTime.DATETIME_MED);
            },
        },
        {
            field: 'centre',
            headerName: t('common.centre'),
            flex: 2,
            valueGetter: (_params, row) => {
                return parseInt(row?.relationships?.centre?.data?.id, 10);
            },
            renderCell: (params) => {
                return (
                    centres[params?.row?.relationships?.centre?.data?.id]
                        ?.name || ''
                );
            },
        },
        {
            field: 'store',
            headerName: t('common.store'),
            flex: 1,
            valueGetter: (_params, row) => {
                return row?.relationships?.local?.data?.id || 0;
            },
            renderCell: (params) => {
                return (
                    stores[params?.row?.relationships?.local?.data?.id]?.name ||
                    ''
                );
            },
        },
        {
            field: 'campaign',
            headerName: t('common.campaign'),
            flex: 1,
            valueGetter: (_params, row) => {
                const findPeriod =
                    periodForms[row?.relationships?.periodForm?.data?.id];

                if (!findPeriod) return 0;

                return findPeriod?.relationships?.campaign?.data?.id || 0;
            },
            renderCell: (params) => {
                if (params?.formattedValue === 0) return '';

                return campaigns[params?.formattedValue]?.name || '';
            },
        },
        {
            field: 'period',
            headerName: t('common.period'),
            flex: 1,
            valueGetter: (_params, row) => {
                return row?.relationships?.periodForm?.data?.id || 0;
            },
            renderCell: (params) => {
                return (
                    periodForms[
                        params?.row?.relationships?.periodForm?.data?.id
                    ]?.name || ''
                );
            },
        },
        {
            field: 'sales_gross',
            headerName: t('common.sales_gross'),
            flex: 1,
            renderCell: ({ value, row }) => {
                const currency = row?.attributes?.currency;
                if (!value) {
                    return '';
                }
                return `${currency ? currency : ''}${parseFloat(value)?.toLocaleString(navigator.language)}`;
            },
            valueGetter: (_params, row) => {
                return row?.attributes?.grossSales;
            },
        },
        {
            field: 'import',
            headerName: t('common.import'),
            flex: 1,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => handleEmailImport(params.id as number)}
                        variant="contained"
                        disabled={
                            !params?.row?.relationships?.periodForm?.data?.id ||
                            !params?.row?.relationships?.local?.data?.id
                        }
                    >
                        Import
                    </Button>
                );
            },
        },
    ] as readonly GridColDef[];

interface EmailReviewTableProps {
    rows: GridValidRowModel[];
    handleEmailImport: (a: number) => void;
    inReviewEmailsSelected: readonly GridRowId[];
    setInReviewEmailsSelected: (ids: readonly GridRowId[]) => void;
    setViewingEmail: (email: any) => void;
    centres: any;
    stores: any;
    periodForms: any;
    campaigns: any;
    loading: boolean;
}

const EmailReviewTable: React.FC<EmailReviewTableProps> = ({
    rows,
    handleEmailImport,
    inReviewEmailsSelected,
    setInReviewEmailsSelected,
    setViewingEmail,
    centres,
    stores,
    periodForms,
    campaigns,
    loading,
}) => {
    const { t } = useTranslation();
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        logicOperator: GridLogicOperator.And,
        items: [],
    });

    const { centre, store, campaign, period } = useEmailSubmissionsReview();

    useEffect(() => {
        const filterModel: GridFilterModel = {
            logicOperator: GridLogicOperator.And,
            items: [],
        };

        if (centre) {
            filterModel.items.push({
                id: 'centre',
                field: 'centre',
                operator: 'equals',
                value: centre,
            });
        }

        if (store) {
            filterModel.items.push({
                id: 'store',
                field: 'store',
                operator: 'equals',
                value: store,
            });
        }

        if (campaign) {
            filterModel.items.push({
                id: 'campaign',
                field: 'campaign',
                operator: 'equals',
                value: campaign,
            });
        }

        if (period) {
            filterModel.items.push({
                id: 'period',
                field: 'period',
                operator: 'equals',
                value: period,
            });
        }

        setFilterModel(filterModel);
    }, [centre, store, campaign, period]);

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', minHeight: 160 }}
        >
            <DataGridPro
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer',
                    },
                }}
                rowSelectionModel={inReviewEmailsSelected}
                onRowSelectionModelChange={(selected) => {
                    if (inReviewEmailsSelected) {
                        setInReviewEmailsSelected(selected);
                    }
                }}
                onCellClick={(e) => {
                    if (e.field === 'import') return;
                    setViewingEmail(e);
                }}
                disableRowSelectionOnClick
                rows={rows}
                columns={EmailReviewTableColumns(
                    t,
                    handleEmailImport,
                    centres,
                    stores,
                    periodForms,
                    campaigns
                )}
                filterModel={filterModel}
                initialState={{
                    filter: {
                        filterModel: filterModel,
                    },
                }}
                slotProps={{
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton',
                    },
                }}
                loading={loading}
            />
        </div>
    );
};

export default EmailReviewTable;
