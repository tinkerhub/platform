export type Child = {
  children: React.ReactNode;
};

interface Skill {
  name: string;
  id: string;
}

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
  skills?: Skill[];
  street?: string;
  campusCommunityActive: boolean;
  id: string;
  passYear?: number;
  college?: Skill;
};

export interface Errors {
  message: string;
}
