import { Box, Typography } from '@mui/material';
import { DataGridPro, GridRowId } from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import { chaseSubTableColumns } from './ChaseTablesColumns.tsx';

interface StoreRows {
    row: StoresProps;
    contactsClick: (params: ContactProps[]) => void;
    chaseCentresSelected?: readonly GridRowId[];
    setChaseCentresSelected?: (data: readonly GridRowId[]) => void;
}

export default function ChaseSubtable({
    row,
    contactsClick,
    chaseCentresSelected,
    setChaseCentresSelected,
}: StoreRows) {
    const { t } = useTranslation();

    if (!row.stores || row.stores.length === 0) {
        return (
            <Box sx={{ mb: 4, ml: 8, pt: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                    {t('common.no_stores_found')}
                </Typography>
            </Box>
        );
    }

    return (
        <DataGridPro
            rowSelectionModel={chaseCentresSelected}
            keepNonExistentRowsSelected
            checkboxSelection={typeof setChaseCentresSelected !== null}
            autoHeight
            onRowSelectionModelChange={(selected) => {
                if (setChaseCentresSelected) {
                    setChaseCentresSelected(selected);
                }
            }}
            rows={row.stores}
            columns={chaseSubTableColumns((a) => {
                contactsClick(a);
            }, t)}
        />
    );
}
