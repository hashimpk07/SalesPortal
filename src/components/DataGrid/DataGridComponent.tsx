/* eslint-disable import/named */
import {
    GridRowsProp,
    GridColDef,
    DataGridProProps,
    GridRowId,
    GridRowParams,
    GridRowClassNameParams,
    GridValidRowModel,
    GridSlotProps,
    GridRowSelectionModel,
} from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import StyledDataGrid from '../common/StyledDataGrid';
import { LIST, TIMEFRAMED_DATA_GROUP } from '../../constants';
import { Periods } from '../LiveCampaigns/ViewControls';

interface DataGridComponentProps {
    onRowClick?: (row: GridRowParams) => void;
    expandedRowIds: GridRowId[];
    setExpandedRowIds: (ids: GridRowId[]) => void;
    getDetailPanelContent: DataGridProProps['getDetailPanelContent'];
    getDetailPanelHeight: DataGridProProps['getDetailPanelHeight'];
    activeView: Periods;
    campaignDataForCentre: GridRowsProp;
    campaignDataAgg?: GridRowsProp;
    campaignTimeframedData?: GridRowsProp;
    selectedCentre?: CentreProps;
    selectedCampaign?: CampaignProps;
    nestedColumns?: GridColDef[];
    listColumns: GridColDef[];
    timeframedColumns: GridColDef[];
    isLoading: boolean;
    checkboxSelection?: boolean;
    filterModel?: DataGridProProps['filterModel'];
    setRowSelectionModel?: (model: GridRowSelectionModel) => void;
}

const DataGridComponent = ({
    onRowClick,
    expandedRowIds,
    setExpandedRowIds,
    getDetailPanelContent,
    getDetailPanelHeight,
    activeView,
    campaignDataForCentre,
    campaignDataAgg,
    campaignTimeframedData,
    nestedColumns,
    timeframedColumns,
    listColumns,
    isLoading,
    checkboxSelection,
    filterModel,
    setRowSelectionModel,
}: DataGridComponentProps) => {
    const { t } = useTranslation();

    if (!campaignDataForCentre && !campaignDataAgg) {
        return <div>{t('common.loading')}...</div>;
    }

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

    // @ts-expect-error this
    const slotProps: GridSlotProps = {
        loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
        },
    };

    const handleRowClick = (params: GridRowParams) => {
        if (onRowClick) onRowClick(params);
    };

    const getRowClassName = (
        params: GridRowClassNameParams<GridValidRowModel>
    ) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row');

    const handleRowSelectionModelChange = (
        newRowSelectionModel: GridRowSelectionModel
    ) => {
        if (!setRowSelectionModel) return;

        const formattedModel = newRowSelectionModel.map((id) => {
            if (typeof id === 'string' && id.includes('-')) {
                return id.split('-')[1];
            }
            return id;
        });

        setRowSelectionModel(formattedModel);
    };

    const commonProps = {
        sx: {
            '& .MuiDataGrid-row:hover': {
                cursor: checkboxSelection ? 'pointer' : 'unset',
            },
        },
        autoHeight: true,
        pagination: true,
        loading: isLoading,
        initialState,
        getRowClassName,
        slotProps,
        filterModel: filterModel || { items: [] },
        disableColumnFilter: true,
        disableRowSelectionOnClick: true,
        disableColumnSelector: true,
        pageSizeOptions: [5, 10, 25, 50],
        onRowClick: handleRowClick,
        onRowSelectionModelChange: handleRowSelectionModelChange,
    };

    if (activeView === LIST) {
        return (
            <StyledDataGrid
                {...commonProps}
                rows={campaignDataForCentre}
                columns={listColumns}
                checkboxSelection={checkboxSelection}
            />
        );
    }

    if (TIMEFRAMED_DATA_GROUP.includes(activeView)) {
        return (
            <StyledDataGrid
                {...commonProps}
                rows={campaignTimeframedData}
                columns={timeframedColumns || []}
                checkboxSelection={false}
                getDetailPanelContent={getDetailPanelContent}
                getDetailPanelHeight={getDetailPanelHeight}
                detailPanelExpandedRowIds={expandedRowIds}
                onDetailPanelExpandedRowIdsChange={setExpandedRowIds}
            />
        );
    }

    return (
        <StyledDataGrid
            {...commonProps}
            rows={campaignDataAgg}
            columns={nestedColumns || []}
            checkboxSelection={true}
            getDetailPanelContent={getDetailPanelContent}
            getDetailPanelHeight={getDetailPanelHeight}
            detailPanelExpandedRowIds={expandedRowIds}
            onDetailPanelExpandedRowIdsChange={setExpandedRowIds}
        />
    );
};

export default DataGridComponent;
