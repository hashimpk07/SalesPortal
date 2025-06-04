import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Modal, Tab, Tabs } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import { TIMEFRAMED } from '@/constants/index.ts';
import PrimaryTableConfig from './modalConfig/primary/PrimaryTableConfig.tsx';
import useLiveCampaignTableConfigStore, {
    PrimaryTableColumnsInterface,
    SecondaryTableColumnsInterface,
} from '../../store/liveCampaignTableConfigStore.ts';
import PrimaryTableConfigDemoTable from './modalConfig/primary/PrimaryTableConfigDemoTable.tsx';
import SecondaryTableConfig from './modalConfig/secondary/SecondaryTableConfig.tsx';
import SecondaryTableConfigDemoTable from './modalConfig/secondary/SecondaryTableConfigDemoTable.tsx';
import { Periods } from './ViewControls.tsx';

interface ModalProps {
    openTableConfig: boolean;
    closeModal: () => void;
    activeView: Periods;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`table-config-tabpanel-${index}`}
            aria-labelledby={`table-config-tab-${index}`}
            {...other}
            sx={{
                overflow: 'auto',
            }}
        >
            {value === index && <Box sx={{ py: 4, px: 2 }}>{children}</Box>}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `table-config-tab-${index}`,
        'aria-controls': `table-config-tabpanel-${index}`,
    };
}

const TableConfigModal: React.FC<ModalProps> = ({
    openTableConfig,
    closeModal,
    activeView,
}) => {
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const {
        commitNewPrimaryTableConfig,
        commitNewSecondaryTableConfig,
        configColumnsPrimaryTable,
        updateKeyInSecondaryTable,
    } = useLiveCampaignTableConfigStore();

    const [
        shallowLiveCampaignsPrimaryConfig,
        setShallowLiveCampaignsPrimaryConfig,
    ] = useState(configColumnsPrimaryTable);

    const [
        shallowLiveCampaignsSecondaryConfig,
        setShallowLiveCampaignsSecondaryConfig,
    ] = useState(
        useLiveCampaignTableConfigStore.getState().configColumnsSecondaryTable
    );

    useEffect(() => {
        if (openTableConfig) {
            setShallowLiveCampaignsPrimaryConfig(
                useLiveCampaignTableConfigStore.getState()
                    .configColumnsPrimaryTable
            );
            setShallowLiveCampaignsSecondaryConfig(
                useLiveCampaignTableConfigStore.getState()
                    .configColumnsSecondaryTable
            );
        }

        return () => {
            setValue(0);
        };
    }, [openTableConfig]);

    const setTableConfig = (
        key: keyof PrimaryTableColumnsInterface | string,
        isVisible: boolean
    ) => {
        if (
            shallowLiveCampaignsPrimaryConfig.configColumnsSales[key] !==
            undefined
        ) {
            setShallowLiveCampaignsPrimaryConfig({
                ...shallowLiveCampaignsPrimaryConfig,
                configColumnsSales: {
                    ...shallowLiveCampaignsPrimaryConfig.configColumnsSales,
                    [key]: isVisible,
                },
            });
        } else if (key in shallowLiveCampaignsPrimaryConfig) {
            setShallowLiveCampaignsPrimaryConfig({
                ...shallowLiveCampaignsPrimaryConfig,
                [key]: isVisible,
            });
        } else {
            setShallowLiveCampaignsPrimaryConfig({
                ...shallowLiveCampaignsPrimaryConfig,
                configColumnsSales: {
                    ...shallowLiveCampaignsPrimaryConfig.configColumnsSales,
                    [key]: isVisible,
                },
            });
        }
    };

    const setSecondaryTableConfig = (
        a: keyof SecondaryTableColumnsInterface,
        b: boolean
    ) => {
        setShallowLiveCampaignsSecondaryConfig({
            ...shallowLiveCampaignsSecondaryConfig,
            [a]: b,
        });
        updateKeyInSecondaryTable(a, b);
    };

    const hasShallowChanged = () => {
        const currentState =
            useLiveCampaignTableConfigStore.getState()
                .configColumnsPrimaryTable;
        const currentStateSecondary =
            useLiveCampaignTableConfigStore.getState()
                .configColumnsSecondaryTable;

        const primaryChanged = Object.keys(
            shallowLiveCampaignsPrimaryConfig
        ).some(
            (key) =>
                shallowLiveCampaignsPrimaryConfig[
                key as keyof PrimaryTableColumnsInterface
                ] !== currentState[key as keyof PrimaryTableColumnsInterface]
        );

        const secondaryChanged = Object.keys(
            shallowLiveCampaignsSecondaryConfig
        ).some(
            (key) =>
                shallowLiveCampaignsSecondaryConfig[
                key as keyof SecondaryTableColumnsInterface
                ] !==
                currentStateSecondary[
                key as keyof SecondaryTableColumnsInterface
                ]
        );

        return primaryChanged || secondaryChanged;
    };

    return (
        <Modal
            open={openTableConfig}
            onClose={() => {
                setShallowLiveCampaignsPrimaryConfig(
                    useLiveCampaignTableConfigStore.getState()
                        .configColumnsPrimaryTable
                );
                setShallowLiveCampaignsSecondaryConfig(
                    useLiveCampaignTableConfigStore.getState()
                        .configColumnsSecondaryTable
                );
                closeModal();
            }}
            aria-labelledby="Table Config"
            aria-describedby="Table Config"
        >
            <Box
                sx={{
                    position: 'absolute' as const,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '85vh',
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Tabs
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab
                                label={t(
                                    'live_campaign.config_modal.primary_table'
                                )}
                                {...a11yProps(0)}
                            />
                            <Tab
                                label={t(
                                    'live_campaign.config_modal.secondary_table'
                                )}
                                {...a11yProps(1)}
                            />
                        </Tabs>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                        }}
                    >
                        <Button
                            onClick={() => {
                                commitNewPrimaryTableConfig(
                                    shallowLiveCampaignsPrimaryConfig
                                );
                                commitNewSecondaryTableConfig(
                                    shallowLiveCampaignsSecondaryConfig
                                );
                                closeModal();
                            }}
                            disabled={!hasShallowChanged()}
                            variant="contained"
                        >
                            {t('common.save')}
                        </Button>
                        <IconButton
                            onClick={() => {
                                setShallowLiveCampaignsPrimaryConfig(
                                    useLiveCampaignTableConfigStore.getState()
                                        .configColumnsPrimaryTable
                                );
                                closeModal();
                            }}
                        >
                            <CancelIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>
                <CustomTabPanel
                    value={value}
                    index={activeView === TIMEFRAMED ? 1 : 0}
                >
                    <PrimaryTableConfig
                        liveCampaignShallowCopy={
                            shallowLiveCampaignsPrimaryConfig
                        }
                        setTableConfig={setTableConfig}
                    />
                    <PrimaryTableConfigDemoTable
                        liveCampaignShallowCopy={
                            shallowLiveCampaignsPrimaryConfig
                        }
                    />
                </CustomTabPanel>
                <CustomTabPanel
                    value={value}
                    index={activeView === TIMEFRAMED ? 0 : 1}
                >
                    <SecondaryTableConfig
                        liveCampaignShallowCopy={
                            shallowLiveCampaignsSecondaryConfig
                        }
                        setTableConfig={setSecondaryTableConfig}
                    />
                    <SecondaryTableConfigDemoTable
                        liveCampaignPrimaryShallowCopy={
                            shallowLiveCampaignsPrimaryConfig
                        }
                        liveCampaignSecondaryShallowCopy={
                            shallowLiveCampaignsSecondaryConfig
                        }
                    />
                </CustomTabPanel>
            </Box>
        </Modal>
    );
};

export default TableConfigModal;
