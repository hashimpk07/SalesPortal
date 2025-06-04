import { Box, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { AutomationBaseSheetProps } from './AutomationSheetProps.ts';

interface AutomationDetailsBodyProps extends AutomationBaseSheetProps {
    campaigns: any[];
    periodForms: any[];
    groups: any[];
    selectedAutomationToView: any;
}

const AutomationDetailsBody = ({
    selectedAutomationToView,
    centre,
    centres: _c,
    campaigns,
    periodForms,
    groups,
}: AutomationDetailsBodyProps) => {
    const { t } = useTranslation();

    const getCampaign = () => {
        if (selectedAutomationToView?.relationships?.campaign?.data?.id) {
            const campaign = campaigns.find((e) => {
                return (
                    e.id ===
                    selectedAutomationToView?.relationships?.campaign?.data?.id
                );
            });

            if (campaign) {
                return campaign?.attributes?.name || t('automations.not_found');
            }
        }

        return t('automations.not_found');
    };
    const getPeriodForm = () => {
        if (selectedAutomationToView?.relationships?.periodForm?.data?.id) {
            const periodForm =
                periodForms[
                    selectedAutomationToView?.relationships?.periodForm?.data
                        ?.id
                ];

            if (periodForm) {
                return (
                    periodForm?.attributes?.name ||
                    periodForm?.name ||
                    t('automations.not_found')
                );
            }
        }

        return t('automations.all');
    };
    const getGroup = () => {
        if (selectedAutomationToView?.relationships?.group?.data?.id) {
            const group =
                groups[
                    selectedAutomationToView?.relationships?.group?.data?.id
                ];

            if (group) {
                return (
                    group?.attributes?.name ||
                    group?.name ||
                    t('automations.not_found')
                );
            }
        }

        return t('automations.not_found');
    };

    const stripHtml = (html: string) => {
        return html.replace(/(<([^>]+)>)/gi, '\n');
    };

    return (
        <>
            <Box>
                <Typography
                    variant="caption"
                    color="caption"
                    sx={{ fontWeight: 'bold' }}
                >
                    {t(`common.date_range`)}
                </Typography>
                <Box
                    sx={{
                        pl: 1,
                        display: 'flex',
                        gap: 5,
                    }}
                >
                    <Box>
                        <Typography variant="caption" color="caption">
                            {t(`common.starts_on`)}:
                        </Typography>
                        <Typography
                            variant="caption"
                            color="caption"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {(selectedAutomationToView?.attributes?.startDate &&
                                DateTime.fromISO(
                                    selectedAutomationToView?.attributes
                                        ?.startDate
                                ).toLocaleString(DateTime.DATE_MED)) ??
                                'none'}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="caption">
                            {t(`common.ends_on`)}:
                        </Typography>
                        <Typography
                            variant="caption"
                            color="caption"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {(selectedAutomationToView?.attributes?.endDate &&
                                DateTime.fromISO(
                                    selectedAutomationToView?.attributes
                                        ?.endDate
                                ).toLocaleString(DateTime.DATE_MED)) ??
                                'none'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    pt: 5,
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <Typography variant="caption" color="caption">
                    {t(`automations.automation_name`)}
                </Typography>
                <Typography
                    variant="caption"
                    color="caption"
                    sx={{ fontWeight: 'bold' }}
                >
                    {selectedAutomationToView?.attributes?.title}
                </Typography>
            </Box>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <Typography variant="caption" color="caption">
                    {t(`common.centre`)}
                </Typography>
                <Typography
                    variant="caption"
                    color="caption"
                    sx={{ fontWeight: 'bold' }}
                >
                    {centre.label}
                </Typography>
            </Box>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <Typography variant="caption" color="caption">
                    {t(`common.campaign`)}
                </Typography>
                <Typography
                    variant="caption"
                    color="caption"
                    sx={{ fontWeight: 'bold' }}
                >
                    {getCampaign()}
                </Typography>
            </Box>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <Typography variant="caption" color="caption">
                    {t(`common.period`)}
                </Typography>
                <Typography
                    variant="caption"
                    color="caption"
                    sx={{ fontWeight: 'bold' }}
                >
                    {getPeriodForm()}
                </Typography>
            </Box>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <Typography variant="caption" color="caption">
                    {t(`common.title`)}
                </Typography>
                <Typography
                    variant="caption"
                    color="caption"
                    sx={{ fontWeight: 'bold' }}
                >
                    {selectedAutomationToView?.attributes?.title}
                </Typography>
            </Box>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <Typography variant="caption" color="caption">
                    {t(`automations.message`)}
                </Typography>
                <Typography
                    variant="caption"
                    color="caption"
                    sx={{ fontWeight: 'bold' }}
                >
                    {stripHtml(
                        selectedAutomationToView?.attributes?.message || ''
                    )}
                </Typography>
            </Box>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <Typography variant="caption" color="caption">
                    {t(`automations.to`)}
                </Typography>
                <Typography
                    variant="caption"
                    color="caption"
                    sx={{ fontWeight: 'bold' }}
                >
                    {getGroup()}
                </Typography>
            </Box>
            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <Typography variant="caption" color="caption">
                    {t(`automations.when_do_you_send`)}
                </Typography>
                {selectedAutomationToView?.attributes?.startDate &&
                    selectedAutomationToView?.attributes?.endDate && (
                        <Typography
                            variant="caption"
                            color="caption"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {selectedAutomationToView?.attributes?.amount}{' '}
                            {t(
                                'date_time.' +
                                    selectedAutomationToView?.attributes
                                        ?.timeScale
                            )}{' '}
                            {t(
                                'automations.just_starting_part.' +
                                    selectedAutomationToView?.attributes?.when
                            )}{' '}
                            {t('automations.collection')}{' '}
                            {t(
                                'automations.just_starting_after.' +
                                    selectedAutomationToView?.attributes?.when
                            )}{' '}
                            {t('automations.at')}{' '}
                            {`${selectedAutomationToView?.attributes?.at}:00`}
                        </Typography>
                    )}
            </Box>
        </>
    );
};

export default AutomationDetailsBody;
