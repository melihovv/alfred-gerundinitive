const alfy = require('alfy');
const dictionary = require('./dictionary');

const args = process.argv.slice(2);

if (args.length < 1) {
  return alfy.output([]);
}

const verb = args[0];
const matchedVerbs = alfy.matches(verb, Object.keys(dictionary));

if (matchedVerbs.length === 0) {
  return alfy.output([]);
}

const output = matchedVerbs
  .map(verb => {
    const verbData = dictionary[verb];

    return Object.keys(verbData)
      .map(rule => {
        return verbData[rule]['examples']
          .map(example => ({
            title: `${verb} - ${rule}`,
            subtitle: example,
            arg: verb,
          }))
      })
      .flat();
  })
  .flat();

alfy.output(output);
