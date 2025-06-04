import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useCallback, useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from 'react-i18next';
import fetchData from '../../../services/fetchData.ts';
import { API_BASE_URL, API_VERSION } from '../../../constants';

interface MediaProps {
    type: string;
    id: number;
}

const TableMediaButton = ({ media }: { media: MediaProps }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [attachment, setAttachment] = useState<any>(undefined);

    const getMediaData = useCallback(async () => {
        setLoading(true);
        const r = await fetchData({
            path: `${API_BASE_URL}/${API_VERSION}/media/${media.id}`,
        });
        if (r?.data?.attributes) {
            setAttachment(r?.data?.attributes);
        }
        setLoading(false);
    }, [media]);

    useEffect(() => {
        if (media && media.id) {
            getMediaData().then(() => {});
        }
    }, [media, getMediaData]);

    const openFile = () => {
        getMediaData().then(() => {
            if (attachment?.url) {
                window.open(attachment?.url);
            }
        });
    };

    if (loading) {
        return (
            <IconButton disabled>
                <CircularProgress size="30px" />
            </IconButton>
        );
    }

    if (!attachment || !attachment?.url) {
        return (
            <Tooltip title={t('common.error_occurred')}>
                <IconButton color="error">
                    <ErrorIcon />
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <Tooltip title={attachment?.name}>
            <IconButton
                onClick={() => {
                    openFile();
                }}
            >
                <FileOpenIcon />
            </IconButton>
        </Tooltip>
    );
};

export default TableMediaButton;
