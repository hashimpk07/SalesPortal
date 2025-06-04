import {
    Alert,
    Box,
    Button,
    Drawer,
    IconButton,
    LinearProgress,
    TextField,
    Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

interface ChaseSidePanelProps {
    handleDrawerClose: () => void;
    openDrawer: boolean;
    handleSendPushNotification: (title: string, message: string) => void;
    notificationsSending: number;
}

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    width: 500,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 500,
        padding: theme.spacing(4),
        top: theme.mixins.toolbar.minHeight,
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    },
}));

const ChaseSidePanelSendPush = ({
    handleDrawerClose,
    openDrawer,
    handleSendPushNotification,
    notificationsSending,
}: ChaseSidePanelProps) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [composeMessage, setComposeMessage] = useState('');

    if (notificationsSending === 2) {
        return (
            <DrawerStyled
                variant={'temporary'}
                open={openDrawer}
                anchor={'right'}
                onClose={() => {
                    handleDrawerClose();
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 6,
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        color="h4"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {t(`common.send_push`)}
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <SettingsIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Alert severity="success">
                        {t('common.notifications_sent')}
                    </Alert>
                </Box>
            </DrawerStyled>
        );
    }

    if (notificationsSending === 1) {
        return (
            <DrawerStyled
                variant={'temporary'}
                open={openDrawer}
                anchor={'right'}
                onClose={() => {}}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 6,
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        color="h4"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {t(`common.send_push`)}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <LinearProgress />
                </Box>
            </DrawerStyled>
        );
    }

    return (
        <DrawerStyled
            variant={'temporary'}
            open={openDrawer}
            anchor={'right'}
            onClose={() => handleDrawerClose()}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 6,
                    mb: 3,
                }}
            >
                <Typography variant="h4" color="h4" sx={{ fontWeight: 'bold' }}>
                    {t(`common.send_push`)}
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                    <SettingsIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 2,
                    mb: 3,
                }}
            >
                <Typography sx={{ fontWeight: 'bold' }}>
                    {t('common.title')}
                </Typography>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="outlined-basic"
                    variant="outlined"
                />

                <Typography sx={{ fontWeight: 'bold' }}>
                    {t('chase.automation.compose_message')}
                </Typography>

                <TextField
                    aria-label="Compose message for push notification"
                    minRows={5}
                    multiline
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleSendPushNotification(
                                title,
                                composeMessage || ''
                            );
                        }}
                        disabled={title.length === 0}
                    >
                        {t('common.send')}
                    </Button>
                </Box>
            </Box>
        </DrawerStyled>
    );
};

export default ChaseSidePanelSendPush;
