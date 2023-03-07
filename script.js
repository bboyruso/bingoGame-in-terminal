let players = [
  {
    name: "John",
    points: 40,
  },
  {
    name: "Xavi99",
    points: 15,
  },
];

const playBingo = () => {
  let rounds = 0;
  const randomNumber = () => {
    const min = 1;
    const max = 99;
    const number = Math.floor(Math.random() * (max - min + 1) + min);
    return number;
  };

  const sayLine = (firsIndex, lastIndex) => {
    let counter = 0;

    for (let index = firsIndex; index < lastIndex; index++) {
      if (typeof bingoCard[index] !== "number") {
        counter++;
      }
    }
    if (counter === 5) {
      return counter;
    } else return 0;
  };

  const showCard = () => {
    let bingoCard = [];

    for (let i = 0; i < 15; i++) {
      const number = randomNumber();
      if (bingoCard.includes(number)) {
        i--;
      } else bingoCard.push(number);
    }

    bingoCard = bingoCard.sort((a, b) => {
      return a - b;
    });

    alertCard(bingoCard);

    let question = window.confirm(`Do you like this card?`);
    if (question) {
    } else {
      bingoCard = showCard();
    }
    return bingoCard;
  };

  const bingoNumber = [];
  const showNumber = () => {
    let number = randomNumber();

    if (bingoNumber.includes(number)) {
      return showNumber();
    } else {
      bingoNumber.push(number);
      const message = `The number is : ${number}`;
      console.log(message);
      return number;
    }
  };

  const nextRound = () => {
    const question = window.confirm("Show Number?");
    let result = showNumber();
    if (!question) {
      return playAgain();
    }

    return result;
  };

  const askForName = () => {
    const name = window.prompt(`Whats your name?`);

    if (name === null) {
      return askForName();
    } else if (name.length > 0) {
      alert(`Welcome ${name}! Lets play THE BINGO GAME !`);
    } else return askForName();
    players.push({ name: name, points: 0 });
  };

  const checkNumber = () => {
    const findIndex = bingoCard.findIndex((element) => element === result);
    if (findIndex >= 0) {
      bingoCard.splice(findIndex, 1, "X");
      console.log("Yes !!! There is the matches!!!");
      alertCard(bingoCard);
      return bingoCard;
    } else {
      console.log("NO matches!!!");
      alertCard(bingoCard);
      return bingoCard;
    }
  };

  let firstLine = 0;

  const playNextRound = () => {
    const findNumber = (element) => typeof element === "number";
    const isNumber = bingoCard.some(findNumber);
    let totalCounter1 = sayLine(0, 5);
    let totalCounter2 = sayLine(5, 10);
    let totalCounter3 = sayLine(10, 15);

    let total = totalCounter1 + totalCounter2 + totalCounter3;

    if (firstLine === 0) {
      switch (total) {
        case 5:
          firstLine++;
          console.log("LINE!!!");
          break;
      }
    }

    if (isNumber) {
      rounds++;
      result = nextRound();
      bingoCard = checkNumber();
      playNextRound();
    } else if (total === 15) {
      console.log("BINGO!!!");
    }
  };

  const pointsSystem = () => {
    const userPoints = 500 - rounds * 5;
    players[players.length - 1].points = userPoints;
  };

  const sortByPoints = () => {
    players.sort(function (a, b) {
      return a.points - b.points;
    });

    return players;
  };

  const message = `Hi players, Everyone starts with 500 points,
  and if you enter a round without matches, you will lose 5 points.
  The WINNER is the one with most points left.
  Good luck and have fun!`;
  alert(message);
  console.log(message);
  askForName();
  bingoCard = showCard();
  playNextRound();
  pointsSystem();
  sortByPoints();
  console.table(players);
  playAgain();
};
const playAgain = () => {
  const message = window.confirm("Do you want to play again?");
  if (message) {
    playBingo();
  } else alert(`Thanks for Visiting!`);
  playBingo();
};

const alertCard = (array) => {
  console.table(array[0], array[1], array[2], array[3], array[4]);
  console.table(array[5], array[6], array[7], array[8], array[9]);
  console.table(array[10], array[11], array[12], array[13], array[14]);
};
playBingo();
