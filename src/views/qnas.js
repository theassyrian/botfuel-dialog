/**
 * Copyright (c) 2017 - present, Botfuel (https://www.botfuel.io).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const logger = require('logtown')('QnasView');
const { ActionsMessage, BotTextMessage, Postback } = require('../messages');
const View = require('./view');

/**
 * Qnas dialog's view.
 * @extends View
 */
class QnasView extends View {
  // eslint-disable-next-line require-jsdoc
  render(key, data) {
    logger.debug('render', key, data);
    switch (key) {
      case 'answer':
        return this.renderAnswer(data.answer);
      case 'questions':
        return this.renderQuestions(data.qnas);
      default:
        return null;
    }
  }

  /**
   * Renders an answer.
   * @private
   * @param {String} answer - the answer
   * @returns {BotTextMessage[]} the answer as a text message
   */
  renderAnswer(answer) {
    logger.debug('renderAnswer', answer);
    return [
      new BotTextMessage(answer),
    ];
  }

  /**
   * Renders the questions.
   * @private
   * @param {Object[]} qnas - the qnas
   * @returns {Object[]} the questions as messages
   */
  renderQuestions(qnas) {
    logger.debug('renderQuestions', qnas);
    const postbacks = qnas.map(qna => new Postback(
      qna.questions[0],
      'qnas-dialog',
      [{
        dim: 'qnas',
        value: [{ answer: qna.answer }],
      }],
    ));
    return [
      new BotTextMessage('What do you mean?'),
      new ActionsMessage(postbacks),
    ];
  }
}

module.exports = QnasView;
