import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/named
import { DataGridProProps } from '@mui/x-data-grid-pro';
import {
    PrimaryTableColumnsInterface,
    SecondaryTableColumnsInterface,
} from '../../../../store/liveCampaignTableConfigStore.ts';
import createGroupedColumns from '../../dataGridColumnDef/groupedColumnDef.tsx';
import StyledDataGrid from '../../../common/StyledDataGrid.tsx';
import SecondaryTableConfigDemoSubTable from './SecondaryTableDemoSubTable.tsx';
import detailPanelColumnDef from '../../dataGridColumnDef/detailPanelColumnDef.tsx';
import useMainStore from '../../../../store';

interface ConfigDemoTableInterface {
    liveCampaignPrimaryShallowCopy: PrimaryTableColumnsInterface;
    liveCampaignSecondaryShallowCopy: SecondaryTableColumnsInterface;
}

const SecondaryTableConfigDemoTable: React.FC<ConfigDemoTableInterface> = ({
    liveCampaignPrimaryShallowCopy,
    liveCampaignSecondaryShallowCopy,
}) => {
    const { t } = useTranslation();
    const { coreDataMapping } = useMainStore();
    const columns = createGroupedColumns(
        false,
        () => { },
        liveCampaignPrimaryShallowCopy,
        t,
        coreDataMapping
    );

    const fakeParentRowData = [
        {
            id: 1,
            name: 'The Computer Store',
            unit: 'Unit #6544',
            leaseReferenceNumber: '5645822685',
            estimated: false,
            currencySymbol: '£',
            fraction: '2/8',
            progress: 13,
            totalSales: '1053.00',
            sales: {
                sales_in_store: 953,
                sales_online: 100,
                estimatedSales: 1121,
                returns: 10,
            },
            coreSalesDict: {
                core_data_gross_sales: {
                    value: 1111,
                },
                core_data_net_sales: {
                    value: 2222,
                },
                core_data_number_transactions: {
                    value: 3333,
                },
                core_data_certified_net_sales: {
                    value: 4444,
                },
                core_data_certified_gross_sales: {
                    value: 5555,
                },
            },
            lastPeriod: {
                scheduleStartDate: '2023-01-10',
                updatedAt: '2023-01-10',
            },
            revisions: 2,
            lastEntry: '2024-01-10 14:32',
            completedBy: 'Elainor',
            assignee: 'Steve',
            periodForm: [],
            totalRevisions: 5,
            totalToComplete: 10,
        },
    ];

    const secondaryColumns = detailPanelColumnDef({
        setFormIsOpen(): void { },
        setSelectedRow(): void { },
        t,
        configColumns: liveCampaignSecondaryShallowCopy,
        periodFormsDict: {},
        coreDataMapping,
    });

    const getDetailPanelContent = React.useCallback<
        NonNullable<DataGridProProps['getDetailPanelContent']>
    >(
        () => <SecondaryTableConfigDemoSubTable columns={secondaryColumns} />,
        [secondaryColumns]
    );

    const getDetailPanelHeight = React.useCallback<
        NonNullable<DataGridProProps['getDetailPanelHeight']>
    >(() => 'auto' as const, []);

    return (
        <Box
            sx={{
                p: 2,
                mt: 2,
                background: '#f2f2f2',
            }}
        >
            <StyledDataGrid
                rows={fakeParentRowData}
                columns={columns}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0
                        ? 'even-row'
                        : 'odd-row'
                }
                disableColumnSelector
                getDetailPanelHeight={getDetailPanelHeight}
                getDetailPanelContent={getDetailPanelContent}
                detailPanelExpandedRowIds={[1]}
            />
        </Box>
    );
};

export default SecondaryTableConfigDemoTable;
