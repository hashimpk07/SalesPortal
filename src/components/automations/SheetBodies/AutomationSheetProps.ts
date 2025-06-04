import { AutomatedCompletedProps } from '../../../store/automationsStore.ts';

interface AutomationBaseSheetProps {
    centre: AutomatedCompletedProps;
    selectedAutomationToView?: unknown;
    centres: unknown[];
}

interface AutomationSheetProps extends AutomationBaseSheetProps {
    setSelectedAutomationToView?: (a: unknown) => void;
    campaigns: unknown[];
    periodForms: unknown[];
    groups: any[];
    openCreate?: boolean;
    setIsOpenCreate?: (a: boolean) => void;
}

export type { AutomationBaseSheetProps, AutomationSheetProps };
