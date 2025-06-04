import { useState, MouseEvent } from 'react';
// eslint-disable-next-line import/named
import { GridColDef } from '@mui/x-data-grid-pro';
import {
    Avatar,
    Box,
    Chip,
    Typography,
    Popover,
    IconButton,
    AvatarGroup,
    Dialog,
    DialogTitle,
    List,
} from '@mui/material';
import CopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import StyledDataGrid from '../common/StyledDataGrid.tsx';

interface ChaseSubTableColumnsProps {
    contactsClick: (params: any[]) => void;
    t: any;
    localsData: any[];
    setChaseCentresSelected: any;
    sortFilters: any[];
    showChaseStoreSheet: (e: any) => void;
    loading: boolean;
}

const ChaseSubTable = ({
    contactsClick,
    t,
    localsData,
    setChaseCentresSelected,
    sortFilters,
    showChaseStoreSheet,
    loading,
}: ChaseSubTableColumnsProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [hoveredContact, setHoveredContact] = useState<any | null>(null);
    const [showChaseContacts, setShowChaseContacts] = useState<any | null>(
        null
    );
    let closePopoverTimeout: ReturnType<typeof setTimeout>;

    const handlePopoverOpen = (
        event: MouseEvent<HTMLElement>,
        contact: any
    ) => {
        clearTimeout(closePopoverTimeout);
        setAnchorEl(event.currentTarget);
        setHoveredContact(contact);
    };

    const handlePopoverClose = () => {
        closePopoverTimeout = setTimeout(() => {
            setAnchorEl(null);
            setHoveredContact(null);
        }, 150);
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('common.store'),
            flex: 2,
            valueGetter: (_, row) => row?.local?.attributes?.name,
        },
        {
            field: 'completed',
            headerName: t('common.completed'),
            flex: 1,
            valueGetter: (_, row) => row?.completed,
            cellClassName: 'align-content-center-cell',
            renderCell: (params) => {
                if (params.value) {
                    return <DoneIcon />;
                }
                return <ClearIcon />;
            },
        },
        {
            field: 'portfolioCampaign',
            headerName: t('common.portfolio_campaign'),
            flex: 3,
            valueGetter: (_, row) => row?.portfolioCampaign?.attributes?.name,
        },
        {
            field: 'chaseContacts',
            headerName: t('common.contacts'),
            flex: 1,
            renderCell: (params) => (
                <Box
                    onClick={() => contactsClick(params?.value)}
                    sx={{
                        display: 'flex',
                        gap: 2,
                        height: '100%',
                        alignItems: 'center',
                    }}
                >
                    <AvatarGroup
                        max={2}
                        renderSurplus={(surplus) => (
                            <span>+{surplus.toString()[0]}</span>
                        )}
                    >
                        {params?.value?.map((contact: any) => (
                            <Avatar
                                aria-owns={
                                    hoveredContact !== null
                                        ? 'mouse-over-popover'
                                        : undefined
                                }
                                aria-haspopup="true"
                                key={`contact-${contact?.name || contact?.attributes?.name}`}
                                onMouseEnter={(event) =>
                                    handlePopoverOpen(event, contact)
                                }
                                onMouseLeave={handlePopoverClose}
                                alt={contact?.name || contact?.attributes?.name}
                                src={
                                    contact?.avatar ||
                                    contact?.attributes?.avatar ||
                                    'fail'
                                }
                            />
                        ))}
                    </AvatarGroup>
                </Box>
            ),
        },
        {
            field: 'completed_by',
            headerName: t('common.completed_by'),
            flex: 2,
            valueGetter: (_, row) => row?.completedBy?.attributes?.name,
            renderCell: (params) =>
                params?.value ? (
                    <Box
                        onClick={() => contactsClick([params?.value])}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            height: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt={params?.value}
                            src={params?.value || 'fail'}
                            sx={{ width: 34, height: 34 }}
                        />
                        {params.value}
                    </Box>
                ) : (
                    <div />
                ),
        },
        {
            field: 'completedOn',
            headerName: t('common.completed_on'),
            flex: 2,
        },
        {
            field: 'status',
            headerName: t('common.filter_header.status'),
            flex: 1,
            valueGetter: (_, params) => {
                return params?.localStatus?.attributes?.name || '';
            },
            renderCell: (params) => {
                if (!params?.row?.localStatus?.attributes?.name) {
                    return <div />;
                }

                return (
                    <Chip
                        label={params?.row?.localStatus?.attributes?.name}
                        color="primary"
                    />
                );
            },
        },
    ];

    return (
        <Box>
            {/* Render your DataGrid here, passing columns as a prop */}
            {/* Assuming you're using DataGridPro, otherwise adjust accordingly */}
            <StyledDataGrid
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    maxWidth: '100%',
                    '& .align-content-center-cell': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer',
                    },
                }}
                autoHeight
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(selected) => {
                    setChaseCentresSelected(selected);
                }}
                rows={localsData || []}
                columns={columns}
                filterModel={
                    sortFilters?.length ? { items: sortFilters } : { items: [] }
                }
                onCellClick={(e) => {
                    if (e.field === '__check__') {
                        return;
                    }

                    if (e.field === 'chaseContacts') {
                        setShowChaseContacts(e);
                        return;
                    }

                    showChaseStoreSheet(e);
                }}
                disableColumnFilter
                loading={loading}
                slotProps={{
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton',
                    },
                }}
            />

            {/* Single Popover Instance */}
            <Popover
                id="mouse-over-popover"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        minWidth: 250,
                        display: 'flex',
                        alignItems: 'center',
                        pointerEvents: 'auto',
                    },
                }}
                onMouseEnter={() => clearTimeout(closePopoverTimeout)} // Keep open when hovering over popover
                onMouseLeave={handlePopoverClose} // Close when leaving popover
                disableRestoreFocus
                sx={{ pointerEvents: 'none' }}
            >
                {hoveredContact && (
                    <Box display="flex" alignItems="center">
                        <Avatar
                            alt={hoveredContact?.attributes?.name}
                            src={hoveredContact?.attributes?.avatar || 'fail'}
                            sx={{ width: 32, height: 32, mr: 1 }}
                        />
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {hoveredContact?.attributes?.name}
                            </Typography>
                            <Typography variant="body1" color="text.primary">
                                {hoveredContact?.attributes?.email}
                            </Typography>
                        </Box>
                        <Box ml="auto" display="flex" gap={1}>
                            <IconButton
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        hoveredContact?.attributes?.email
                                    )
                                }
                            >
                                <CopyIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                component="a"
                                href={`mailto:${hoveredContact?.attributes?.email}`}
                                target="_blank"
                            >
                                <EmailIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Popover>

            <Dialog
                onClose={() => setShowChaseContacts(null)}
                open={showChaseContacts !== null}
            >
                <DialogTitle>{t('common.contacts')}</DialogTitle>
                <List sx={{ pt: 0 }}></List>

                {showChaseContacts &&
                    showChaseContacts.value.map((contact: any) => (
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                padding: 2,
                            }}
                        >
                            <Avatar
                                alt={contact?.attributes?.name}
                                src={contact?.attributes?.avatar || 'fail'}
                                sx={{ width: 32, height: 32, mr: 1 }}
                            />
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {contact?.attributes?.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                >
                                    {contact?.attributes?.email}
                                </Typography>
                            </Box>
                            <Box ml="auto" display="flex" gap={1}>
                                <IconButton
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            contact?.attributes?.email
                                        )
                                    }
                                >
                                    <CopyIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    component="a"
                                    href={`mailto:${contact?.attributes?.email}`}
                                    target="_blank"
                                >
                                    <EmailIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
            </Dialog>
        </Box>
    );
};

export default ChaseSubTable;
