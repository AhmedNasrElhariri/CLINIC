export const mapArrToChoices = arr =>
  arr.map(i => ({
    label: i,
    value: i,
  }));

export const mapArrWithIdsToChoices = arr =>
  arr.map(currentValue => ({
    label: currentValue.name,
    value: currentValue.id,
  }));

export const mapArrWithLabelsToChoices = arr =>
  arr.map(currentValue => ({
    value: currentValue.name,
    label: currentValue.name,
  }));
