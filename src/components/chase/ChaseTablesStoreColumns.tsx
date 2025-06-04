import { GridColDef } from '@mui/x-data-grid-pro';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import type { TFunction } from 'i18next';
import BorderLinearProgress from '../DataGrid/styled/BorderLinearProgress.tsx';

const chaseTablesColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Centre',
        flex: 1,
    },
    {
        field: 'number_of_stores_to_provide',
        headerName: '# of stores to provide',
        width: 150,
    },
    {
        field: 'number_provided_so_far',
        headerName: '# provided so far',
        width: 150,
    },
    {
        field: 'number_yet_to_provide',
        headerName: '# yet to provide',
        width: 150,
    },
    {
        field: 'progress',
        headerName: 'Progress',
        width: 150,
        flex: 2,
        renderCell: (params) => (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
                key={params.id}
            >
                <Box sx={{ minWidth: 35 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >{`${Math.round(params.value)}%`}</Typography>
                </Box>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <BorderLinearProgress
                        variant="determinate"
                        value={params.value}
                    />
                </Box>
            </Box>
        ),
    },
];

const chaseSubTableColumns = (
    contactsClick: (params: ContactProps[]) => void,
    t: TFunction
) =>
    [
        {
            field: 'name',
            headerName: t('common.store'),
            flex: 2,
        },
        {
            field: 'contacts',
            headerName: t('common.contacts'),
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box
                        onClick={() => contactsClick(params.value)}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            height: '100%',
                            alignItems: 'center',
                        }}
                    >
                        {params.value.map((contact: ContactProps) => (
                            <Avatar
                                alt={contact.name}
                                src={contact.avatar || 'fail'}
                            />
                        ))}
                    </Box>
                );
            },
        },
        {
            field: 'completed_by',
            headerName: t('common.completed_by'),
            flex: 1,
            renderCell: (params) => {
                if (!params.value) {
                    return <div />;
                }

                return (
                    <Box
                        onClick={() => contactsClick([params.value])}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            height: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt={params.value.name}
                            src={params.value.avatar || 'fail'}
                        />{' '}
                        {params.value.name}
                    </Box>
                );
            },
        },
        {
            field: 'completed_on',
            headerName: t('common.completed_on'),
            flex: 1,
        },
        {
            field: 'status',
            headerName: t('common.filter_header.status'),
            flex: 1,
            renderCell: (params) => {
                if (params.value.progress) {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <Box sx={{ minWidth: 35 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >{`${Math.round(
                                    params.value.progress
                                )}%`}</Typography>
                            </Box>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <BorderLinearProgress
                                    variant="determinate"
                                    value={params.value.progress}
                                />
                            </Box>
                        </Box>
                    );
                }

                return (
                    <Chip
                        label={params.value.text}
                        color={params.value.color}
                    />
                );
            },
        },
    ] as GridColDef[];

export { chaseTablesColumns, chaseSubTableColumns };
