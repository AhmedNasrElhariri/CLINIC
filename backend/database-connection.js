const fs = require('fs');

const fileName = process.env.ENV_FILE;

console.log(fileName);

const data = fs.readFileSync(fileName);

fs.writeFileSync('./prisma/.env', data, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
