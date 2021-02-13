export const mapObjValuesToChoices = obj =>
  Object.values(obj).map(i => ({
    label: i,
    value: i,
  }));

export const mapArrToChoices = arr =>
  arr.map(i => ({
    label: i,
    value: i,
  }));

export const mapArrWithIdsToChoices = (arr = []) =>
  arr.map(currentValue => ({
    label: currentValue.name,
    value: currentValue.id,
  }));

export const mapArrWithLabelsToChoices = arr =>
  arr.map(currentValue => ({
    value: currentValue.name,
    label: currentValue.name,
  }));

export const toUpperCase = str => {
  return str.replace(
    /^[a-z]|[A-Z]/g,
    (c, i) => (i ? ' ' : '') + c.toUpperCase()
  );
};

export const convertActionsToEntities = arr =>
  arr.map(val => {
    const [name, subject] = val.split('_');
    return {
      id: val,
      name: toUpperCase(name),
      subject: toUpperCase(subject),
    };
  });
