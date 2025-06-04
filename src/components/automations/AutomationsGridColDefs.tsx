import { GridColDef } from '@mui/x-data-grid-pro';
import { TFunction } from 'i18next';
import { Chip } from '@mui/material';
import { DateTime } from 'luxon';
import CampaignIcon from '@mui/icons-material/Campaign';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { AutomatedCompletedProps } from '../../store/automationsStore.ts';

const now = DateTime.now();

const automationsGridColDefs = (
    t: TFunction,
    centre: AutomatedCompletedProps,
    campaigns: any
) => {
    return [
        {
            field: 'status',
            headerName: t('common.filter_header.status'),
            valueGetter: (_, row) => {
                if (
                    row.attributes.endDate &&
                    DateTime.fromISO(row.attributes.endDate) >= now
                ) {
                    return 'active';
                }

                return 'expired';
            },
            renderCell: (params) => {
                if (params.formattedValue === 'expired') {
                    return (
                        <Chip
                            icon={<ErrorOutlineOutlinedIcon />}
                            label={t('automations.expired')}
                            color="error"
                            variant="outlined"
                        />
                    );
                }

                return (
                    <Chip
                        icon={<CampaignIcon />}
                        label={t('automations.active')}
                        color="success"
                        variant="outlined"
                    />
                );
            },
            width: 150,
        },
        {
            field: 'title',
            headerName: t('automations.title'),
            width: 300,
            valueGetter: (_, row) => {
                return row.attributes.title;
            },
        },
        {
            field: 'campaign',
            headerName: t('common.campaign'),
            flex: 1,
            valueGetter: (_, row) => {
                if (
                    row.relationships.campaign &&
                    row.relationships.campaign.data &&
                    row.relationships.campaign.data.id
                ) {
                    return row.relationships.campaign.data.id;
                }
                return -1;
            },
            renderCell: (params) => {
                if (
                    params.formattedValue === -1 &&
                    !campaigns[parseInt(params.formattedValue, 10)]
                ) {
                    return <Chip label="NOT FOUND" color="error" />;
                }

                return (
                    campaigns[parseInt(params.formattedValue, 10)]?.name ?? (
                        <Chip label="NOT FOUND" color="error" />
                    )
                );
            },
        },
        {
            field: 'to',
            headerName: t('automations.to'),
            valueGetter: () => {
                return centre?.label || '';
            },
            width: 300,
        },
        {
            field: 'as',
            headerName: t('automations.filter_headers.as'),
            valueGetter: (_, row) => {
                return row.attributes.type;
            },
            renderCell: (params) => {
                if (params.formattedValue === 'email') {
                    return <Chip label="E-mail" color="secondary" />;
                }

                return <Chip label="Push Notification" color="primary" />;
            },
            width: 200,
        },
    ] as GridColDef[];
};

export default automationsGridColDefs;
