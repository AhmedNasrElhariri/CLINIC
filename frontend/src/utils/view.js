import * as R from 'ramda';

export const mapLanesToGroupFields = (lanes, lanesStatus) => {
  return lanes.map(({ cards, title, id, isNew }, idx) =>
    Object.assign({}, !isNew && { id }, {
      name: title,
      status: lanesStatus[id],
      order: idx,
      fields: cards.map((c, cIdx) =>
        Object.assign({}, !c.isNew && { id: c.id }, {
          ...R.pick(['name', 'type', 'choices', 'dynamic', 'choicesType'])(c),
          order: cIdx,
        })
      ),
    })
  );
};

export const mapGroupFieldsToLanes = groups => {
  return groups.map(({ id, name, status, fields }) => ({
    id,
    title: name,
    isNew: false,
    status: status,
    cards: fields.map(f => ({ ...f, laneId: id })),
  }));
};
