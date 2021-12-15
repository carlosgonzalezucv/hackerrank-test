class GuessChecker {
  checkUserGuess(userInput, actualValue) {
    return Math.abs(userInput - actualValue) <= 5;
  }
}

export default new GuessChecker();
