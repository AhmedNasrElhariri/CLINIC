import { areas } from './areas';
export const getArea = area => {
  const areaName = areas.find(e => e.id == area);
  if (areaName) {
    return areaName.city_name_en;
  } else {
    return '';
  }
};
