/**
 * Use CoreNLP to annotate text.
 *
 * For more information, check out https://stanfordnlp.github.io/CoreNLP/
 *
 * @alpha
 * @service
 * @category Language
 */

const axios = require('axios');
const CoreNLP = {};
const {CORE_NLP_HOST='https://corenlp.run'} = process.env;

/*
 * Get a list of all supported annotators.
 *
 * Complete list available at https://stanfordnlp.github.io/CoreNLP/annotators.html
 */
CoreNLP.getAnnotators = function() {
    return [
        'tokenize',
        'cleanxml',
        'docdate',
        'ssplit',
        'pos',
        'lemma',
        'ner',
        'entitymentions',
        'regexner',
        'tokensregex',
        'parse',
        'depparse',
        'coref',
        'dcoref',
        'relation',
        'natlog',
        'openie',
        'entitylink',
        'kbp',
        'quote',
        'quote.attribution',
        'sentiment',
        'truecase',
        'udfeats',
    ];
};

/**
 * Annotate text using the provided annotators.
 *
 * @param{String} text
 * @param{Array<String>=} annotators
 */
CoreNLP.annotate = async function(text, annotators=['tokenize', 'ssplit', 'pos']) {
    const qsData = JSON.stringify({
        annotators: annotators.join(','),
        outputFormat: 'json',
    });
    const url = `${CORE_NLP_HOST}?properties=${qsData}`;
    const response = await axios.post(url, text);
    return response.data;
};

CoreNLP.serviceName = 'CoreNLP';
module.exports = CoreNLP;
