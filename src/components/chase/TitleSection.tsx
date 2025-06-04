import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TitleSectionProps {
    centreName?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ centreName = '' }) => {
    const { t } = useTranslation();

    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                {t('chase.title')} {centreName || ''}
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 1.5, mb: 5.5 }}
            >
                {t('sections.sales_collection')} / {t('chase.title')}
            </Typography>
        </Box>
    );
};

export default TitleSection;
