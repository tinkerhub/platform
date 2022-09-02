import { OptionBase } from 'chakra-react-select';

export interface Options extends OptionBase {
  label: string;
  value: string;
}

export interface IsEdit {
  edit: boolean;
}

export const PronounOpt: Options[] = [
  { label: 'He/Him', value: 'He/Him' },
  { label: 'She/Her', value: 'She/Her' },
  { label: 'They/Them', value: 'They/Them' },
];
