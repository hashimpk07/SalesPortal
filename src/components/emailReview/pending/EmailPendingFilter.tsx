import React from 'react';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    // eslint-disable-next-line import/named
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import useEmailSubmissionsPending from '../../../store/emailSubmissionsPending.ts';

interface EmailPendingFilterProps {
    centres: CentreProps[];
}

const EmailPendingFilter: React.FC<EmailPendingFilterProps> = ({
    centres = [],
}) => {
    const { t } = useTranslation();

    const {
        centre,
        setCentre,
        setReviewStatus,
        reviewStatus,
        resetFilterState,
    } = useEmailSubmissionsPending();

    const getEventValue = (
        event: SelectChangeEvent<string | boolean | number | null>
    ): string | boolean | number | null => event.target.value;

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
                    <FilterAltOutlinedIcon /> Filter:
                </Box>
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="centre-label">
                    {t('common.filter_header.centre')}
                </InputLabel>
                <Select
                    labelId="centre-label"
                    label={t('common.filter_header.centre')}
                    value={centre}
                    onChange={(e) => setCentre(getEventValue(e) as number)}
                    endAdornment={
                        centre && (
                            <IconButton
                                onClick={() => setCentre(null)}
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        )
                    }
                    variant="outlined"
                >
                    {centres?.map((centre) => (
                        <MenuItem
                            key={'centres-select-' + centre.id}
                            value={centre.id}
                        >
                            {centre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="review_status-label">
                    {t('common.filter_header.review_status')}
                </InputLabel>
                <Select
                    labelId="review_status-label"
                    label={t('common.filter_header.review_status')}
                    value={reviewStatus}
                    onChange={(e) =>
                        setReviewStatus(getEventValue(e) as number)
                    }
                    endAdornment={
                        reviewStatus && (
                            <IconButton
                                onClick={() => setReviewStatus(null)}
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        )
                    }
                    variant="outlined"
                >
                    <MenuItem value="rejected">
                        {t('email_pending.status.rejected')}
                    </MenuItem>
                    <MenuItem value="draft">
                        {t('email_pending.status.draft')}
                    </MenuItem>
                    <MenuItem value="unknown">
                        {t('email_pending.status.unknown')}
                    </MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="text"
                size="small"
                sx={{ width: '10px' }}
                onClick={() => {
                    resetFilterState();
                }}
            >
                {t('common.filter_header.clear_filters')}
            </Button>
        </Box>
    );
};

export default EmailPendingFilter;
