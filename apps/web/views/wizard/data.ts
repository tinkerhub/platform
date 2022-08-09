/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const getNextNYears = (numberOfYears: number): string[] => {
  const presentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < numberOfYears; i + 1) {
    years.push(String(presentYear + i));
  }
  return years;
};

export const wizardStepOneFormFields = [
  {
    type: 'textfield',
    label: 'Mobile Number',
    helperText: 'Please enter your 10 digit mobile number',
    name: 'MobileNumber',
    disabled: true,
  },
  {
    type: 'textfield',
    label: 'My full name is',
    helperText: 'eg: Aaron Hillel Swartz',
    name: 'FullName',
  },
  {
    type: 'date',
    label: 'I was born on',
    name: 'DOB',
    placeholder: 'DD-MM-YYYY',
    defaultValue: '',
  },
  {
    type: 'textfield',
    label: 'My email address is',
    name: 'Email',
  },
  {
    type: 'select',
    label: 'I prefer to use the pronoun',
    name: 'Pronoun',
    options: [
      { value: 'He/Him', label: 'He/Him' },
      { value: 'She/Her', label: 'She/Her' },
      { value: 'They/Them', label: 'They/Them' },
    ],
    optionValue: (option: any): string => option.value,
    optionLabel: (option: any): string => `${option.label}`,
  },
];

/**
 * This kinda split is applied for conditional based form
 */
export const wizardStepTwoFormFields = {
  isStudent: {
    type: 'select',
    label: 'I want to be part of TinkerHub Foundation and the best way to describe me is',
    name: 'RegistrationType',
    options: [
      { value: 'Student', label: 'Student' },
      { value: 'Professional', label: 'Professional' },
    ],
    optionValue: (option: any): string => option.value,
    optionLabel: (option: any): string => `${option.label}`,
  },
  canBeMentor: {
    type: 'select',
    label: 'Can you be a mentor',
    name: 'Mentor',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    optionValue: (option: any): string => option.value,
    optionLabel: (option: any): string => `${option.label}`,
  },
  heardAboutCampusCommunity: {
    type: 'select',
    label: 'TinkerHub Campus Community is',
    name: 'CampusCommunityActive',
    options: [
      { value: 'Yes', label: 'Yes, there is an active community' },
      { value: 'No', label: 'Nope, I never heard about TinkerHub community in my college' },
    ],
    optionValue: (option: any): string => option.value,
    optionLabel: (option: any): string => `${option.label}`,
  },
  collegeList: {
    type: 'select',
    label: 'Select your college community from this list',
    name: 'College',
    options: [],
    optionValue: (option: any): string => option.id,
    optionLabel: (option: any): string => `${option.name}`,
  },
  studentDetails: [
    {
      type: 'select',
      label: 'My stream of study is',
      name: 'StudyStream',
      options: [
        { value: 'BTech', label: 'BTech' },
        { value: 'Polytechnic', label: 'Polytechnic' },
        { value: 'Bachelor of Science', label: 'Bachelor of Science' },
        {
          value: 'High School / Higher Secondary',
          label: 'High School / Higher Secondary',
        },
        { value: 'Bachelor of Arts', label: 'Bachelor of Arts' },
        {
          value: 'Post Graduation Programs',
          label: 'Post Graduation Programs',
        },
      ],
      optionValue: (option: any): string => option.value,
      optionLabel: (option: any): string => `${option.label}`,
    },
    {
      type: 'select',
      label: "As of now, I'll be graduating on",
      name: 'GraduationDate',
      options: getNextNYears(5).map((el) => ({ value: el, label: el })),
      optionValue: (option: any): string => option.value,
      optionLabel: (option: any): string => `${option.label}`,
    },
  ],
};

export const wizardStepThreeFormFields = {
  skills: {
    type: 'select',
    label: 'Skill',
    name: 'My_Skills',
    helperText: (isMentor: boolean) => (isMentor ? 'You can mentor students in' : 'Your good at'),
    optionValue: (option: any): string => option.id,
    optionLabel: (option: any): string => `${option.name}`,
  },
  address: [
    {
      type: 'textfield',
      label: 'House Name',
      name: 'House_Name',
    },
    {
      type: 'textfield',
      label: 'Street Name',
      name: 'Street',
    },
    {
      type: 'select',
      label: 'District',
      name: 'District',
      options: [
        { value: 'Alappuzha', label: 'Alappuzha' },
        { value: 'Ernakulam', label: 'Ernakulam' },
        { value: 'Idukki', label: 'Idukki' },
        { value: 'Kannur', label: 'Kannur' },
        { value: 'Kasaragod', label: 'Kasaragod' },
        { value: 'Kollam', label: 'Kollam' },
        { value: 'Kottayam', label: 'Kottayam' },
        { value: 'Kozhikode', label: 'Kozhikode' },
        { value: 'Malappuram', label: 'Malappuram' },
        { value: 'Palakkad', label: 'Palakkad' },
        { value: 'Pathanamthitta', label: 'Pathanamthitta' },
        { value: 'Thiruvananthapuram', label: 'Thiruvananthapuram' },
        { value: 'Thrissur', label: 'Thrissur' },
        { value: 'Wayanad', label: 'Wayanad' },
      ],
      optionValue: (option: any): string => option.value,
      optionLabel: (option: any): string => `${option.label}`,
    },
    {
      type: 'textfield',
      label: 'Pincode',
      name: 'Pincode',
    },
  ],
};
