import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PrimaryTableColumnsInterface } from '../../../../store/liveCampaignTableConfigStore.ts';
import createGroupedColumns from '../../dataGridColumnDef/groupedColumnDef.tsx';
import StyledDataGrid from '../../../common/StyledDataGrid.tsx';
import useMainStore from '../../../../store';

interface ConfigDemoTableInterface {
    liveCampaignShallowCopy: PrimaryTableColumnsInterface;
}

const PrimaryTableConfigDemoTable: React.FC<ConfigDemoTableInterface> = ({
    liveCampaignShallowCopy,
}) => {
    const { dynamicSalesCols, coreDataMapping } = useMainStore();
    const { t } = useTranslation();
    const columns = createGroupedColumns(
        false,
        () => { },
        liveCampaignShallowCopy,
        t,
        coreDataMapping
    );
    let fakeRowData = [
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
            coreSalesDict: {
                core_data_gross_sales: {
                    value: 111111,
                },
                core_data_net_sales: {
                    value: 222222,
                },
                core_data_number_transactions: {
                    value: 3333,
                },
                core_data_certified_net_sales: {
                    value: 44444,
                },
                core_data_certified_gross_sales: {
                    value: 55555,
                },
            },
            sales: {
                sales_in_store: 953,
                sales_online: 100,
                estimatedSales: 1121,
                returns: 10,
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
            salesValues: {},
        },
    ];

    const generateDynamicConfigSales = (dynamicCols: DynamicSalesCols[]) => {
        const salesValues: Record<string, string> = {};

        dynamicCols.forEach((col) => {
            if (col.field) {
                salesValues[col.field] = col.example || '';
            }
        });

        return salesValues;
    };

    fakeRowData = fakeRowData.map((row) => ({
        ...row,
        salesValues: generateDynamicConfigSales(dynamicSalesCols),
    }));

    return (
        <Box
            sx={{
                p: 2,
                mt: 2,
                background: '#f2f2f2',
            }}
        >
            <StyledDataGrid
                rows={fakeRowData}
                columns={columns}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0
                        ? 'even-row'
                        : 'odd-row'
                }
                disableColumnSelector
            />
        </Box>
    );
};

export default PrimaryTableConfigDemoTable;
