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
  name: Yup.string().required(requiredErrorStatement('full name')),
  dob: Yup.date().typeError('Please provide a valid Date').required(requiredErrorStatement('DOB')),
  email: Yup.string().email().required(requiredErrorStatement('email')),
  pronoun: PickAnOptionValidator.nullable().required('Please pick an option'),
  // Mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
  description: PickAnOptionValidator.nullable().required('Please pick an option'),
  skills: Yup.array()
    .nullable()
    .max(5, 'Pick 5 skills maximum')
    .of(
      Yup.object().shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
    ),
  mentor: Yup.boolean()
    .nullable()
    .when('description', {
      is: (val: Option) => val?.value === 'Professional',
      then: Yup.boolean().required(),
    }),
  collegeId: Yup.object()
    .nullable()
    .when('description', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
  house: Yup.string(),
  street: Yup.string(),
  district: PickAnOptionValidator.nullable(),
  pin: Yup.string(),
  passYear: Yup.object()
    .nullable()
    .when('description', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
});

export const firstFormValidator = Yup.object({
  name: Yup.string().required(requiredErrorStatement('full name')),
  dob: Yup.string()
    .typeError('Please provide a valid Date')
    .required(requiredErrorStatement('DOB')),
  email: Yup.string().email().required(requiredErrorStatement('email')),
  pronoun: PickAnOptionValidator.nullable().required('Please pick an option'),
  // Mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
});
export const secondValidator = Yup.object({
  description: PickAnOptionValidator.nullable().required('Please pick an option'),
  pronoun: PickAnOptionValidator.nullable().required('Please pick an option'),
  skills: Yup.array()
    .nullable()
    .max(5, 'Pick 5 skills maximum')
    .of(
      Yup.object().shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
    ),
  mentor: Yup.boolean()
    .nullable()
    .when('description', {
      is: (val: Option) => val?.value === 'Professional',
      then: Yup.boolean().required(),
    }),
  collegeId: Yup.object()
    .nullable()
    .when('describe', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
  passYear: Yup.object()
    .nullable()
    .when('description', {
      is: (val: Option) => val?.value === 'Student',
      then: PickAnOptionValidator.nullable().required(
        requiredErrorStatement('Please pick an option')
      ),
    }),
});

export const thirdValidator = Yup.object({
  house: Yup.string(),
  street: Yup.string(),
  district: PickAnOptionValidator.nullable(),
  pin: Yup.string(),
});

export const stepByStepValidator: Record<number, OptionalObjectSchema<any>> = {
  1: firstFormValidator,
  2: secondValidator,
  3: thirdValidator,
};
