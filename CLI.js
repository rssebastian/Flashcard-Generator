var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var BBQuizStart = require("./BoyBandsQuiz.js");
var inquirer = require("inquirer");

inquirer.prompt([
	{
		name: "cardsOrQuiz",
		message: "Do you want to make cards or take a quiz?",
		choices: ["Make Cards", "Take a Quiz"],
		type: "list"
	}
]).then(function(answers) {
	if (answers.cardsOrQuiz === "Make Cards") {
		var count = 1;
		var quizArray = [];
		var createCards = function() {
			if (count < 11) {
				console.log("------------------ \nCard #" + count);
				inquirer.prompt([
					{
						name: "cardType",
						message: "Basic or Cloze Card?",
						choices: ["Basic", "Cloze"],
						type: "list"

					}
				]).then(function(answers) {
					if (answers.cardType === "Basic") {
						inquirer.prompt([
							{
								name: "frontText",
								message: "What is your question?"
							},
							{
								name: "backText",
								message: "What is your answer?"
							}
						]).then(function(answers) {
							var newCard = new BasicCard(
								answers.frontText,
								answers.backText);
							quizArray.push(newCard);
							count++;
							createCards();
						});
					} else if (answers.cardType === "Cloze") {
						inquirer.prompt([
							{
								name: "fullText",
								message: "What is your question?"	
							},
							{
								name: "cloze",
								message: "What word do you want to omit?"
							}
						]).then(function(answers) {
							var newCard = new ClozeCard(
								answers.fullText,
								answers.cloze);
							quizArray.push(newCard);
							count++;
							createCards();
						});
					} 
				})
			} else {
				inquirer.prompt([
					{
						name: "useQuiz",
						message: "Do you want to quiz yourself using your new flashcards?",
						choices: ["Y", "N"],
						type: "list"
					}
				]).then(function(answers) {
					if (answers.useQuiz === "Y") {
						var newCount = 0;
						var quizStart = function() {
							if (newCount<quizArray.length) {
								if (quizArray[newCount].cardType === "basic") {
									inquirer.prompt([
										{
											name: "question",
											message: quizArray[newCount].front
										}
									]).then(function(answers) {
										if (answers.question === quizArray[newCount].back) {
											console.log("-------------------" + "\nYou are correct!" + "\n-------------------");
											newCount++;
											quizStart();
										} else {
											console.log("-------------------" + "\nSorry, incorrect! The correct answer is " + quizArray[newCount].back + "\n-------------------");
											newCount++;
											quizStart();
										}
									});
								} else {
									inquirer.prompt([
										{
											name: "question",
											message: quizArray[newCount].partial
										}
									]).then(function(answers) {
										if (answers.question === quizArray[newCount].cloze) {
											console.log("-------------------" + "\nYou are correct!" + "\n-------------------");
											newCount++;
											quizStart();
										} else {
											console.log("-------------------" + "\nSorry, incorrect! The correct answer is " + quizArray[newCount].cloze + "\n-------------------");
											newCount++;
											quizStart();
										}
									});
								}
							} else {
								console.log("Quiz Over!");
								console.log(quizArray);
							}
						}
						quizStart();
					}
				});
			}
		}
		createCards();
	} else {
		BBQuizStart();
	}
});

