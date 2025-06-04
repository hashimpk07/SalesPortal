import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { DateTime } from 'luxon';
import {
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Tooltip,
    Drawer,
    CircularProgress,
    Chip,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import SingleActivityRender from './SingleActivityRender';
import FormBuilder from '../../MUIFormBuilder/FormBuilder.tsx';

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    width: 800,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 800,
        padding: theme.spacing(4),
        top: theme.mixins.toolbar.minHeight,
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    },
}));

interface SidePanelFormLayoutProps {
    formIsOpen: boolean;
    handleFormClose: () => void;
    formFields: any;
    periodFormDetails: PeriodFormProps;
    LocalDetails: PeriodFormProps;
    centre: CentreProps | undefined;
    handleFormSubmit: (data: any) => void;
    activity: IncludedProps[] | undefined;
    campaignResultsResponse: DataProps | undefined;
    campaignResultIsLoading: boolean;
    usersDict: undefined | DictProps;
    saveInProgress: boolean;
    currencySymbol: any;
    currencySymbolDivider?: any;
    salesData?: any;
    cmsUsersDict?: any;
    profileUsersDict?: any;
}

const SidePanelFormLayout = ({
    formIsOpen,
    handleFormClose,
    formFields,
    salesData = undefined,
    periodFormDetails,
    LocalDetails,
    centre,
    handleFormSubmit,
    activity,
    campaignResultsResponse,
    campaignResultIsLoading,
    usersDict,
    currencySymbol,
    cmsUsersDict,
    profileUsersDict,
    currencySymbolDivider,
    saveInProgress = false,
}: SidePanelFormLayoutProps) => {
    const campaignResultsResponseEntryDate = DateTime.fromISO(
        campaignResultsResponse?.attributes?.createdAt as string
    );

    const { t } = useTranslation();
    const [actualExpanded, setActualExpanded] = useState(true);
    const [activityExpanded, setActivityExpanded] = useState(true);

    const { RenderForm, runValidateForm, isValid, prepareDataToSubmit } =
        FormBuilder({
            form: formFields || [],
            centreConfig: {
                default_currency_symbol: currencySymbol,
                default_currency_divider: currencySymbolDivider,
            },
            currentData: salesData || undefined,
            t: t,
            centreId: parseInt(centre?.id as string, 10),
        });

    let rows = [
        { key: 'Form', data: periodFormDetails?.attributes?.formName },
        { key: 'Period', data: periodFormDetails?.attributes?.name },
        { key: 'Type', data: periodFormDetails?.attributes?.periodType },
        {
            key: 'Store',
            data: LocalDetails?.attributes?.name || LocalDetails?.name,
        },
        { key: 'Centre', data: centre?.attributes?.name || centre?.name },
    ];

    const handleExpandActualClick = (
        event: React.MouseEvent<SVGSVGElement, MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();
        setActualExpanded(!actualExpanded);
    };

    const handleExpandActivityClick = (
        event: React.MouseEvent<SVGSVGElement, MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();
        setActivityExpanded(!activityExpanded);
    };

    const getNameOfUser = (createdByUser: any) => {
        if (createdByUser?.data?.type === 'cmsUsers') {
            return (
                cmsUsersDict[createdByUser?.data?.id]?.attributes?.name ||
                t('live_campaign.unknown_user')
            );
        }

        if (createdByUser?.data?.type === 'locals') {
            return (
                usersDict?.[
                    createdByUser?.data?.id as keyof typeof usersDict
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                ]?.attributes?.name || t('live_campaign.unknown_user')
            );
        }

        if (createdByUser?.data?.type === 'profiles') {
            return (
                profileUsersDict?.[
                    createdByUser?.data?.id as keyof typeof usersDict
                ]?.attributes?.name || t('live_campaign.unknown_user')
            );
        }

        return t('live_campaign.unknown_user');
    };

    return (
        <DrawerStyled variant="temporary" open={formIsOpen} anchor={'right'}>
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
                    sx={{ fontWeight: 'bold', ml: 2.2 }}
                >
                    {t('common.upload_sales')}
                </Typography>

                <IconButton onClick={handleFormClose}>
                    <SettingsIcon />
                </IconButton>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Paper sx={{ p: 2.2, boxShadow: 'none' }}>
                <Box
                    sx={{
                        mb: 3,
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {t('common.general_information')}
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 100 }} aria-label="simple table">
                            <TableBody>
                                {rows?.map((row) => (
                                    <TableRow
                                        key={row.key}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.key}
                                        </TableCell>

                                        <TableCell align="left">
                                            {row?.data}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Paper>

            {/* <Divider sx={{ mb: 3 }} /> */}

            <Box
                sx={{
                    mb: 3,
                }}
            >
                <Divider sx={{ mb: 3 }} />

                <Accordion expanded={actualExpanded} sx={{ boxShadow: 'none' }}>
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon onClick={handleExpandActualClick} />
                        }
                        aria-controls="panel2-content"
                        id="panel2-header"
                        onClick={(e) => e.preventDefault()}
                    >
                        <Typography variant="h6">
                            {t('common.actual')}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {formIsOpen && RenderForm()}

                        <Box
                            sx={{
                                mb: 2,
                                mt: 3,
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'end',
                            }}
                        >
                            {saveInProgress && <CircularProgress />}
                            {!saveInProgress && (
                                <Button
                                    variant="contained"
                                    color={isValid() ? 'primary' : 'error'}
                                    onClick={() => {
                                        if (runValidateForm()) {
                                            prepareDataToSubmit().then((r) => {
                                                handleFormSubmit(r);
                                            });
                                        }
                                    }}
                                >
                                    {t('common.submit')}
                                </Button>
                            )}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Accordion expanded={activityExpanded} sx={{ boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={
                        <ExpandMoreIcon onClick={handleExpandActivityClick} />
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                    onClick={(e) => e.preventDefault()}
                >
                    <Typography variant="h6">{t('common.activity')}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {!campaignResultIsLoading &&
                        activity &&
                        activity.map((singleActivity) => {
                            if (!singleActivity?.attributes?.createdAt) {
                                return null;
                            }

                            const createdAtDate = DateTime.fromISO(
                                singleActivity.attributes.createdAt as string
                            ) as DateTime;

                            if (!createdAtDate.isValid) {
                                return null;
                            }

                            if (
                                singleActivity?.attributes?.createdAt &&
                                campaignResultsResponse &&
                                createdAtDate > campaignResultsResponseEntryDate
                            ) {
                                return (
                                    <SingleActivityRender
                                        key={singleActivity.id}
                                        singleActivity={singleActivity}
                                        t={t}
                                        userName={getNameOfUser(
                                            singleActivity?.relationships
                                                ?.createdByUser
                                        )}
                                    />
                                );
                            }

                            return null;
                        })}
                    {!campaignResultIsLoading && campaignResultsResponse && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 4,
                            }}
                        >
                            <Avatar
                                sx={{ width: 36, height: 36 }}
                                src={
                                    campaignResultsResponse?.attributes
                                        ?.createdByAvatar
                                }
                            />
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                    }}
                                >
                                    <Typography variant="body1">
                                        {getNameOfUser(
                                            campaignResultsResponse
                                                ?.relationships?.createdByUser
                                        )}
                                        <Chip
                                            sx={{
                                                ml: 2,
                                            }}
                                            label={t(
                                                'common.source.' +
                                                    campaignResultsResponse
                                                        ?.attributes?.source
                                            )}
                                        />
                                    </Typography>

                                    {campaignResultsResponse?.attributes
                                        ?.createdAt && (
                                        <Tooltip
                                            title={DateTime.fromISO(
                                                campaignResultsResponse
                                                    ?.attributes
                                                    ?.createdAt as string
                                            ).toLocaleString(
                                                DateTime.DATETIME_FULL
                                            )}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {DateTime.fromISO(
                                                    campaignResultsResponse
                                                        ?.attributes
                                                        ?.createdAt as string
                                                ).toRelative()}
                                            </Typography>
                                        </Tooltip>
                                    )}

                                    {!campaignResultsResponse?.attributes
                                        ?.createdAt && (
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {t('common.unknown_date')}
                                        </Typography>
                                    )}
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {(campaignResultsResponse?.attributes
                                            ?.activityPlatform as string) || ''}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {!campaignResultIsLoading &&
                        activity &&
                        activity.map((singleActivity) => {
                            if (!singleActivity?.attributes?.createdAt) {
                                return null;
                            }

                            const createdAtDate = DateTime.fromISO(
                                singleActivity.attributes.createdAt as string
                            ) as DateTime;

                            if (!createdAtDate.isValid) {
                                return null;
                            }

                            if (
                                singleActivity?.attributes?.createdAt &&
                                campaignResultsResponse &&
                                createdAtDate < campaignResultsResponseEntryDate
                            ) {
                                return (
                                    <SingleActivityRender
                                        key={singleActivity.id}
                                        singleActivity={singleActivity}
                                        t={t}
                                        userName={getNameOfUser(
                                            singleActivity?.relationships
                                                ?.createdByUser
                                        )}
                                    />
                                );
                            }

                            return null;
                        })}

                    {!campaignResultIsLoading &&
                        !campaignResultsResponse &&
                        !activity?.length && (
                            <Typography variant="body1" color="textSecondary">
                                {t('common.no_activity_found')}
                            </Typography>
                        )}

                    {campaignResultIsLoading && (
                        <Typography variant="body1" color="textSecondary">
                            {t('common.loading')}
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </DrawerStyled>
    );
};

export default SidePanelFormLayout;
