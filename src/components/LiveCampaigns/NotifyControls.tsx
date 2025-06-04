import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NotifyControlsProps {
    setSendNotificationOpen: (a: boolean) => void;
    sendEmail: () => void;
}

const NotifyControls = ({
    setSendNotificationOpen,
    sendEmail,
}: NotifyControlsProps) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
                variant="contained"
                color="inherit"
                onClick={() => setSendNotificationOpen(true)}
            >
                {t('common.send_push')}
            </Button>
            <Button
                variant="contained"
                color="inherit"
                onClick={() => sendEmail()}
            >
                {t('common.send_email')}
            </Button>
        </Box>
    );
};

export default NotifyControls;
