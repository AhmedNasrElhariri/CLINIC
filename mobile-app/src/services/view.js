import * as R from 'ramda';

export const mapLanesToGroupFields = lanes => {
  return lanes.map(({ cards, title, id, isNew }, idx) =>
    Object.assign({}, !isNew && { id }, {
      name: title,
      order: idx,
      fields: cards.map((c, cIdx) =>
        Object.assign({}, !c.isNew && { id: c.id }, {
          ...R.pick(['name', 'type', 'required'])(c),
          order: cIdx,
        })
      ),
    })
  );
};

export const mapGroupFieldsToLanes = groups => {
  return groups.map(({ id, name, fields }) => ({
    id,
    title: name,
    isNew: false,
    cards: fields.map(f => ({ ...f, laneId: id })),
  }));
};
