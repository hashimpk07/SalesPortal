import { enqueueSnackbar } from 'notistack';
import type { VariantType } from 'notistack';
import { t } from 'i18next';
import { useState } from 'react';
import useMainStore from '../../store';
import Layout from './SidePanelForm/Layout';
import createResult from '../../services/results/createResult.ts';
import { Periods } from './ViewControls.tsx';

interface LiveCampaignSidePanelProps {
    formIsOpen: boolean;
    handleFormClose: () => void;
    centre: CentreProps | undefined;
    periodFormsDict: { [k: string]: { id: string } } | undefined;
    localsDict: { [k: string]: { id: string } } | undefined;
    activeView: Periods;
    triggerResultsLoad: () => void;
    campaignResults: IncludedProps[] | undefined;
    campaignResultsResponse: DataProps | undefined;
    campaignResultIsLoading: boolean;
    cmsUsersDict: any;
    profileUsersDict: any;
}

const LiveCampaignSidePanel = ({
    formIsOpen,
    handleFormClose,
    centre,
    periodFormsDict,
    localsDict,
    triggerResultsLoad,
    campaignResults,
    campaignResultsResponse,
    campaignResultIsLoading,
    cmsUsersDict,
    profileUsersDict,
}: LiveCampaignSidePanelProps) => {
    const { selectedRow, selectedCentre, completeLocalsDict } = useMainStore();
    const [submittingData, setSubmittingData] = useState<boolean>(false);

    const currencySymbolCode =
        selectedCentre?.attributes?.config?.default_currency_symbol;
    const currencySymbolDivider =
        selectedCentre?.attributes?.config?.default_currency_divider;

    const currencySymbol =
        currencySymbolCode && JSON.parse(`"${currencySymbolCode}"`);

    const periodFormId = selectedRow?.periodId as keyof typeof periodFormsDict;

    const localId =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        selectedRow?.formDataRelationships?.local?.data?.id ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        selectedRow?.archive?.campaignData?.relationships?.local?.data?.id ||
        selectedRow?.local?.id;

    const LocalDetails =
        localsDict?.[parseInt(localId, 10)] ||
        (completeLocalsDict?.[
            parseInt(localId, 10)
        ] as unknown as PeriodFormProps);

    const periodFormDetails = periodFormsDict?.[
        periodFormId
    ] as unknown as PeriodFormProps;

    const formStructure = periodFormDetails?.attributes?.formStructure;

    const handleFormSubmit = async (formData: any) => {
        setSubmittingData(true);

        const body = {
            data: {
                type: 'campaignResults',
                attributes: {
                    salesData: formData,
                },
                relationships: {
                    local: {
                        data: {
                            type: 'locals',
                            id: parseInt(
                                // @TODO FIX THIS!!!!
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                selectedRow?.formDataRelationships?.local?.data
                                    ?.id ||
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                selectedRow?.archive?.campaignData
                                    ?.relationships?.local?.data?.id ||
                                selectedRow?.local?.id,
                                10
                            ),
                        },
                    },
                    periodForm: {
                        data: {
                            type: 'periodForms',
                            id: parseInt(periodFormDetails?.id, 10),
                        },
                    },
                },
            },
        };

        const { data, errors } = await createResult({
            body,
        });

        setSubmittingData(false);

        if (errors) {
            console.error('Error:', errors);
            enqueueSnackbar(`${errors}`, { variant: 'error' as VariantType });
        }

        if (data) {
            enqueueSnackbar(t('common.saved'), {
                variant: 'success' as VariantType,
            });

            triggerResultsLoad();
            handleFormClose();
        }
    };

    // @TODO Change this in a future iteration
    if (!formIsOpen) {
        return <></>;
    }

    return (
        <Layout
            formIsOpen={formIsOpen}
            currencySymbol={currencySymbol}
            currencySymbolDivider={currencySymbolDivider}
            handleFormClose={handleFormClose}
            formFields={formStructure}
            salesData={selectedRow?.formData?.salesData || undefined}
            periodFormDetails={periodFormDetails}
            LocalDetails={LocalDetails as any}
            centre={centre}
            handleFormSubmit={handleFormSubmit}
            activity={campaignResults}
            campaignResultsResponse={campaignResultsResponse}
            campaignResultIsLoading={campaignResultIsLoading}
            usersDict={completeLocalsDict}
            cmsUsersDict={cmsUsersDict}
            profileUsersDict={profileUsersDict}
            saveInProgress={submittingData}
        />
    );
};

export default LiveCampaignSidePanel;
