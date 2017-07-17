var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");

var BoyBandsQuiz = [
	new BasicCard("Who sang 'Bye Bye Bye?", "*NSYNC"),
	new ClozeCard("Backstreet Boys sang 'Larger than Life", "Backstreet Boys"),
	new BasicCard("This band was on X-Factor and wrote 'Night Changes'", "One Direction"),
	new ClozeCard("Boyz II Men sang 'I\'ll Make Love to You'", "Boyz II Men"),
	new BasicCard("Who sung 'All or Nothing?", "O-Town"),
	new ClozeCard("Nickelback is best known for their song 'Photograph'", "Nickelback"),
	new BasicCard("This band\n's lead singer is a team leader on 'The Voice'", "Maroon 5"),
	new ClozeCard("Westlife sang 'Uptown Girl'", "Westlife")
];

//console.log(BoyBandsQuiz)

var count = 0;
function BBQuizStart () {
	if (count<BoyBandsQuiz.length) {
		if (BoyBandsQuiz[count].cardType === "basic") {
			inquirer.prompt([
				{
					name: "question",
					message: BoyBandsQuiz[count].front
				}
			]).then(function(answers) {
				if (answers.question === BoyBandsQuiz[count].back) {
					console.log("-------------------" + "\nYou are correct!" + "\n-------------------");
					count++;
					BBQuizStart();
				} else {
					console.log("-------------------" + "\nSorry, incorrect! The correct answer is " + BoyBandsQuiz[count].back + "\n-------------------");
					count++;
					BBQuizStart();
				}
			});
		} else {
			inquirer.prompt([
				{
					name: "question",
					message: BoyBandsQuiz[count].partial
				}
			]).then(function(answers) {
				if (answers.question === BoyBandsQuiz[count].cloze) {
					console.log("-------------------" + "\nYou are correct!" + "\n-------------------");
					count++;
					BBQuizStart();
				} else {
					console.log("-------------------" + "\nSorry, incorrect! The correct answer is " + BoyBandsQuiz[count].cloze + "\n-------------------");
					count++;
					BBQuizStart();
				}
			});
		}
	} else {
		console.log("Quiz Over!");
	}
}

module.exports = BBQuizStart;