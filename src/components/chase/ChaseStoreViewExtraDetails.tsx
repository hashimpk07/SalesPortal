/* eslint-disable react-hooks/exhaustive-deps */
import {
    Avatar,
    Box,
    Button, CircularProgress,
    Drawer,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField, Tooltip,
    Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import walkEndpoint from '../../utils/walkEndpoint.ts';
import mapToPlainObject from "../../utils/mapToPlainObject.ts";
import { DateTime } from "luxon";
import fetchData from "../../services/fetchData.ts";
import { useSnackbar } from "notistack";
import HelpIcon from '@mui/icons-material/Help';
import { blue } from '@mui/material/colors';


interface ChaseStoreViewExtraDetailsProps {
    centre: any;
    chaseStore: any;
    statuses: any[];
    handleClose: () => void;
    handleUpdateStatus: (statusChangeTo: any) => void;
}

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    width: 500,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 500,
        padding: theme.spacing(4),
        top: theme.mixins.toolbar.minHeight,
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    },
}));
const ChaseStoreViewExtraDetails = ({
    centre,
    chaseStore,
    handleClose,
    statuses,
    handleUpdateStatus,
}: ChaseStoreViewExtraDetailsProps) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar()

    const [statusChangeTo, setStatusChangeTo] = useState<string>('');

    const [justAComment, setJustAComment] = useState<string>('');

    const [loadingComments, setLoadingComments] = useState<boolean>(false);
    const [comments, setComments] = useState<any[]>([]);
    const [users, setUsers] = useState<any | null>(null);
    const [activityFeed, setActivityFeed] = useState<any[] | null>(null);

    function getLocalComments() {
        setLoadingComments(true)
        walkEndpoint({
            partialPath: `/salesCollection/campaigns/${chaseStore?.row?.campaign?.id}/comments`,
            queryString: `sort=-createddate&filter[localId]=${chaseStore?.row?.local?.id}&filter[periodIndex]=${chaseStore?.row?.periodIndex}&include=cmsUser`,
        }).then((r) => {
            setComments(r.aggData as any[]);
            setUsers(
                mapToPlainObject({ jsMap: r.typeMap, mapKey: 'cmsUsers' }) || {}
            );
            setLoadingComments(false)
            setActivityFeed(null);
        });
    }

    useEffect(() => {
        if (chaseStore === null) {
            setStatusChangeTo('');
            setJustAComment('');
            setComments([]);
            setActivityFeed(null);
        }

        if (chaseStore?.row?.local?.id && comments?.length === 0) {
            getLocalComments();
        } else {
            setComments([]);
            setUsers(null);
            setActivityFeed(null);
        }
    }, [chaseStore]);

    useEffect(() => {
        if ((!activityFeed || activityFeed.length === 0) && comments.length > 0) {
            const compActivityFeed: any[] = [];
            comments.forEach((comment) => {
                compActivityFeed.push({
                    submitterName: users[comment.relationships.cmsUser.data.id]?.name || t('common.unknown'),
                    createdDate: comment?.attributes?.createdDate,
                    createdDateAsNumber: DateTime.fromISO(comment?.attributes?.createdDate).toMillis(),
                    text: comment?.attributes?.comment || '',
                    type: "comment"
                })
            })

            if (chaseStore?.row?.completed) {
                // @TODO DESIGN THIS
                compActivityFeed.push({
                    submitterName: t('common.information'),
                    createdDate: DateTime.fromSQL(chaseStore?.row?.completedOn).toISO(),
                    createdDateAsNumber: DateTime.fromSQL(chaseStore?.row?.completedOn).toMillis(),
                    text: (chaseStore?.row?.completedBy?.attributes?.name || t('common.unknown')) + ' ' + t('common.uploaded_data').toLowerCase(),
                    type: 'submittion'
                })
            }

            compActivityFeed.sort((a: any, b: any) => {
                return a.createdDateAsNumber - b.createdDateAsNumber;
            }).reverse();

            setActivityFeed(compActivityFeed);
        }
    }, [comments, activityFeed]);

    const handleAddAComment = () => {
        fetchData({
            partialPath: `/salesCollection/campaigns/${chaseStore.row.campaign.id}/comments`,
            method: 'POST',
            queryString: "",
            stringifiedBody: JSON.stringify({
                "data": {
                    "type": "reportComments",
                    "attributes": {
                        "comment": justAComment,
                        "periodIndex": parseInt(chaseStore.row.periodIndex, 10)
                    },
                    "relationships": {
                        "local": {
                            "data": {
                                "type": "locals",
                                "id": parseInt(chaseStore.row.local.id, 10)
                            }
                        }
                    }
                }
            })
        }).then(() => {
            getLocalComments(); // @TODO JUST ADD THE DATA
            setJustAComment('')
            enqueueSnackbar(t('common.comment_added'))
        })
    }

    return (
        <DrawerStyled
            variant={'temporary'}
            open={!!chaseStore}
            anchor={'right'}
            onClose={() => {
                handleClose();
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
                    {t(`chase.title`)}
                </Typography>
                <IconButton onClick={() => handleClose()}>
                    <SettingsIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 0.5,
                    mb: 3,
                }}
            >
                <Typography variant="h6" color="h6" fontWeight={600}>
                    {t('common.general')}
                </Typography>
                <Typography variant="subtitle2" color="subtitle2">
                    {t(`common.centre`)}:{' '}
                    {(centre as any)?.label ||
                        (centre as any)?.attributes?.name}
                </Typography>
                <Typography variant="subtitle2" color="subtitle2">
                    {t(`common.store`)}:{' '}
                    {chaseStore?.row?.local?.attributes?.name}
                </Typography>
                <Typography variant="subtitle2" color="subtitle2">
                    {t(`common.campaign`)}:{' '}
                    {chaseStore?.row?.campaign?.attributes?.name}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 2,
                }}
            >
                <Typography variant="h6" color="h6" fontWeight={600}>
                    {t('common.filter_header.status')}
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="choose-status">
                        {t('chase.change_status')}
                    </InputLabel>
                    <Select
                        labelId="choose-status"
                        label={t('chase.change_status')}
                        value={statusChangeTo}
                        onChange={(event) =>
                            setStatusChangeTo(event.target.value)
                        }
                        variant="outlined"
                    >
                        {statuses.map((e) => (
                            <MenuItem value={e.id} key={e.id}>
                                {e?.attributes?.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box
                    sx={{
                        alignSelf: 'end',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() =>
                            handleUpdateStatus(statusChangeTo)
                        }
                        disabled={!statusChangeTo}
                    >
                        {t('common.save')}
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    mt: 2,
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 2
                }}
            >
                <Typography variant="h6" color="h6" fontWeight={600}>
                    {t('common.activity')}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                    <FormControl fullWidth>
                        <TextField
                            label={t('common.add_comment')}
                            multiline
                            value={justAComment}
                            onChange={(e) => setJustAComment(e.target.value)}
                            minRows={1}
                            maxRows={4}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={() =>
                            handleAddAComment()
                        }
                        disabled={!justAComment}
                    >
                        {t('common.send')}
                    </Button>
                </Box>

                {loadingComments && <CircularProgress sx={{
                    alignSelf: "center"
                }} />}
                {(!loadingComments && (!activityFeed || activityFeed.length === 0)) && <Box sx={{ textAlign: "center" }}>{t('common.no_activity')}</Box>}

                {(activityFeed && activityFeed?.length > 0) && activityFeed?.map((feed: any) => <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    {feed.type !== 'submittion' && <Avatar alt={feed?.submitterName || t('common.unknown')} src={'asd'} />}
                    {feed.type === 'submittion' && <Avatar sx={{ bgcolor: blue[500] }}>
                        <HelpIcon />
                    </Avatar>}

                    <Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Typography variant="subtitle2" color="darkgrey" fontWeight={600} >
                                {feed?.submitterName || t('common.unknown')}
                            </Typography>
                            <Tooltip title={DateTime.fromISO(feed?.createdDate).toLocaleString(DateTime.DATETIME_MED)} arrow placement="top">
                                <Typography variant="subtitle2" color="grey" fontWeight={600} >
                                    {DateTime.fromISO(feed?.createdDate).toRelative()}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box>
                            {feed?.text}
                        </Box>
                    </Box>
                </Box>)}
            </Box>
        </DrawerStyled>
    );
};

export default ChaseStoreViewExtraDetails;
