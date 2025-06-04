import React from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import StyledDataGrid from '../../../common/StyledDataGrid.tsx';

interface Props {
    columns: GridColDef[];
}

const SecondaryTableConfigDemoSubTable: React.FC<Props> = ({ columns }) => {
    const fakeData = [
        {
            id: 8,
            periodNumber: '8',
            store: 'Hollister',
            estimated: false,
            periodForm: 'Month 8',
            sales: 58000.0,
            currencySymbol: '£',
            revisions: 2,
            lastEntry: '2024-08-20 12:22',
            pushData: 'sync',
            campaignName: 'Monthly 3',
            mandatory: true,
            createdByUser: {
                name: 'Bill Cypher',
            },
            combinedCoreDict: {
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
            salesData: {
                estimated: {
                    salesEstimation: 60000.0,
                },
                actual: {
                    netSalesInStore: 57000.0,
                    netSalesOnline: 1000.0,
                    returns: 3.0,
                    monthlyNetTotal: 58000.0,
                    salesComment: 'New product launches boosted store sales',
                },
                activity: [],
            },
            formData: {
                updatedAt: '2023-01-10',
                revisionsCount: 2,
                keyField: 'sales',
                salesData: {
                    sales: '1053.00',
                    sales_in_store: 953,
                    sales_online: 100,
                    estimatedSales: 1121,
                    returns: 10,

                    coreDataGrossSales: 11111,
                    coreDataNetSales: 222222,
                    coreDataNumberTransactions: 3333,
                    coreDataCertifiedNetSales: 44444,
                    coreDataCertifiedGrossSales: 55555,
                },
            },
        },
    ];
    return <StyledDataGrid rows={fakeData} columns={columns} />;
};
export default SecondaryTableConfigDemoSubTable;
