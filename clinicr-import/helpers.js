const crypto = require('crypto');

const uuid = () => crypto.randomUUID();
const split = (list, chunkSize) => {
  return [...Array(Math.ceil(list.length / chunkSize))].map(_ =>
    list.splice(0, chunkSize)
  );
};

module.exports = {
  uuid,
  split,
};
