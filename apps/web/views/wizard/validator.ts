/* eslint-disable no-extra-boolean-cast */
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
    .max(5, 'Pick 5 skills maximum')
    .of(
      Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .when('description', {
          is: (val: Option) => val?.value === 'Student',
          otherwise: (schema) => schema.notRequired(),
        })
    )
    .default([]),
  mentor: Yup.string()
    .nullable()
    .when('description', {
      is: (val: Option) => val?.value === 'Professional',
      then: Yup.string().required(),
    }),
  collegeId: Yup.object({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).when('description', {
    is: (val: Option) => val?.value === 'Student',
    otherwise: (schema) => schema.notRequired(),
  }),
  house: Yup.string(),
  street: Yup.string(),
  district: PickAnOptionValidator.nullable(),
  pin: Yup.string()
    .notRequired()
    .min(6)
    .max(6)
    .nullable()
    .transform((value) => (!!value ? value : null)),
  passYear: Yup.object({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).when('description', {
    is: (val: Option) => val?.value === 'Student',
    otherwise: (schema) => schema.notRequired(),
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
  mentor: Yup.string()
    .nullable()
    .when('description', {
      is: (val: Option) => val?.value === 'Professional',
      then: Yup.string().required(),
    }),
  collegeId: Yup.object()
    .nullable()
    .when('description', {
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
  pin: Yup.string()
    .notRequired()
    .min(6)
    .max(6)
    .nullable()
    .transform((value) => (!!value ? value : null)),
});

export const stepByStepValidator: Record<number, OptionalObjectSchema<any>> = {
  1: firstFormValidator,
  2: secondValidator,
  3: thirdValidator,
};

// phone number validation for login page

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const phoneNumber = Yup.object({
  phoneNumber: Yup.string()
    .required()
    .min(10)
    .max(10)
    .matches(phoneRegExp, 'Phone number is not valid'),
});

export const OTP = Yup.object({
  otp: Yup.string().min(6).max(6).required('Please Enter a valid otp'),
});
