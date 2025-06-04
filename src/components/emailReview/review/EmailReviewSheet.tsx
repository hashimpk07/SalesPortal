import {styled} from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import walkEndpoint from '../../../utils/walkEndpoint.ts';
import mapToPlainObject from '../../../utils/mapToPlainObject.ts';
import {DateTime} from "luxon";

const DrawerStyled = styled(Drawer)(({theme}) => ({
    width: 800,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 800,
        padding: theme.spacing(4),
        top: theme.mixins.toolbar.minHeight,
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    },
}));

interface EmailReviewSheetProps {
    formIsOpen: boolean,
    importSheet: any,
    storesDict: any,
    centre: any | null,
    setImportSheet: (a: any) => void,
    handleApproveImport: (periodForm: any, localId: any) => void
}

const EmailReviewSheet: React.FC<EmailReviewSheetProps> = ({
                                                               formIsOpen = false,
                                                               setImportSheet,
                                                               importSheet,
                                                               centre,
                                                               storesDict,
                                                               handleApproveImport
                                                           }) => {
    const [campaign, setCampaign] = useState<string | null>(null);
    const [period, setPeriod] = useState<string | null>(null);
    const [store, setStore] = useState<string | null>(null);
    const [locals, setLocals] = useState<any>([]);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [periodForms, setPeriodForms] = useState<any>([]);

    const [campaignPeriodForms, setCampaignPeriodForms] = useState<any[]>([])
    const [periodFormLocals, setPeriodFormLocal] = useState<any[]>([])

    const {t} = useTranslation();

    const getEventValue = (
        event: SelectChangeEvent<string | null>
    ): string | null => event.target.value;

    useEffect(() => {
        if (centre) {
            walkEndpoint({
                partialPath: '/salesCollection/campaigns',
                queryString: `include=periodForms,periodForms.locals,periodForms.localsCompleted&filter[centreId]=${centre.id}`,
            }).then((r) => {
                setCampaigns(r.aggData);
                setPeriodForms(
                    mapToPlainObject({
                        jsMap: r.typeMap,
                        mapKey: 'periodForms',
                    }) || {}
                );

                setLocals(
                    mapToPlainObject({
                        jsMap: r.typeMap,
                        mapKey: 'locals',
                    }) || {}
                );
            });
        }
    }, [centre]);

    useEffect(() => {
        setCampaignPeriodForms([])
        if (!campaign) return;

        const selectedCampaign = campaigns.find((c: any) => {
            return c.id === campaign
        })

        if (!selectedCampaign) return;

        const compPeriodForms: any[] = []

        selectedCampaign?.relationships?.periodForms?.data.forEach((periodForm: any) => {
            if (periodForms[periodForm?.id]) {
                compPeriodForms.push(periodForms[periodForm?.id])
            }
        })
        setCampaignPeriodForms(compPeriodForms)
    }, [campaign])

    useEffect(() => {
        setPeriodFormLocal([])
        if (!period) return;

        const selectedPeriodForm = campaignPeriodForms.find((p: any) => {
            return p.id === period
        })

        if (!selectedPeriodForm) return;

        const compLocals: any[] = []

        selectedPeriodForm?.relationships?.locals?.data.forEach((local: any) => {
            if (locals[local?.id]) {
                compLocals.push(locals[local?.id])
            }
        })

        setPeriodFormLocal(compLocals)
    }, [period])

    const shouldShowOverwriteWarning = () => {
        if (campaign && period && store && periodForms[period]) {
            if (periodForms[period]?.relationships?.localsCompleted?.data?.find((l: any) => l.id === store)) {
                return true
            } else {
                return false
            }
        }

        if (importSheet?.relationships?.local?.data?.id && importSheet?.relationships?.periodForm?.data?.id) {
            if (periodForms[importSheet?.relationships?.periodForm?.data?.id]?.relationships?.localsCompleted?.data?.find((l: any) => l.id === importSheet?.relationships?.local?.data?.id)) {
                return true
            }
        }

        return false
    }

    return (
        <DrawerStyled
            variant={'temporary'}
            open={formIsOpen}
            anchor={'right'}
            onClose={() => {
                setImportSheet(null);
            }}
        >
            {importSheet && (
                <>
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
                            variant="h5"
                            color="h5"
                            sx={{fontWeight: 'bold'}}
                        >
                            {t('email_review.approve_for_import')}
                        </Typography>

                        <IconButton onClick={() => setImportSheet(null)}>
                            <SettingsIcon/>
                        </IconButton>
                    </Box>
                    <Divider sx={{mb: 3}}/>

                    <Typography
                        variant="h6"
                        color="h6"
                        sx={{fontWeight: 'bold'}}
                    >
                        {t('common.sales')}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        flexFlow: "column",
                        gap: "1rem",
                        mt: 2,
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <Box>{t('common.sales')}</Box>
                            <Box>
                                {importSheet?.attributes?.currency}
                                {(importSheet?.attributes?.grossSales || importSheet?.attributes?.grossSales === 0) ? parseFloat(importSheet?.attributes?.grossSales)?.toLocaleString(navigator.language) : ""}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <Box>{t('common.centre')}</Box>
                            <Box>
                                {centre?.name}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <Box>{t('common.store')}</Box>
                            <Box>
                                {storesDict[importSheet?.relationships?.local?.data?.id]?.name ? storesDict[importSheet?.relationships?.local?.data?.id]?.name : t('email_review.not_found')}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <Box>{t('email_pending.submission_date')}</Box>
                            <Box>
                                {importSheet?.attributes?.submittedDate ? DateTime.fromSQL(importSheet?.attributes?.submittedDate).toLocaleString(DateTime.DATETIME_MED) : ""}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <Box>{t('email_pending.transaction_date')}</Box>
                            <Box>
                                {importSheet?.attributes?.transactionDate ? DateTime.fromSQL(importSheet?.attributes?.transactionDate).toLocaleString(DateTime.DATETIME_MED) : ""}
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{my: 3}}/>

                    {shouldShowOverwriteWarning() && <Alert sx={{
                        mb: 2
                    }} severity="warning">{t('email_review.this_store_has_already_submitted_data')}</Alert>}


                    <Typography
                        variant="h6"
                        color="h6"
                        sx={{fontWeight: 'bold'}}
                    >
                        {t('email_review.match_data')}
                    </Typography>
                    <Box
                        sx={{
                            my: '1rem',
                            display: 'flex',
                            flexFlow: 'column',
                            gap: '1rem',
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="campaign-label">
                                {t('common.campaign')}
                            </InputLabel>
                            <Select
                                labelId="campaign-label"
                                label={t('common.campaign')}
                                value={campaign}
                                onChange={(e) => setCampaign(getEventValue(e))}
                                variant="outlined"
                            >
                                {campaigns?.map((campaign) => (
                                    <MenuItem
                                        key={'campaign-select-' + campaign.id}
                                        value={campaign.id}
                                    >
                                        {campaign?.attributes?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="period-label">
                                {t('common.period')}
                            </InputLabel>
                            <Select
                                labelId="period-label"
                                label={t('common.period')}
                                value={period}
                                onChange={(e) => setPeriod(getEventValue(e))}
                                variant="outlined"
                                disabled={!campaign}
                            >
                                {campaignPeriodForms?.map((pForm: any) => (
                                    <MenuItem
                                        key={'period-select-' + pForm.id}
                                        value={pForm.id}
                                    >
                                        {pForm?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="store-label">
                                {t('common.store')}
                            </InputLabel>
                            <Select
                                labelId="store-label"
                                label={t('common.store')}
                                value={store}
                                onChange={(e) => setStore(getEventValue(e))}
                                variant="outlined"
                            >
                                {periodFormLocals?.map((local) => (
                                    <MenuItem
                                        key={'local-select-' + local.id}
                                        value={local.id}
                                    >
                                        {local?.name || local?.attributes?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Button disabled={!campaign || !period || !store} variant="contained" onClick={() => {
                                handleApproveImport(period, store)
                            }}>
                                {t('common.approve')}
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </DrawerStyled>
    );
};

export default EmailReviewSheet;
