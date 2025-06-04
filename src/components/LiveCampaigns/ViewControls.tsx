import { IconButton, Typography, Box, Divider } from '@mui/material';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTranslation } from 'react-i18next';
import {
    MERGED,
    LIST,
    QUARTERLY,
    MONTHLY,
    WEEKLY,
    DAILY,
    TIMEFRAMED,
} from '../../constants';

export type Periods =
    | typeof MERGED
    | typeof LIST
    | typeof QUARTERLY
    | typeof MONTHLY
    | typeof WEEKLY
    | typeof DAILY
    | typeof TIMEFRAMED;

interface SortingControlsProps {
    activeView: Periods;
    setActiveView: (view: Periods) => void;
    setOpenTableConfig: () => void;
}

const SortingControls = ({
    activeView,
    setActiveView,
    setOpenTableConfig,
}: SortingControlsProps) => {
    const { t } = useTranslation();
    const handleToggle = (view: Periods) => {
        setActiveView(view);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4,
            }}
        >
            <Typography variant="h6">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RemoveRedEyeOutlinedIcon />
                    {t('common.view')}:
                </Box>
            </Typography>

            <IconButton
                aria-label="merged"
                onClick={() => handleToggle(MERGED)}
                color={activeView === MERGED ? 'primary' : 'default'}
            >
                <FormatListBulletedIcon />
            </IconButton>

            <IconButton
                aria-label="list"
                onClick={() => handleToggle(LIST)}
                color={activeView === LIST ? 'primary' : 'default'}
            >
                <FormatAlignJustifyIcon />
            </IconButton>
            <IconButton
                aria-label="daily"
                onClick={() => handleToggle(TIMEFRAMED)}
                color={activeView === TIMEFRAMED ? 'primary' : 'default'}
            >
                <CalendarMonthIcon />
            </IconButton>

            <Divider orientation="vertical" flexItem />

            {activeView !== LIST ? (
                <IconButton
                    onClick={() => setOpenTableConfig()}
                    aria-label="settings"
                >
                    <SettingsIcon />
                </IconButton>
            ) : (
                <Box sx={{ width: 40 }} />
            )}
        </Box>
    );
};

export default SortingControls;
