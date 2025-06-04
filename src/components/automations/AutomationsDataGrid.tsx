import {
    // eslint-disable-next-line import/named
    GridColDef,
    // eslint-disable-next-line import/named
    GridFilterModel,
    GridLogicOperator,
} from '@mui/x-data-grid-pro';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import automationsGridColDefs from './AutomationsGridColDefs.tsx';
import StyledDataGrid from '../common/StyledDataGrid.tsx';
import useAutomationsStore, {
    AutomatedCompletedProps,
} from '../../store/automationsStore.ts';

interface AutomationsDataGridProps {
    loading: boolean;
    automations: any[];
    campaigns: any;
    centre: AutomatedCompletedProps;
    rowSelected: (a: unknown) => void;
}

const AutomationsDataGrid: React.FC<AutomationsDataGridProps> = ({
    loading,
    automations,
    centre,
    campaigns,
    rowSelected,
}) => {
    const { t } = useTranslation();
    const { status, as, campaign, search } = useAutomationsStore();
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        logicOperator: GridLogicOperator.And,
        items: [],
    });

    const [computedSearchAutomations, setComputedSearchAutomations] =
        useState<any>([]);

    useEffect(() => {
        const filterModel: GridFilterModel = {
            logicOperator: GridLogicOperator.And,
            items: [],
        };

        if (status) {
            filterModel.items.push({
                id: 'status',
                field: 'status',
                operator: 'equals',
                value: status,
            });
        }
        if (as) {
            filterModel.items.push({
                id: 'as',
                field: 'as',
                operator: 'equals',
                value: as,
            });
        }
        if (campaign) {
            filterModel.items.push({
                id: 'campaign',
                field: 'campaign',
                operator: 'equals',
                value: campaign.id,
            });
        }
        setFilterModel(filterModel);
    }, [status, as, campaign]);

    useEffect(() => {
        if (search && search.length) {
            const searched: React.SetStateAction<any[]> = [];

            automations.forEach((e) => {
                if (
                    e.attributes.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ) {
                    searched.push(e);
                }
            });
            // @TODO GET THIS TO SEARCH CAMPAIGN
            setComputedSearchAutomations(searched);
        } else {
            setComputedSearchAutomations(automations);
        }
    }, [search, automations]);

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', minHeight: 160 }}
        >
            <StyledDataGrid
                sx={{ '& > *': { borderBottom: 'unset' }, maxWidth: '100%' }}
                columns={
                    automationsGridColDefs(t, centre, campaigns) as GridColDef[]
                }
                rows={computedSearchAutomations}
                loading={loading}
                slotProps={{
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton',
                    },
                }}
                onRowSelectionModelChange={(a) => {
                    rowSelected(a);
                }}
                disableMultipleRowSelection
                filterModel={filterModel}
                initialState={{
                    filter: {
                        filterModel: filterModel,
                    },
                }}
                disableColumnFilter
            />
        </div>
    );
};

            export default AutomationsDataGrid;
