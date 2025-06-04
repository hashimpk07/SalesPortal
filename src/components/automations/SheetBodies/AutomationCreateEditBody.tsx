import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel, FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useRef, useState } from 'react';
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
import useAutomationsStore, { AutomatedCompletedProps } from '../../../store/automationsStore.ts';
import walkEndpoint from "../../../utils/walkEndpoint.ts";
import { API_BASE_URL, API_VERSION } from "../../../constants";
import mapToPlainObject from "../../../utils/mapToPlainObject.ts";
import fetchData from "../../../services/fetchData.ts";

const AutomationDetailsBody = ({
  centre: currentCentre,
  selectedAutomationToView,
  centres,
  campaigns,
  periodForms,
  groups
}: any) => {
  const { setSavingProgress } = useAutomationsStore()
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<DateTime | null>(DateTime.now());
  const [endDate, setEndDate] = useState<DateTime | null>();
  const [sendPeriodToWho, setSendPeriodToWho] = useState<string>('all_periods');
  const [whatToSend, setWhatToSend] = useState<string>('push');
  const [title, setTitle] = useState<string>('');
  const [selectedCentre, setSelectedCentre] =
    useState<AutomatedCompletedProps | null>(null);
  const [selectedCampaigns, setSelectedCampaigns] =
    useState<AutomatedCompletedProps | null>(null);
  const [selectedPeriodForm, setSelectedPeriodForm] =
    useState<AutomatedCompletedProps | null>(null);
  const [selectedGroup, setSelectedGroup] =
    useState<AutomatedCompletedProps | null>(null);
  const rteRef = useRef<RichTextEditorRef>(null);

  const [sendCollectionBeforeAfter, setSendCollectionBeforeAfter] =
    useState<string>('');

  const [onlyTenantsWhoAreRequired, setOnlyTenantsWhoAreRequired] =
    useState<boolean>(false);

  const [compiledPeriodForms, setCompiledPeriodForms] = useState<unknown[]>(
    []
  );
  const [compiledGroups, setCompiledGroups] = useState<any[]>(
    []
  );

  const [timeScale, setTimeScale] = useState<string>('months');


  const [campaignsToPickFrom, setCampaignsToPickFrom] = useState<any>(campaigns || [])
  const [periodFormsToPickFrom, setPeriodFormsToPickFrom] = useState<any>(periodForms || [])
  const [groupsToPickFrom, setGroupsToPickFrom] = useState<any>(groups || [])

  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false)
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false)

  const [amount, setAmount] = useState<number>(1);
  const [onTheDayOfCollection, setOnTheDayOfCollection] = useState<boolean>(false);
  const [collectionTime, setCollectionTime] =
    useState<DateTime | null>();
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (selectedAutomationToView) {
      setEndDate(
        DateTime.fromISO(selectedAutomationToView?.attributes?.endDate)
      );
      setWhatToSend(
        selectedAutomationToView?.attributes?.type || 'push'
      );
      setTitle(selectedAutomationToView?.attributes?.title);
      rteRef.current?.editor?.commands.setContent(
        selectedAutomationToView?.attributes?.message
      ) as any;
      setOnlyTenantsWhoAreRequired(selectedAutomationToView?.attributes?.data?.includedWithLeaseOnly || false);

      setAmount(selectedAutomationToView?.attributes?.amount || 1)
      setSendCollectionBeforeAfter(selectedAutomationToView?.attributes?.when || "before_start")
      setTimeScale(selectedAutomationToView?.attributes?.timeScale || "months")
      setCollectionTime(DateTime.now().set({ hour: selectedAutomationToView?.attributes?.at }))

      if (selectedAutomationToView.relationships && selectedAutomationToView.relationships.campaign && selectedAutomationToView.relationships.campaign.data && selectedAutomationToView.relationships.campaign.data.id) {
        const campaignData = campaignsToPickFrom.find((e: any) => {
          return parseInt(e.id, 10) === parseInt(selectedAutomationToView.relationships.campaign.data.id, 10)
        })

        if (campaignData) {
          setSelectedCampaigns({
            label: campaignData?.name || campaignData?.attributes?.name,
            id: campaignData.id
          })
        }
      }

      if (selectedAutomationToView.relationships && selectedAutomationToView.relationships.group && selectedAutomationToView.relationships.group.data && selectedAutomationToView.relationships.group.data.id) {
        if (groupsToPickFrom[selectedAutomationToView.relationships.group.data.id]) {
          setSelectedGroup({
            label: groupsToPickFrom[selectedAutomationToView.relationships.group.data.id]?.name || groupsToPickFrom[selectedAutomationToView.relationships.group.data.id]?.attributes?.name,
            id: groupsToPickFrom[selectedAutomationToView.relationships.group.data.id].id
          })
        }
      }

      if (selectedAutomationToView.relationships && selectedAutomationToView.relationships.periodForm
        && selectedAutomationToView.relationships.periodForm
          .data && selectedAutomationToView.relationships.periodForm
            .data.id) {
        if (periodFormsToPickFrom[selectedAutomationToView.relationships.periodForm
          .data.id]) {
          setSelectedPeriodForm({
            label: periodFormsToPickFrom[selectedAutomationToView.relationships.periodForm.data.id]?.name || periodFormsToPickFrom[selectedAutomationToView.relationships.periodForm.data.id]?.attributes?.name,
            id: periodFormsToPickFrom[selectedAutomationToView.relationships.periodForm.data.id].id
          })
        }
      }
    }
    if (currentCentre) {
      setSelectedCentre(currentCentre);
    }
  }, [selectedAutomationToView, currentCentre]);

  useEffect(() => {
    if (selectedCampaigns) {
      const campaignData = campaignsToPickFrom.find((e: any) => {
        return e.id === selectedCampaigns.id
      })

      const campaignPeriodForms = campaignData.relationships.periodForms.data;
      const compilingAvailablePeriodForms: any[] = [];
      const compilingGroupIds: any[] = [];
      const compilingGroups: any[] = [];
      campaignPeriodForms.forEach((e: any) => {
        if (periodFormsToPickFrom[e.id]) {
          compilingAvailablePeriodForms.push(periodFormsToPickFrom[e.id])
        }
      });

      compilingAvailablePeriodForms.forEach((e) => {
        if (e.relationships && e.relationships && e.relationships.group) {
          compilingGroupIds.push(e?.relationships?.group?.data?.id)
        }
      })

      compilingGroupIds.filter((item, pos) => {
        return compilingGroupIds.indexOf(item) == pos;
      }).forEach((e) => {
        compilingGroups.push(groupsToPickFrom[e])
      })

      setCompiledPeriodForms(compilingAvailablePeriodForms);
      setCompiledGroups(compilingGroups);
    } else {
      setCompiledPeriodForms([])
    }
  }, [selectedCampaigns]);

  useEffect(() => {
    if (!selectedCentre) {
      return;
    }

    if (selectedCentre.id !== currentCentre?.id) {
      setLoadingCampaigns(true)
      walkEndpoint({
        path: `${API_BASE_URL}/${API_VERSION}/salesCollection/campaigns`,
        queryString: `filter[centreId]=${selectedCentre.id}&include=periodForms,periodForms.group`,
      }).then((r) => {
        setCampaignsToPickFrom(r.aggData as unknown[]);
        setPeriodFormsToPickFrom(
          mapToPlainObject({ jsMap: r.typeMap, mapKey: 'periodForms' }) ||
          {}
        );
        setGroupsToPickFrom(
          mapToPlainObject({ jsMap: r.typeMap, mapKey: 'groups' }) || {}
        );
        setLoadingCampaigns(false)
        setSelectedCampaigns(null)
        setSelectedPeriodForm(null)
      });
    } else {
      if (selectedAutomationToView?.relationships?.campaign?.data?.id) {
        if (selectedCampaigns?.id !== selectedAutomationToView.relationships.campaign.data.id) {
          setSelectedCampaigns(null)
        }
      }

      if (selectedAutomationToView?.relationships?.periodForm?.data?.id) {
        if (selectedPeriodForm?.id !== selectedAutomationToView.relationships.periodForm?.data?.id) {
          setSelectedPeriodForm(null)
        }
      }

      setCampaignsToPickFrom(campaigns)
      setPeriodFormsToPickFrom(periodForms)
      setGroupsToPickFrom(groups)
    }
  }, [selectedCentre, currentCentre])

  const CentresList =
    centres?.map((centre: any) => ({
      label: centre?.name || centre?.attributes?.name,
      id: centre.id,
    })) || [];

  const CampaignsList =
    campaignsToPickFrom?.map((campaign: any) => ({
      label: campaign?.name || campaign?.attributes?.name,
      id: campaign.id,
    })) || [];

  const PeriodFormList =
    compiledPeriodForms?.map((period: any) => ({
      label: period?.name || period?.attributes?.name,
      id: period.id,
    })) || [];

  const GroupsList =
    compiledGroups?.map((group) => ({
      label: group?.name || group?.attributes?.name,
      id: group.id,
    })) || [];

  const handleCentresChanges = (value: AutomatedCompletedProps) => {
    setSelectedCentre(value);
  };
  const handleCampaignChanges = (value: AutomatedCompletedProps) => {
    setSelectedCampaigns(value);
  };
  const handlePeriodFormChanges = (value: AutomatedCompletedProps) => {
    setSelectedPeriodForm(value);
  };

  const handleGroupsChanges = (value: AutomatedCompletedProps) => {
    setSelectedGroup(value);
  };

  const getMaxAmountValue = () => {
    if (timeScale === "months") {
      return 12
    }
    if (timeScale === "weeks") {
      return 52
    }
    return 31
  }

  const saveAutomation = (method: string) => {
    if (shouldDisableSave()) return;

    const bodyOfDataToSend = {
      "data": {
        "attributes": {
          "type": whatToSend,
          "timeScale": "",
          "amount": 0,
          "when": "", //status
          "at": "",
          "title": title,
          "message": rteRef?.current?.editor?.getHTML() ?? "",
          "startDate": startDate?.startOf("day").toISO(),
          "endDate": endDate?.endOf("day").toISO(),
          "includedWithLeaseOnly": onlyTenantsWhoAreRequired
        },
        "relationships": {
          "campaign": {
            "data": {
              "type": "campaigns",
              "id": parseInt(selectedCampaigns?.id as any, 10)
            }
          },
          "group": {
            "data": {
              "type": "groups",
              "id": parseInt(selectedGroup?.id as any, 10)
            }
          }
        }
      }
    }

    if (onTheDayOfCollection) {
      bodyOfDataToSend.data.attributes.timeScale = "days";
      bodyOfDataToSend.data.attributes.amount = 0;
      bodyOfDataToSend.data.attributes.when = "before_start";
      bodyOfDataToSend.data.attributes.at = collectionTime?.hour ? collectionTime?.hour + ":00" : "00:00";
    } else {
      bodyOfDataToSend.data.attributes.timeScale = timeScale;
      bodyOfDataToSend.data.attributes.amount = amount;
      bodyOfDataToSend.data.attributes.when = sendCollectionBeforeAfter;
      bodyOfDataToSend.data.attributes.at = collectionTime?.hour ? collectionTime?.hour + ":00" : "00:00";
    }

    if (sendPeriodToWho === 'individual_period') {
      // @ts-ignore
      bodyOfDataToSend.data.relationships.periodForm = {
        "data": {
          "type": "periodForm",
          "id": selectedPeriodForm?.id && parseInt(selectedPeriodForm.id as string, 10)
        }
      }
    }

    setSaving(true);

    // @TODO HANDLE SAVING AND STUFF!
    if (selectedAutomationToView && selectedAutomationToView.id && method !== "edit_save_as_new") {
      fetchData({
        path: `${API_BASE_URL}/${API_VERSION}/salesCollection/notifications/${selectedAutomationToView.id}`,
        method: 'PATCH',
        stringifiedBody: JSON.stringify(bodyOfDataToSend),
      }).then(() => {
        setSaving(false);
        setSavingProgress('new_automation_created_close')
      }).catch(() => {
        setErrorOccurred(true)
      }).finally(() => {
        setSaving(false);
      })
    } else {
      fetchData({
        path: `${API_BASE_URL}/${API_VERSION}/salesCollection/notifications`,
        method: 'POST',
        stringifiedBody: JSON.stringify(bodyOfDataToSend),
      }).then(() => {
        setSavingProgress('new_automation_created_' + method)
        if (method === "create_another") {
          setTitle("")
          rteRef.current?.editor?.commands.setContent("")
        }
        setSaving(false);
      }).catch(() => {
        setErrorOccurred(true)
      }).finally(() => {
        setSaving(false);
      })
    }
  }

  const shouldDisableSave = () => {



    if (!selectedCampaigns
      || !selectedGroup
      || !rteRef?.current
      || !whatToSend
      || !startDate
      || !endDate
      || !collectionTime) {
      return true
    }

    if (sendPeriodToWho !== 'all_periods' && !selectedPeriodForm) {
      return true
    }

    if (onTheDayOfCollection && !timeScale) {
      return true;
    }

    if (!onTheDayOfCollection && (
      !timeScale ||
      !amount ||
      !sendCollectionBeforeAfter)) {
      return true
    }

    return false
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        gap: 4,
      }}
    >
      <Box>
        <InputLabel
          sx={{
            pb: 1.5,
          }}
        >
          {t('common.date_range')}
        </InputLabel>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <FormControl fullWidth required>
              <MobileDatePicker
                disablePast
                label={t('automations.starts') + ' *'}
                defaultValue={startDate}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e);
                }}
              />
              {!startDate && (
                <FormHelperText id="my-helper-text" error>
                  {t('common.required_field')}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth required>
              <MobileDatePicker
                disablePast
                label={t('automations.ends')}
                defaultValue={endDate}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e);
                }}
              />
              {!endDate && (
                <FormHelperText id="my-helper-text" error>
                  {t('common.required_field')}
                </FormHelperText>
              )}
            </FormControl>
          </LocalizationProvider>
        </Box>
      </Box>
      <FormControl>
        <Autocomplete
          disableClearable
          disablePortal
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, value) => {
            handleCentresChanges(value);
            setSelectedPeriodForm(null);
          }}
          options={CentresList}
          value={selectedCentre as any}
          sx={{ flex: 2 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('chase.automation.choose_centre')}
            />
          )}
        />
        {!selectedCentre && (
          <FormHelperText id="my-helper-text" error>
            {t('common.required_field')}
          </FormHelperText>
        )}
      </FormControl>
      {!loadingCampaigns && (
        <>
          <FormControl>
            <Autocomplete
              disableClearable
              disablePortal
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, value) => {
                handleCampaignChanges(value);
                setSelectedPeriodForm(null);
              }}
              options={CampaignsList}
              value={selectedCampaigns as any}
              sx={{ flex: 2 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('chase.automation.choose_campaign')}
                />
              )}
            />
            {!selectedCampaigns && (
              <FormHelperText id="my-helper-text" error>
                {t('common.required_field')}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2">
              {t('common.select_a_period')}
            </Typography>
            <RadioGroup
              name="controlled-radio-buttons-group-what-to-send"
              sx={{
                display: 'flex',
                flexFlow: 'row',
              }}
              value={sendPeriodToWho}
              onChange={(e) => setSendPeriodToWho(e.target.value)}
            >
              <FormControlLabel
                value="all_periods"
                control={<Radio />}
                label={t('automations.all_periods')}
              />
              <FormControlLabel
                value="individual_period"
                control={<Radio />}
                label={t('automations.individual_period')}
              />
            </RadioGroup>
            {sendPeriodToWho === 'individual_period' &&
              <>
                <Autocomplete
                  disablePortal
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, value) => {
                    handlePeriodFormChanges(value);
                  }}
                  options={[...PeriodFormList]}
                  value={selectedPeriodForm as any}
                  sx={{ flex: 2 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('automations.choose_period')}
                    />
                  )}
                />
                {!selectedPeriodForm && (
                  <FormHelperText id="my-helper-text" error>
                    {t('common.required_field')}
                  </FormHelperText>
                )}
              </>
            }
          </FormControl>
        </>
      )}

      {loadingCampaigns && <Box>{t('common.loading')}...</Box>}

      <Box>
        <InputLabel
          sx={{
            pb: 1.5,
          }}
        >
          {t('chase.automation.what_do_you_want_to_send')}
        </InputLabel>
        <Box>
          <RadioGroup
            name="controlled-radio-buttons-group-what-to-send"
            sx={{
              display: 'flex',
              flexFlow: 'row',
            }}
            value={whatToSend}
            onChange={(e) => setWhatToSend(e.target.value)}
          >
            <FormControlLabel
              value="push"
              control={<Radio />}
              label={t('automations.push_notification')}
            />
            <FormControlLabel
              value="email"
              control={<Radio />}
              label={t('automations.email')}
            />
          </RadioGroup>
        </Box>
      </Box>
      <FormControl fullWidth>
        <TextField
          id="input-with-icon-textfield"
          label={
            whatToSend === 'push'
              ? t('automations.title')
              : t('automations.subject')
          }
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          variant="outlined"
        />
        {!title && (
          <FormHelperText id="my-helper-text" error>
            {t('common.required_field')}
          </FormHelperText>
        )}
      </FormControl>
      <Box>
        <InputLabel
          sx={{
            pb: 1.5,
          }}
        >
          {t('chase.automation.compose_message')}
        </InputLabel>
        {whatToSend === 'email' && (
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column',
              gap: 1,
              pb: 1,
            }}
          >
            <Typography
              variant="caption"
              color="caption"
              sx={{ fontWeight: 'bold' }}
            >
              {t(`automations.placeholders`)}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                ' button': {
                  width: 'max-content',
                },
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  rteRef?.current?.editor?.commands.insertContent(
                    '||recipients_name||'
                  );
                }}
              >
                {t(`automations.recipients_name`)}
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  rteRef?.current?.editor?.commands.insertContent(
                    '||local_name||'
                  );
                }}
              >
                {t(`automations.store_name`)}
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  rteRef?.current?.editor?.commands.insertContent(
                    '||centre_name||'
                  );
                }}
              >
                {t(`automations.centre_name`)}
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  rteRef?.current?.editor?.commands.insertContent(
                    '||campaign_name||'
                  );
                }}
              >
                {t(`automations.campaign_name`)}
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  rteRef?.current?.editor?.commands.insertContent(
                    '||period_form_name||'
                  );
                }}
              >
                {t(`automations.period_form_name`)}
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  rteRef?.current?.editor?.commands.insertContent(
                    '||entry_link||'
                  );
                }}
              >
                {t(`automations.entry_link`)}
              </Button>
            </Box>
          </Box>
        )}

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

      <FormControl fullWidth>
        <Autocomplete
          disableClearable
          disablePortal
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, value) => {
            handleGroupsChanges(value);
          }}
          options={GroupsList}
          value={selectedGroup as any}
          sx={{ flex: 2 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('chase.automation.who_do_you_want_to_send_to')}
            />
          )}
        />
        {!selectedGroup && (
          <FormHelperText id="my-helper-text" error>
            {t('common.required_field')}
          </FormHelperText>
        )}
      </FormControl>

      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={onlyTenantsWhoAreRequired}
              onChange={(e) => setOnlyTenantsWhoAreRequired(e.target.checked)}
            />
          }
          label={t('chase.automation.only_tenants_who_are_required_by_lease')}
        />
      </Box>

      <Box sx={{ display: 'flex' }}>
        <FormControlLabel
          control={
            <Switch
              checked={onTheDayOfCollection}
              onChange={(e) => setOnTheDayOfCollection(e.target.checked)}
            />
          }
          label={t('chase.automation.on_a_day_of_the_collection_at')}
        />
        <FormControl>
          {onTheDayOfCollection && (
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <MobileTimePicker
                label={t('chase.automation.time')}
                disabled={!onTheDayOfCollection}
                views={['hours']}
                value={collectionTime}
                onChange={(e) => {
                  setCollectionTime(e);
                }}
              />
              {!collectionTime && (
                <FormHelperText id="my-helper-text" error>
                  {t('common.required_field')}
                </FormHelperText>
              )}
            </LocalizationProvider>
          )}
        </FormControl>
      </Box>

      {!onTheDayOfCollection && (
        <>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="input-timescale">
                {t('automations.time_scale')}
              </InputLabel>

              <Select
                id="input-timescale"
                label={t('automations.time_scale')}
                value={timeScale}
                onChange={(e) => setTimeScale(e.target.value)}
                required
              >
                <MenuItem value="months">{t('date_time.months')}</MenuItem>
                <MenuItem value="weeks">{t('date_time.weeks')}</MenuItem>
                <MenuItem value="days">{t('date_time.days')}</MenuItem>
              </Select>
              {!timeScale && (
                <FormHelperText id="my-helper-text" error>
                  {t('common.required_field')}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="input-amount">
                {t('automations.amount')}
              </InputLabel>
              <Select
                id="input-timescale"
                label={t('automations.amount')}
                value={amount}
                onChange={(e) => setAmount(e.target.value as any)}
                required
              >
                {[...Array(getMaxAmountValue())].map((_, i) => (
                  <MenuItem value={i + 1}>
                    {i + 1} {t(`date_time.${timeScale}`)}
                  </MenuItem>
                ))}
              </Select>
              {!amount && (
                <FormHelperText id="my-helper-text" error>
                  {t('common.required_field')}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="input-timescale">
                {t('automations.status')}
              </InputLabel>
              <Select
                label={t('automations.status')}
                value={sendCollectionBeforeAfter}
                onChange={(e) => setSendCollectionBeforeAfter(e.target.value)}
                required
              >
                <MenuItem value="before_start">
                  {t('automations.before_start')}
                </MenuItem>
                <MenuItem value="after_started">
                  {t('automations.after_started')}
                </MenuItem>
                <MenuItem value="before_ending">
                  {t('automations.before_ending')}
                </MenuItem>
                <MenuItem value="after_ending">
                  {t('automations.after_ending')}
                </MenuItem>
              </Select>
              {!sendCollectionBeforeAfter && (
                <FormHelperText id="my-helper-text" error>
                  {t('common.required_field')}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <MobileTimePicker
                  label={t('chase.automation.time')}
                  views={['hours']}
                  value={collectionTime}
                  onChange={(e) => {
                    setCollectionTime(e);
                  }}
                />
                {!collectionTime && (
                  <FormHelperText id="my-helper-text" error>
                    {t('common.required_field')}
                  </FormHelperText>
                )}
              </LocalizationProvider>
            </FormControl>
          </Box>
        </>
      )}

      {errorOccurred && (
        <Alert severity="error">{t('automations.error_occurred')}</Alert>
      )}

      {!saving && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'end',
          }}
        >
          {!selectedAutomationToView && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  saveAutomation('create_another');
                }}
                disabled={shouldDisableSave()}
              >
                {t('automations.save_and_create')}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  saveAutomation('close');
                }}
                disabled={shouldDisableSave()}
              >
                {t('automations.save')}
              </Button>
            </>
          )}
          {selectedAutomationToView !== undefined && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  saveAutomation('edit_save_as_new');
                }}
                disabled={shouldDisableSave()}
              >
                {t('automations.save_as_new')}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  saveAutomation('close');
                }}
                disabled={shouldDisableSave()}
              >
                {t('automations.save')}
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AutomationDetailsBody;
