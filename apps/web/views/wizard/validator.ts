import * as Yup from 'yup';
import { OptionalObjectSchema } from 'yup/lib/object';

const PickAnOptionValidator = Yup.object({
  value: Yup.string().required(),
  label: Yup.string().required(),
}).nullable();

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
  // Mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
  CampusCommunityActive: Yup.object()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
  describe: PickAnOptionValidator.nullable().required('Please pick an option'),
  My_Skills: Yup.array()
    .nullable()
    .max(5, 'Pick 5 skills maximum')
    .of(
      Yup.object().shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
    ),
  Mentor: Yup.boolean()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Professional',
      then: Yup.boolean().required(),
    }),
  College: Yup.object()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
  House_Name: Yup.string(),
  Street: Yup.string(),
  District: PickAnOptionValidator.nullable(),
  Pincode: Yup.string(),
  Passout: Yup.object()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
});

export const firstFormValidator = Yup.object({
  FullName: Yup.string().required(requiredErrorStatement('full name')),
  DOB: Yup.string()
    .typeError('Please provide a valid Date')
    .required(requiredErrorStatement('DOB')),
  Email: Yup.string().email().required(requiredErrorStatement('email')),
  Pronoun: PickAnOptionValidator.nullable().required('Please pick an option'),
  // Mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
});
export const secondValidator = Yup.object({
  CampusCommunityActive: Yup.object()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
  Pronoun: PickAnOptionValidator.nullable().required('Please pick an option'),
  describe: PickAnOptionValidator.nullable().required('Please pick an option'),
  My_Skills: Yup.array()
    .nullable()
    .max(5, 'Pick 5 skills maximum')
    .of(
      Yup.object().shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
    ),
  Mentor: Yup.boolean()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Professional',
      then: Yup.boolean().required(),
    }),
  College: Yup.object()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
  Passout: Yup.object()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
});

export const thirdValidator = Yup.object({
  House_Name: Yup.string(),
  Street: Yup.string(),
  District: PickAnOptionValidator.nullable(),
  Pincode: Yup.string(),
});

export const stepByStepValidator: Record<number, OptionalObjectSchema<any>> = {
  1: firstFormValidator,
  2: secondValidator,
  3: thirdValidator,
};
