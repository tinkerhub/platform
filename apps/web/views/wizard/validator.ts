import * as Yup from 'yup';

const PickAnOptionValidator = Yup.object()
  .shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  })
  .nullable();

export type Option = {
  label: string;
  value: string;
};

const requiredErrorStatement = (value: string): string => `Please type your ${value}`;

export const registerFormValidator = Yup.object({
  FullName: Yup.string().required(requiredErrorStatement('full name')),
  DOB: Yup.date().typeError('Please provide a valid Date').required(requiredErrorStatement('DOB')),
  Email: Yup.string().email().required(requiredErrorStatement('email')),
  Pronoun: PickAnOptionValidator.nullable().required('Please pick an option'),
  Mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
  CampusCommunityActive: Yup.object()
    .nullable()
    .when('RegistrationType', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
  describe: PickAnOptionValidator.nullable().required('Please pick an option'),
  College: Yup.object().when('CampusCommunityActive', {
    is: (val: Option) => val?.value === 'Yes',
    then: Yup.object()
      .shape({
        id: Yup.string().required(),
        name: Yup.string().required(),
      })
      .nullable()
      .required('Please pick a college'),
  }),
  StudyStream: Yup.object().when('RegistrationType', {
    is: (val: Option) => val?.value === 'Student',
    then: PickAnOptionValidator.required(),
  }),
  GraduationDate: Yup.object().when('RegistrationType', {
    is: (val: Option) => val?.value === 'Student',
    then: PickAnOptionValidator.required(),
  }),
  Mentor: Yup.object()
    .nullable()
    .when('RegistrationType', {
      is: (val: Option) => val?.value === 'Professional',
      then: PickAnOptionValidator.required(),
    }),
  RegistrationType: PickAnOptionValidator.nullable().required('Please pick an option'),
  FreshCollege: Yup.string()
    .nullable()
    .when('CampusCommunityActive', {
      is: (val: Option) => val?.value === 'No',
      then: Yup.string().required('Type your college name'),
    }),
  accept: Yup.boolean().required(),
  My_Skills: Yup.array()
    .nullable()
    .max(5, 'Pick 5 skills maximum')
    .of(
      Yup.object().shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
    ),
  House_Name: Yup.string(),
  Street: Yup.string(),
  District: PickAnOptionValidator.nullable(),
  Pincode: Yup.string(),
});

export const firstFormValidator = Yup.object({
  FullName: Yup.string().required(requiredErrorStatement('full name')),
  DOB: Yup.date().typeError('Please provide a valid Date').required(requiredErrorStatement('DOB')),
  Email: Yup.string().email().required(requiredErrorStatement('email')),
  Pronoun: PickAnOptionValidator.nullable().required('Please pick an option'),
  Mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
  CampusCommunityActive: Yup.object()
    .nullable()
    .when('RegistrationType', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
});
export const secondValidator = Yup.object({
  Pronoun: PickAnOptionValidator.nullable().required('Please pick an option'),
  My_Skills: Yup.array()
    .nullable()
    .max(5, 'Pick 5 skills maximum')
    .of(
      Yup.object().shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
    ),
  Mentor: Yup.object()
    .nullable()
    .when('RegistrationType', {
      is: (val: Option) => val?.value === 'Professional',
      then: PickAnOptionValidator.required(),
    }),
  College: Yup.object().when('CampusCommunityActive', {
    is: (val: Option) => val?.value === 'Yes',
    then: Yup.object()
      .shape({
        id: Yup.string().required(),
        name: Yup.string().required(),
      })
      .nullable()
      .required('Please pick a college'),
  }),
});

export const thirdValidator = Yup.object({
  District: PickAnOptionValidator.nullable(),
});
