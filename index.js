const Kahoot = require("kahoot.js-updated");
const settings = require('./settings.json');
const Chance = require('chance');
const chance = new Chance();
const readline = require("readline");
var colors = require('colors');
colors.setTheme({
  custom: ['random']
});
const readlines = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
colors.enable();
console.log('Hell Yea it works!'.custom);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomName() {
    var length = 8,
        charset = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", // словарь
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

readlines.question("GamePIN?: ", (pin) => {
    var splits2 = pin.split(",")
    const pick = splits2[0];
    const bots = [...Array(50).keys()].map((i) => {
      const client = new Kahoot();
      const name = settings.random_Name ? chance.Name() : settings.bot_name+i;
      client.join(pick,name)
      client.on("Joined", () => {
       console.log(`I have logged in as ${name}`);
      });
      client.on("QuestionStart", question => {
        question.answer(getRandomInt(4));
        console.log("Answered.")
      });

    });
  });

