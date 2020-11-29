import { mapArrToChoices } from 'utils/misc';

export const getUserTypes = () => ['Doctor', 'Assistant'];
export const userTypes = mapArrToChoices(getUserTypes());
export const getSpecializationTypes = () => ['قلب', 'جراحة', 'عظام'];
export const specializationTypes = mapArrToChoices(getSpecializationTypes());
