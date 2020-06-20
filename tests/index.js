const test = require('ava');
const alfyTest = require('alfy-test');
const consts = require('../src/consts');

test('It shows what might be used after given verb', async t => {
  const alfy = alfyTest();

  const result = await alfy('sto');

  t.deepEqual(result, [
    {
      title: `accustomed to - ${consts.ADJECTIVE_PREPOSITION_COMBINATIONS_FOLLOWED_BY_GERUNDS}`,
      subtitle: 'He is accustomed to having his own office.',
      arg: 'accustomed to',
    },
    {
      title: `stop - ${consts.GERUND}`,
      subtitle: 'She stopped working at 5 o\'clock.',
      arg: 'stop',
    },
    {
      title: `stop - ${consts.VERBS_FOLLOWED_BY_GERUNDS_OR_INFINITIVES_DIFFERENT_MEANING}`,
      subtitle: 'He stopped smoking for health reasons.',
      arg: 'stop',
    },
    {
      title: `stop - ${consts.VERBS_FOLLOWED_BY_GERUNDS_OR_INFINITIVES_DIFFERENT_MEANING}`,
      subtitle: '"Stop" is normally used with a gerund.',
      arg: 'stop',
    },
    {
      title: `stop - ${consts.VERBS_FOLLOWED_BY_GERUNDS_OR_INFINITIVES_DIFFERENT_MEANING}`,
      subtitle: 'He stopped to rest for a few minutes.',
      arg: 'stop',
    },
    {
      title: `stop - ${consts.VERBS_FOLLOWED_BY_GERUNDS_OR_INFINITIVES_DIFFERENT_MEANING}`,
      subtitle: 'When \"stop\" is used with an infinitive, the infinitive takes on the meaning of \"in order to.\"',
      arg: 'stop',
    },
    {
      title: `story about - ${consts.NOUN_PREPOSITION_COMBINATIONS_FOLLOWED_BY_GERUNDS}`,
      subtitle: 'I don\'t know if I believe his story about seeing a UFO.',
      arg: 'story about',
    },
  ]);
});

test('It does not show anything for verb, which has no rules', async t => {
  const alfy = alfyTest();

  const result = await alfy('bear');

  t.deepEqual(result, []);
});
