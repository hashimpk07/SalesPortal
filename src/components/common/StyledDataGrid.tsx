import { styled } from '@mui/material/styles';
import { DataGridPro } from '@mui/x-data-grid-pro';

const StyledDataGrid = styled(DataGridPro)({
    '& .even-row': {
        backgroundColor: '#fbfbfb',
    },
    '& .odd-row': {
        backgroundColor: '#ffffff',
    },
    ' .MuiDataGrid-footerContainer, .MuiDataGrid-columnHeaderTitleContainer': {
        backgroundColor: 'white',
    },
    // pointer cursor on ALL rows
    '& .MuiDataGrid-row:hover': {
        cursor: 'pointer',
    },
});

export default StyledDataGrid;
