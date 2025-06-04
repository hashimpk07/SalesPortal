/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import {
    DataGridPro,
    GridColDef,
    GridFilterModel,
    GridLogicOperator,
    GridRowId,
} from '@mui/x-data-grid-pro';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WarningIcon from '@mui/icons-material/Warning';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import useEmailSubmissionsPending from '../../../store/emailSubmissionsPending.ts';

const emailPendingTableColumns = (t: any, centres: any) =>
    [
        {
            field: 'submission_date',
            headerName: t('email_pending.submission_date'),
            width: 175,
            valueGetter: (_params, row) => {
                if (!row?.attributes?.submittedDate) {
                    return '';
                }

                return DateTime.fromSQL(
                    row?.attributes?.submittedDate
                ).toLocaleString(DateTime.DATETIME_MED);
            },
        },
        {
            field: 'centre_name',
            headerName: t('common.centre'),
            flex: 2,
            valueGetter: (_params, row) => {
                return centres[row?.relationships?.centre?.data?.id]?.id || '';
            },
            renderCell: (params) => {
                return (
                    centres[params?.row?.relationships?.centre?.data?.id]
                        ?.name || ''
                );
            },
        },
        {
            field: 'gross_sales',
            headerName: t('common.gross_sales'),
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
            field: 'net_sales',
            headerName: t('common.net_sales'),
            flex: 1,
            renderCell: ({ value, row }) => {
                const currency = row?.attributes?.currency;
                if (!value) {
                    return '';
                }

                return `${currency ? currency : ''}${parseFloat(value)?.toLocaleString(navigator.language)}`;
            },
            valueGetter: (_params, row) => {
                return row?.attributes?.netSales;
            },
        },
        {
            field: 'number_of_transactions',
            headerName: t('common.number_of_transactions'),
            flex: 1,
            valueGetter: (_params, row) => {
                return row?.attributes?.numberOfTransactions ?? '';
            },
        },
        {
            field: 'validation_status',
            headerName: t('email_pending.validation_status'),
            flex: 1,
            valueGetter: (_params, row) => {
                return ['draft', 'approved'].includes(row.status)
                    ? 'invalid'
                    : 'valid';
            },
            renderCell: ({ row }) => {
                const status = row?.attributes?.approvalStatus;

                if (['draft', 'approved'].includes(status)) {
                    return (
                        <Chip
                            icon={<CheckBoxIcon />}
                            sx={{
                                '.MuiChip-label': {
                                    paddingLeft: 0,
                                },
                            }}
                            color="primary"
                        />
                    );
                }

                return (
                    <Chip
                        icon={<WarningIcon />}
                        sx={{
                            '.MuiChip-label': {
                                paddingLeft: 0,
                            },
                        }}
                        color="error"
                    />
                );
            },
        },
        {
            field: 'approval_status',
            headerName: t('email_pending.review_status'),
            flex: 2,
            valueGetter: (_params, row) => {
                return row?.attributes?.approvalStatus || '';
            },
            renderCell: ({ row }) => {
                const code: { [key: string | number]: string } = {
                    approved: 'success',
                    rejected: 'error',
                    draft: 'default',
                    unknown: 'warning',
                };

                const chipColor =
                    code[row?.attributes?.approvalStatus || 'unknown'];

                return (
                    <Chip
                        label={t(
                            'email_pending.status.' +
                                row?.attributes?.approvalStatus
                        )}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        color={chipColor || 'default'}
                    />
                );
            },
        },
    ] as readonly GridColDef[];

interface EmailPendingTableProps {
    rows: unknown[];
    setSelectedEmailReview: (id: number | void) => void;
    pendingEmailSelected: readonly GridRowId[];
    setPendingEmailSelected: (columns: readonly GridRowId[]) => void;
    centres: any;
    loading: boolean;
}

const EmailPendingTable: React.FC<EmailPendingTableProps> = ({
    rows,
    setSelectedEmailReview,
    pendingEmailSelected,
    setPendingEmailSelected,
    centres,
    loading,
}) => {
    const { t } = useTranslation();
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        logicOperator: GridLogicOperator.And,
        items: [],
    });

    const {
        // accessLevel,
        centre,
        validationStatus,
        reviewStatus,
    } = useEmailSubmissionsPending();

    useEffect(() => {
        const filterModel: GridFilterModel = {
            logicOperator: GridLogicOperator.And,
            items: [],
        };

        if (centre) {
            filterModel.items.push({
                id: 'centre',
                field: 'status',
                operator: 'equals',
                value: centre,
            });
        }
        if (validationStatus) {
            filterModel.items.push({
                id: 'validationStatus',
                field: 'validation_status',
                operator: 'equals',
                value: validationStatus,
            });
        }
        if (reviewStatus) {
            filterModel.items.push({
                id: 'reviewStatus',
                field: 'approval_status',
                operator: 'equals',
                value: reviewStatus,
            });
        }
        setFilterModel(filterModel);
    }, [centre, validationStatus, reviewStatus]);

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', minHeight: 160 }}
        >
            <DataGridPro
                localeText={{
                    noRowsLabel: t(
                        'email_review.you_have_no_pending_submissions_please_check_the_review_section_to_import_your_data'
                    ),
                }}
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer',
                    },
                }}
                rowSelectionModel={pendingEmailSelected}
                keepNonExistentRowsSelected
                onRowSelectionModelChange={(selected) => {
                    if (pendingEmailSelected) {
                        setPendingEmailSelected(selected);
                    }
                }}
                disableRowSelectionOnClick
                rows={rows as any}
                columns={emailPendingTableColumns(t, centres)}
                onCellClick={(e) => {
                    if (e.field !== '__check__') {
                        setSelectedEmailReview(e.row.id as number);
                    }
                }}
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

export default EmailPendingTable;
