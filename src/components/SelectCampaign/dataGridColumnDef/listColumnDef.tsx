import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-pro';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { TFunction } from 'i18next';
import { DateTime } from 'luxon';

interface ListColumnDefProps {
    toggle: boolean;
    handleToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedRow: (rowId: RowData) => void;
    t: TFunction;
    centreList: any[];
    portfolioCampaigns: any[];
}

const ListColumnDef = ({
    t,
    centreList,
    portfolioCampaigns,
}: ListColumnDefProps): GridColDef[] => {
    return [
        {
            field: 'centre',
            headerName: t('common.centre'),
            flex: 2,
            sortable: true,
            renderCell: ({ value }) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {value}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_value, row) => {
                const centreId = row?.relationships.centre.data.id;
                const centre = centreList?.find((c) => c.id === centreId);
                return centre?.attributes?.name;
            },
        },
        {
            field: 'campaign',
            headerName: t('common.campaign'),
            flex: 2,
            renderCell: ({ value }) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {value}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_value, row) => {
                return row?.attributes?.name;
            },
        },
        {
            field: 'portfolio_campaign',
            headerName: t('common.portfolio_campaign'),
            flex: 2,
            renderCell: ({ value }) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {value}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_value, row) => {
                const portfolioCampaignId =
                    row?.relationships?.portfolioCampaign?.data?.id;
                const portfolioCampaign = portfolioCampaigns?.find(
                    (c) => c.id === portfolioCampaignId
                );
                return portfolioCampaign?.attributes?.name;
            },
        },
        {
            field: 'start_date',
            headerName: t('common.start_date'),
            flex: 1,
            renderCell: ({ value }) => {
                const startDate = DateTime.fromISO(value).toLocaleString(
                    DateTime.DATE_SHORT
                );

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {startDate}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_value, row) => {
                return row?.attributes?.scheduleStartDate;
            },
        },
        {
            field: 'end_date',
            headerName: t('common.end_date'),
            flex: 1,
            renderCell: ({ value }) => {
                const endDate = DateTime.fromISO(value).toLocaleString(
                    DateTime.DATE_SHORT
                );

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" color="text.primary">
                            {endDate}
                        </Typography>
                    </Box>
                );
            },
            valueGetter: (_value, row) => {
                return row?.attributes?.scheduleEndDate;
            },
        },
        {
            field: 'selectIcon',
            headerName: '',
            width: 80,
            renderCell: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        height: '100%',
                    }}
                >
                    <ChevronRightIcon
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    />
                </Box>
            ),
        },
    ];
};

export default ListColumnDef;
