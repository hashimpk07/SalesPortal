import { styled } from '@mui/material/styles';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import AutomationEditBody from './SheetBodies/AutomationCreateEditBody.tsx';
import { AutomationSheetProps } from './SheetBodies/AutomationSheetProps.ts';

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    width: 750,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 750,
        padding: theme.spacing(4),
        top: theme.mixins.toolbar.minHeight,
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    },
}));

const AutomationDetailsSheet = ({
    centre,
    centres,
    campaigns,
    openCreate,
    setIsOpenCreate,
    periodForms,
    groups,
}: AutomationSheetProps) => {
    const { t } = useTranslation();

    return (
        <DrawerStyled
            variant={'temporary'}
            open={openCreate !== null && openCreate}
            anchor={'right'}
            onClose={() => {
                if (setIsOpenCreate) {
                    setIsOpenCreate(false);
                }
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
                <Typography variant="h4" color="h4" sx={{ fontWeight: 'bold' }}>
                    {t(`automations.create_automation`)}
                </Typography>
                <Box>
                    <IconButton
                        onClick={() => {
                            if (setIsOpenCreate) {
                                setIsOpenCreate(false);
                            }
                        }}
                    >
                        <SettingsIcon />
                    </IconButton>
                </Box>
            </Box>

            <AutomationEditBody
                centres={centres}
                centre={centre}
                campaigns={campaigns}
                periodForms={periodForms}
                groups={groups}
            />
        </DrawerStyled>
    );
};

export default AutomationDetailsSheet;
