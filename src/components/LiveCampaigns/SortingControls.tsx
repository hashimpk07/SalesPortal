import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Typography,
} from '@mui/material';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { useTranslation } from 'react-i18next';

interface SortingControlsProps {
    added: string;
    setAdded: (value: string) => void;
    mandatorySubmission: string;
    setMandatorySubmission: (value: string) => void;
}

const SortingControls = ({
    added,
    setAdded,
    mandatorySubmission,
    setMandatorySubmission,
}: SortingControlsProps) => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4,
                width: '100%',
            }}
        >
            <Typography variant="h6">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SwapVertOutlinedIcon />
                    {t('common.sort')}:
                </Box>
            </Typography>

            <FormControl fullWidth>
                <InputLabel id="added-label">
                    {t('common.added_sales')}
                </InputLabel>
                <Select
                    labelId="added-label"
                    label={t('common.added_sales')}
                    value={added}
                    onChange={(event) => {
                        setAdded(event.target.value);
                    }}
                >
                    <MenuItem value="">{t('common.sort_by.default')}</MenuItem>
                    <MenuItem value="true">{t('common.sort_by.true')}</MenuItem>
                    <MenuItem value="false">
                        {t('common.sort_by.false')}
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="mandatory-submission-label">
                    {t('live_campaign.mandatory_submission')}
                </InputLabel>
                <Select
                    labelId="mandatory-submission-label"
                    label={t('live_campaign.mandatory_submission')}
                    value={mandatorySubmission}
                    onChange={(event) =>
                        setMandatorySubmission(event.target.value)
                    }
                >
                    <MenuItem value="">{t('common.sort_by.default')}</MenuItem>
                    <MenuItem value="true">{t('common.sort_by.true')}</MenuItem>
                    <MenuItem value="false">
                        {t('common.sort_by.false')}
                    </MenuItem>
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                    setAdded('');
                    setMandatorySubmission('');
                }}
            >
                {t('common.clear')}
            </Button>
        </Box>
    );
};

export default SortingControls;
