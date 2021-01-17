import { mapArrToChoices } from 'utils/misc';

export const getUserTypes = () => ['Doctor', 'Assistant'];
export const userTypes = mapArrToChoices(getUserTypes());
export const getSpecialtyTypes = () => ['قلب', 'جراحة', 'عظام'];
export const specialtyTypes = mapArrToChoices(getSpecialtyTypes());
