export const mapObjValuesToChoices = obj =>
  Object.values(obj).map(i => ({
    name: i,
    id: i,
  }));

export const mapArrToChoices = arr =>
  arr.map(i => ({
    label: i,
    value: i,
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
