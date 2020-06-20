const fs = require('fs');

const rules = require('./rules');
const consts = require('./consts');

const dictionary = {};

rules.forEach(rule => {
  const ruleTitles = [
    consts.GERUND,
    consts.INFINITIVE,
    consts.VERB_REQUIRED_NOUN_INFINITIVE,
    consts.VERB_OPTIONAL_NOUN_INFINITIVE,
    consts.GERUND_OR_NOUN_INFINITIVE,
    consts.ADJECTIVE_PREPOSITION_COMBINATIONS_FOLLOWED_BY_GERUNDS,
    consts.NOUN_PREPOSITION_COMBINATIONS_FOLLOWED_BY_GERUNDS,

    consts.VERBS_FOLLOWED_BY_GERUNDS_OR_INFINITIVES_SIMILAR_MEANING,
    consts.GO_GERUND,
    consts.BE_ADJECTIVE_COMBINATIONS_FOLLOWED_BY_INFINITIVES,
    consts.NOUNS_FOLLOWED_BY_INFINITIVES,
    consts.EXPRESSIONS_FOLLOWED_BY_VERB_ING,
    consts.LOCATION_VERBS_FOLLOWED_BY_VERB_ING,
  ];

  if (ruleTitles.includes(rule.title)) {
    rule.verbs.forEach(([verb, example1, example2]) => {
      if (dictionary[verb] === undefined) {
        dictionary[verb] = {};
      }

      if (rule.title === consts.GO_GERUND) {
        dictionary[verb][rule.title] = {examples: [capitalizeFirstLetter(verb)]}
      } else {
        dictionary[verb][rule.title] = {examples: [example1, example2].filter(value => value)}
      }
    });
  } else if (rule.title === consts.VERBS_FOLLOWED_BY_GERUNDS_OR_INFINITIVES_DIFFERENT_MEANING) {
    rule.verbs.forEach(([verb, examples]) => {
      dictionary[verb][rule.title] = {
        examples: [
          examples[consts.GERUND][0][0],
          examples[consts.GERUND][0][1],
          examples[consts.INFINITIVE][0][0],
          examples[consts.INFINITIVE][0][1],
        ],
      };
    });
  }
});

const dictionarySortedByKey = {};

Object.keys(dictionary).sort().forEach(key => dictionarySortedByKey[key] = dictionary[key]);

fs.writeFileSync(`${__dirname}/dictionary.json`, JSON.stringify(dictionarySortedByKey));

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
