const inquirer = require('inquirer');
const Adapter = require('./adapter');

/**
 * Shell Adapter.
 */
class ShellAdapter extends Adapter {
  constructor(bot, config) {
    super(bot, config);
    this.userId = 'USER_1';
  }

  async run() {
    console.log('ShellAdapter.run');
    await this.bot.brain.initUserIfNecessary(this.userId);
    const userMessage = await this.send([{
      userId: this.userId,
      botId: this.config.id,
      type: 'text',
      payload: 'onboarding', // TODO: use a dialog instead?
    }]);
    this.loop(userMessage);
  }

  async loop(userMessage) {
    console.log('ShellAdapter.loop', userMessage);
    userMessage.type = 'text';
    userMessage.userId = this.userId;
    userMessage.botId = this.bot.id;
    userMessage.origin = 'user';
    this.loop(await this.bot.sendResponse(userMessage));
  }

  async send(botMessages) {
    console.log('ShellAdapter.send', botMessages);
    const message = botMessages.map(botMessage => botMessage.payload).join(' ');
    // type text
    return inquirer.prompt([
      {
        type: 'input',
        name: 'payload',
        message,
      },
    ]);
  }
}

module.exports = ShellAdapter;
