import { styled } from '@mui/material/styles';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import AutomationEditBody from './SheetBodies/AutomationCreateEditBody.tsx';
import AutomationDetailsBody from './SheetBodies/AutomationDetailsBody.tsx';
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
    selectedAutomationToView,
    setSelectedAutomationToView,
    centre,
    centres,
    campaigns,
    periodForms,
    groups,
}: AutomationSheetProps) => {
    const { t } = useTranslation();

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    return (
        <DrawerStyled
            variant={'temporary'}
            open={selectedAutomationToView !== null}
            anchor={'right'}
            onClose={() => {
                setIsEditMode(false);
                if (setSelectedAutomationToView) {
                    setSelectedAutomationToView(null);
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
                    {!isEditMode
                        ? t(`automations.automations_details`)
                        : t(`automations.edit_automation`)}
                </Typography>
                <Box>
                    {!isEditMode && (
                        <IconButton
                            onClick={() => {
                                setIsEditMode(true);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                    <IconButton
                        onClick={() => {
                            setIsEditMode(false);
                            if (setSelectedAutomationToView) {
                                setSelectedAutomationToView(null);
                            }
                        }}
                    >
                        <SettingsIcon />
                    </IconButton>
                </Box>
            </Box>
            {!isEditMode && (
                <AutomationDetailsBody
                    campaigns={campaigns}
                    periodForms={periodForms}
                    centres={centres}
                    selectedAutomationToView={selectedAutomationToView}
                    centre={centre}
                    groups={groups}
                />
            )}
            {isEditMode && (
                <AutomationEditBody
                    centres={centres}
                    selectedAutomationToView={selectedAutomationToView}
                    centre={centre}
                    campaigns={campaigns}
                    periodForms={periodForms}
                    groups={groups}
                />
            )}
        </DrawerStyled>
    );
};

export default AutomationDetailsSheet;
