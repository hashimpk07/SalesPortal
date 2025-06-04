import {
    Box,
    Button,
    Chip,
    Drawer,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { type SelectChangeEvent } from '@mui/material/Select/SelectInput';
import fetchData from '../../services/fetchData.ts';

interface SendPushNotificationSheetProps {
    sendNotificationOpen: boolean;
    setSendNotificationOpen: (close: boolean) => void;
    stores: SingleLocalProps[];
    preSelectedStores: number[];
    campaignId: number | string;
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SendPushNotificationSheet: React.FC<SendPushNotificationSheetProps> = ({
    sendNotificationOpen = false,
    setSendNotificationOpen,
    stores,
    preSelectedStores,
    campaignId,
}) => {
    const { t } = useTranslation();
    const [selectedValues, setSelectedValues] = useState<number[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (sendNotificationOpen) {
            setSelectedValues(preSelectedStores);
        }
    }, [preSelectedStores, sendNotificationOpen]);

    const handleChange = (e: SelectChangeEvent<number[]>) => {
        setSelectedValues(e.target.value as number[]);
    };
    const handleRemovalOfStore = (id: number) => {
        const tempSelectedStores = selectedValues;
        const index = tempSelectedStores.findIndex((store) => store === id);
        tempSelectedStores.splice(index, 1);
        setSelectedValues(tempSelectedStores);
    };

    const handleSendNotification = () => {
        const relationships: { id: number; type: string }[] = [];

        selectedValues.forEach((value) => {
            relationships.push({
                id: value,
                type: 'locals',
            });
        });

        fetchData({
            partialPath: `/salesCollection/campaigns/${campaignId}/pushNotifications`,
            method: 'POST',
            stringifiedBody: JSON.stringify({
                data: {
                    attributes: {
                        title,
                        message: textAreaRef?.current?.value,
                    },
                    relationships: {
                        locals: { data: relationships },
                    },
                },
            }),
        }).then(() => {});
    };

    return (
        <DrawerStyled
            anchor="right"
            open={sendNotificationOpen}
            onClose={() => {
                setSendNotificationOpen(false);
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
                    {t(`common.send_push`)}
                </Typography>
                <IconButton onClick={() => setSendNotificationOpen(false)}>
                    <SettingsIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 2,
                    mb: 3,
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {t('chase.recipients')}
                </Typography>
                <FormControl>
                    <InputLabel id="label-for-select_a_store-select-stores">
                        {t('common.select_multiple_options')}
                    </InputLabel>
                    <Select
                        label={t('common.select_multiple_options')}
                        labelId={`label-for-select_a_store-select-stores`}
                        id={`select_a_store-select-stores`}
                        multiple
                        value={selectedValues}
                        onChange={(e) => handleChange(e)}
                        input={
                            <OutlinedInput
                                id="select-multiple-chip"
                                label="INSERT_CENTRE_NAME_HERE"
                            />
                        }
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                }}
                            >
                                {selected.map((value) => (
                                    <Chip
                                        key={value}
                                        label={
                                            stores.find(
                                                (e) =>
                                                    parseInt(e.id, 10) === value
                                            )?.name ?? 'ERROR OCCURRED'
                                        }
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event) => {
                                                    event.stopPropagation();
                                                    handleRemovalOfStore(value);
                                                }}
                                            />
                                        }
                                        onDelete={() => {}}
                                    />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        variant="outlined"
                    >
                        {stores.map((store) => (
                            <MenuItem
                                key={`menu-item-${store.id}`}
                                value={parseInt(store.id, 10)}
                            >
                                {store.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography sx={{ fontWeight: 'bold' }}>
                    {t('common.title')}
                </Typography>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="outlined-basic"
                    variant="outlined"
                />

                <Typography sx={{ fontWeight: 'bold' }}>
                    {t('chase.automation.compose_message')}
                </Typography>

                <TextareaAutosize
                    aria-label="Compose message for push notification"
                    minRows={5}
                    ref={textAreaRef}
                />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
                    <Button
                        variant="contained"
                        disabled={selectedValues.length === 0 || !title}
                        onClick={() => {
                            handleSendNotification();
                        }}
                    >
                        {t('common.send')}
                    </Button>
                </Box>
            </Box>
        </DrawerStyled>
    );
};

export default SendPushNotificationSheet;
