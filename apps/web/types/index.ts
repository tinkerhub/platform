export type Child = {
  children: React.ReactNode;
};

export interface Errors {
  message: string;
}

export interface Clg {
  name: string;
  id: string;
}

export type Form = {
  name: string;
  passYear?: number;
  description: string;
  dob: Date;
  email: string;
  pronoun: string;
  mobile: string;
  collegeId?: string;
  mentor?: boolean;
  accept?: boolean;
  house?: string;
  district?: string;
  pin?: string;
  skills?: Skill[];
  street?: string;
  campusCommunityActive: boolean;
  id: string;
  college?: Skill;
};

interface Skill {
  name: string;
  id: string;
}
