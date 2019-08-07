
export const NURSE_ADD_SPECIALTY = 'NURSE_ADD_SPECIALTY';
export const nurseAddSpecialty = (specialtyId) => ({ type: NURSE_ADD_SPECIALTY, specialtyId });

export const NURSE_REMOVE_SPECIALTY = 'NURSE_REMOVE_SPECIALTY';
export const nurseRemoveSpecialty = (specialtyId) => ({ type: NURSE_REMOVE_SPECIALTY, specialtyId });

export const NURSE_SET_ROOT_SPECIALTY = 'NURSE_SET_ROOT_SPECIALTY';
export const nurseSetRootSpecialty = (specialtyId) => ({ type: NURSE_SET_ROOT_SPECIALTY, specialtyId });
