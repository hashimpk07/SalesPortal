import React from 'react';
import {
    DataGridPro,
    type DataGridProProps,
    type GridColDef,
} from '@mui/x-data-grid-pro';
import { Paper, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TIMEFRAMED_DATA_GROUP } from '@/constants/index.ts';
import detailPanelColumnDef from './dataGridColumnDef/detailPanelColumnDef';
import useLiveCampaignTableConfigStore from '../../store/liveCampaignTableConfigStore.ts';
import useStore from '../../store';
import { Periods } from './ViewControls.tsx';
import createTimeframedDetailsColumns from './dataGridColumnDef/timeframedDetailsColumnDef.tsx';

interface DetailPanelContentProps {
    row: RowData;
    activeView: Periods;
    useEstimations: boolean;
    setFormIsOpen: (isOpen: boolean) => void;
    setSelectedRow: (selectedRow: RowData) => void | undefined;
    filterModel: DataGridProProps['filterModel'];
}

const DetailPanelContent: React.FC<DetailPanelContentProps> = ({
    activeView,
    row,
    setFormIsOpen,
    setSelectedRow,
    filterModel,
}) => {
    const { t } = useTranslation();
    const { configColumnsSecondaryTable, configColumnsPrimaryTable } =
        useLiveCampaignTableConfigStore();
    const { periodFormsDict, coreDataMapping } = useStore();

    const createColumns = () => {
        if (TIMEFRAMED_DATA_GROUP.includes(activeView)) {
            const configColumns = {
                ...configColumnsSecondaryTable,
                ...configColumnsPrimaryTable,
            };

            return createTimeframedDetailsColumns(
                configColumns,
                t,
                coreDataMapping
            );
        }
        return detailPanelColumnDef({
            setFormIsOpen,
            setSelectedRow,
            t,
            configColumns: configColumnsSecondaryTable,
            periodFormsDict,
            coreDataMapping,
            showEstimations: configColumnsPrimaryTable.showIncludeEstimations,
        });
    };

    const columns = createColumns();

    const initialState = {
        pagination: {
            paginationModel: {
                pageSize: 10,
            },
        },
        columns: {
            columnVisibilityModel: {
                mandatorySubmission: false,
            },
        },
    };

    return (
        <Stack
            sx={{
                py: 2,
                height: 1,
                boxSizing: 'border-box',
            }}
            direction="column"
        >
            <Paper sx={{ p: 2 }}>
                <DataGridPro
                    //@ts-expect-error this
                    rows={row?.entries || row?.totals?.periodBreakdown}
                    columns={columns as GridColDef[]}
                    disableRowSelectionOnClick
                    filterModel={filterModel ? filterModel : { items: [] }}
                    disableColumnFilter
                    initialState={initialState}
                />
            </Paper>
        </Stack>
    );
};

export default DetailPanelContent;
