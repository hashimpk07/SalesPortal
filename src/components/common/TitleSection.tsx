import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TitleSectionProps {
    title: string;
    subtitle: string;
}

const TitleSection = ({ title, subtitle }: TitleSectionProps) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {t('sections.sales_collection')} / {subtitle}
            </Typography>
        </Box>
    );
};

export default TitleSection;
