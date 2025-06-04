/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import {
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuButtonStrikethrough,
    MenuButtonUnderline,
    MenuControlsContainer,
    RichTextEditor,
    type RichTextEditorRef,
} from 'mui-tiptap';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

interface ChaseSidePanelProps {
    open: boolean;
    handleDrawerClose: () => void;
}

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

const mockCentres = [
    { id: 1, name: 'London Centre' },
    { id: 2, name: 'Manchester Centre' },
    { id: 3, name: 'Dublin Centre' },
];

const mockCampaigns = [
    { id: 1, name: 'Campaign In Spain' },
    { id: 2, name: 'Everything' },
    { id: 3, name: 'Campaign #33' },
];

export default function ChaseSidePanelAutomations({
    open,
    handleDrawerClose,
}: ChaseSidePanelProps) {
    const [automationName, setAutomationName] = useState<string>('');
    const [centre, setCentre] = useState<string>('');
    const [campaign, setCampaign] = useState<string>('');
    const [whatToSend, setWhatToSend] = useState<string>('');
    const [whoToSend, setWhoToSend] = useState<string>('');
    const [collectionTime, setCollectionTime] = useState<string>('');
    const [onADayOfWeek, setOnADayOfWeek] = useState<boolean>(false);
    const [onlyTenantsNotComplete, setOnlyTenantsNotComplete] =
        useState<boolean>(false);
    const [onlyTenantsRequiredLease, setOnlyTenantsRequiredLease] =
        useState<boolean>(false);

    const [sendDay, setSendDay] = useState<number>(0);
    const [sendCollectionBeforeAfter, setSendCollectionBeforeAfter] =
        useState<string>('');
    const [sendCollectionStarts, setSendCollectionStarts] =
        useState<string>('');
    const [sendAtTime, setSendAtTime] = useState<string>('');

    const rteRef = useRef<RichTextEditorRef>(null);

    const { t } = useTranslation();

    const getEventValue = (event: SelectChangeEvent<string>): string =>
        event.target.value;

    const handleSelectChange = (
        setter: React.Dispatch<React.SetStateAction<string>>
    ) => {
        return (event: SelectChangeEvent<string>) => {
            const value = getEventValue(event);
            setter(value);
        };
    };

    const handleClear =
        (setter: React.Dispatch<React.SetStateAction<string>>) => () => {
            setter('');
        };

    return (
        <DrawerStyled variant={'persistent'} open={open} anchor={'right'}>
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
                    {t('common.automation')}
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                    <SettingsIcon />
                </IconButton>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    mb: 2,
                }}
            >
                <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        {t('chase.automation.name_this_automation')}
                    </Typography>
                    <FormControl fullWidth>
                        <TextField
                            placeholder={t('common.name')}
                            variant="outlined"
                            value={automationName}
                            onChange={(e) => {
                                setAutomationName(e.target.value);
                            }}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        {t('chase.automation.choose_campaign')}
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="choose-campaign-label">
                            {t('common.select_an_option')}
                        </InputLabel>
                        <Select
                            labelId="choose-campaign-label"
                            label={t('common.select_an_option')}
                            value={campaign}
                            onChange={handleSelectChange(setCampaign)}
                            endAdornment={
                                centre && (
                                    <IconButton
                                        onClick={handleClear(setCampaign)}
                                        size="small"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }
                        >
                            {mockCampaigns.map((campaign) => (
                                <MenuItem
                                    key={'choose-centres-select-' + campaign.id}
                                    value={campaign.id.toString()}
                                >
                                    {campaign.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        {t('chase.automation.choose_centres')}
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="choose-centre-label">
                            {t('common.select_multiple_options')}
                        </InputLabel>
                        <Select
                            labelId="choose-centre-label"
                            label={t('common.select_multiple_options')}
                            value={centre}
                            onChange={handleSelectChange(setCentre)}
                            endAdornment={
                                centre && (
                                    <IconButton
                                        onClick={handleClear(setCentre)}
                                        size="small"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }
                        >
                            {mockCentres.map((centre) => (
                                <MenuItem
                                    key={'choose-centre-select-' + centre.id}
                                    value={centre.id.toString()}
                                >
                                    {centre.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        {t('chase.automation.what_do_you_want_to_send')}
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="what-to-send-label">
                            {t('common.select_an_option')}
                        </InputLabel>
                        <Select
                            labelId="what-to-send-label"
                            label={t('common.select_an_option')}
                            value={whatToSend}
                            onChange={handleSelectChange(setWhatToSend)}
                            endAdornment={
                                centre && (
                                    <IconButton
                                        onClick={handleClear(setWhatToSend)}
                                        size="small"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }
                        >
                            <MenuItem key="Notifications" value="Notifications">
                                Notifications
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        {t('chase.automation.compose_message')}
                    </Typography>
                    <RichTextEditor
                        ref={rteRef}
                        extensions={[StarterKit, Underline]} // Or any Tiptap extensions you wish!
                        // Optionally include `renderControls` for a menu-bar atop the editor:
                        renderControls={() => (
                            <MenuControlsContainer>
                                <MenuButtonBold />
                                <MenuButtonItalic />
                                <MenuButtonUnderline />
                                <MenuButtonStrikethrough />
                            </MenuControlsContainer>
                        )}
                    />
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        {t('chase.automation.who_do_you_want_to_send_to')}
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="who-to-send-label">
                            {t('common.select_an_option')}
                        </InputLabel>
                        <Select
                            labelId="who-to-send-label"
                            label={t('common.select_an_option')}
                            value={whoToSend}
                            onChange={handleSelectChange(setWhoToSend)}
                            endAdornment={
                                centre && (
                                    <IconButton
                                        onClick={handleClear(setWhoToSend)}
                                        size="small"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }
                        >
                            <MenuItem key="Bill" value="Bill">
                                Bill
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={onlyTenantsNotComplete}
                                onChange={(e) =>
                                    setOnlyTenantsNotComplete(e.target.checked)
                                }
                            />
                        }
                        label={t(
                            'chase.automation.only_tenants_who_did_not_complete_sales_report'
                        )}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={onlyTenantsRequiredLease}
                                onChange={(e) =>
                                    setOnlyTenantsRequiredLease(
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label={t(
                            'chase.automation.only_tenants_who_are_required_by_lease'
                        )}
                    />
                </Box>

                <Box sx={{ display: 'flex' }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={onADayOfWeek}
                                onChange={(e) =>
                                    setOnADayOfWeek(e.target.checked)
                                }
                            />
                        }
                        label={t(
                            'chase.automation.on_a_day_of_the_collection_at'
                        )}
                    />
                    <FormControl>
                        <TextField
                            type="time"
                            placeholder={t('chase.automation.time')}
                            variant="outlined"
                            value={collectionTime}
                            onChange={(e) => {
                                setCollectionTime(e.target.value);
                            }}
                            disabled={!onADayOfWeek}
                        />
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <FormControl sx={{ maxWidth: '12.5%' }}>
                        <TextField
                            type="text"
                            inputMode="numeric"
                            // @ts-expect-error Pattern isn't declared but does work
                            pattern="[0-9]*"
                            variant="outlined"
                            value={sendDay}
                            onChange={(e) => {
                                setSendDay(parseInt(e.target.value, 10));
                            }}
                        />
                    </FormControl>
                    <div>{t('common.day')}</div>
                    <FormControl sx={{ minWidth: '15%' }}>
                        <Select
                            value={sendCollectionBeforeAfter}
                            onChange={handleSelectChange(
                                setSendCollectionBeforeAfter
                            )}
                            endAdornment={
                                centre && (
                                    <IconButton
                                        onClick={handleClear(
                                            setSendCollectionBeforeAfter
                                        )}
                                        size="small"
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }
                        >
                            <option value="before">{t('common.before')}</option>
                            <option value="after">{t('common.after')}</option>
                        </Select>
                    </FormControl>
                    <div>{t('common.collection')}</div>
                    <FormControl>
                        <TextField
                            type="time"
                            variant="outlined"
                            value={sendCollectionStarts}
                            onChange={(e) => {
                                setSendCollectionStarts(e.target.value);
                            }}
                        />
                    </FormControl>
                    <div>{t('common.at')}</div>
                    <FormControl>
                        <TextField
                            type="time"
                            variant="outlined"
                            value={sendAtTime}
                            onChange={(e) => {
                                setSendAtTime(e.target.value);
                            }}
                        />
                    </FormControl>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
                <Button variant="contained">{t('common.save')}</Button>
                <Button variant="contained">{t('common.activate')}</Button>
            </Box>
        </DrawerStyled>
    );
}
