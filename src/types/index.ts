export type Child = {
  children: React.ReactNode;
};

export interface Errors {
  message: string;
}

export interface Form {
  name: string;
  passYear: number | null;
  description: string;
  dob: Date;
  email: string;
  pronoun: string;
  mobile: string;
  collegeId: string | null;
  mentor: boolean;
  accept: boolean | null;
  house: string | null;
  district: string | null;
  pin: string | null;
  skills: Skill[] | [];
  street: string | null;
  campusCommunityActive: boolean;
  id: string;
  college: Skill | null;
}

export interface Skill {
  name: string;
  id: string;
}
