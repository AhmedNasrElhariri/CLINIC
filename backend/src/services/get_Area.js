import { areas } from './areas';
export const getArea = area => {
  const areaName = areas.find(e => e.id == area);
  return areaName.city_name_en;
};
