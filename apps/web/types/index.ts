export type Child = {
  children: React.ReactNode;
};

export type Form = {
  name: string;
  dob: Date;
  email: string;
  pronoun: string;
  mobile: string;
  collegeId?: string;
  description: string;
  mentor?: boolean;
  accept?: boolean;
  house?: string;
  district?: string;
  pin?: string;
  skills?: string[];
  street?: string;
  CampusCommunityActive: boolean;
  id: string;
  passYear?: number;
};

export interface Errors {
  message: string;
}
