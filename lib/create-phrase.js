var Phrase = require('./phrase');
var LaconaError = require('./error');
var _ = require('lodash');

function createPhraseFactory(obj) {
  function phraseFactory(props) {
    var phrase = new Phrase(obj, props, phraseFactory);

    return phrase;
  }

  //set some properties on the factory, so they can be used for
  // extension and precidence
  phraseFactory.extends = obj.extends || [];
  phraseFactory.overrides = obj.overrides || [];
  phraseFactory.elementName = obj.name;

  return phraseFactory;
}

function createPhrase(obj) {
  var workingObj = _.omit(obj, ['translations', 'describe']);
  var hasDefault = false;

  //objects must have a name
  if (!obj.name) {
    throw new LaconaError('Phrase must have a name');
  }

  if (!obj._handleParse) {
    workingObj.translations = obj.translations || [{langs: ['default'], describe: obj.describe}];

    workingObj.translations.forEach(function (schema) {
      if (!schema.describe) {
        throw new LaconaError('Every phrase must have a describe method, or translations with describe methods');
      }

      if (!schema.langs) {
        throw new LaconaError('Every schema must have a langs property, and array of languages');
      }

      if (schema.langs.indexOf('default') > -1) {
        hasDefault = true;
      }
    });

    if (!hasDefault) {
      throw new LaconaError('Phrase must have a describe method defined for the default language');
    }
  }

  return createPhraseFactory(workingObj);
}

module.exports = createPhrase;