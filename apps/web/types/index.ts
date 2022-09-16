export type Child = {
  children: React.ReactNode;
};
enum Act {
  'Yes',
  'No',
}

export type Form = {
  name?: string;
  dob?: Date;
  email?: string;
  pronoun?: string;
  mobile?: string;
  campus?: string;
  desc?: string;
  mentor?: boolean;
  accept?: boolean;
  house?: string;
  district?: string;
  pin?: string;
  skills?: string[];
  street?: string;
  CampusCommunityActive: Act;
  id?: string;
};

export interface Errors {
  message: string;
}
