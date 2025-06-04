import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
// eslint-disable-next-line import/named
import { TFunction } from 'i18next';
import clsx from 'clsx';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const uploadDataColDefs: (
    t: TFunction,
    csvHeaders: any[],
    handleDelete: (id: any) => void
) => GridColDef[] = (_, csvHeaders, handleDelete) => {
    const columns: GridColDef[] = [];
    csvHeaders.forEach((header) => {
        if (
            header.toLowerCase() === 'valid' ||
            header.toLowerCase() === 'ref'
        ) {
            return;
        }
        columns.push({
            field: header,
            headerName: header,
            cellClassName: (params) => {
                const { Valid } = params.row;
                const hasError = Valid.find(
                    (e: { field: any; valid: any }) =>
                        e.field === header && !e.valid
                );

                return clsx('super-app', {
                    negative: !!hasError,
                });
            },
            valueGetter: (data: any) => {
                return data;
            },
        });
    });

    columns.push({
        field: 'delete',
        headerName: '',
        renderCell: (params) => {
            return (
                <IconButton onClick={() => handleDelete(params)}>
                    <DeleteIcon />
                </IconButton>
            );
        },
    });

    return columns;
};

export default uploadDataColDefs;
