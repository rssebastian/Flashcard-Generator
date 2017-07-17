function ClozeCard (text, cloze) {
	this.cloze = cloze;
	this.fullText = text;
	this.partial = this.fullText.replace(this.cloze, "-------");
	this.errorCheck = function() {
		if (this.partial === this.fullText) {
			console.log("Cloze deletion does not appear in question text");
		} else {
			console.log("No error");
		}
	}
	this.cardType = "cloze";
}

module.exports = ClozeCard;