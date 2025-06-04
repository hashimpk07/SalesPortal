import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CERTIFIED, STANDARD } from '../../constants';

interface TitleSectionProps {
    campaignType?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
    campaignType = STANDARD,
}) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                {campaignType === CERTIFIED
                    ? t('certified_sales.title')
                    : t('live_campaign.title')}
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 1.5, mb: 5.5 }}
            >
                {t('sections.sales_collection')} /{' '}
                {campaignType === CERTIFIED
                    ? t('certified_sales.title')
                    : t('live_campaign.title')}
            </Typography>
        </Box>
    );
};

export default TitleSection;
