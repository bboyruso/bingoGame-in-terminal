const players = [
  {
    name: "John",
    points: 45,
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

  const alertCard = () => {
    console.table(
      bingoCard[0],
      bingoCard[1],
      bingoCard[2],
      bingoCard[3],
      bingoCard[4]
    );
    console.table(
      bingoCard[5],
      bingoCard[6],
      bingoCard[7],
      bingoCard[8],
      bingoCard[9]
    );
    console.table(
      bingoCard[10],
      bingoCard[11],
      bingoCard[12],
      bingoCard[13],
      bingoCard[14]
    );
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

    const cards = bingoCard.join(" ");
    console.table(`Showing card: \n ${cards}.`);
    let question = window.confirm(
      `Showing card : \n ${cards}. \nDo you like this numbers?`
    );

    if (question) {
      console.table(`Your card is: \n ${cards}.`);
      return bingoCard;
    } else showCard();
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
      alert(message);
      console.log(message);
      return number;
    }
  };

  const nextRound = () => {
    const question = window.confirm("Show Number?");
    if (question) {
      let result = showNumber();
      return result;
    } else {
      pointsSystem();
      sortByPoints();
      console.table(players);
      playAgain();
    }
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
      alertCard();
      return bingoCard;
    } else {
      console.log("NO matches!!!");
      alertCard();
      return bingoCard;
    }
  };

  const playAgain = () => {
    const findNumber = (element) => typeof element === "number";
    const isNumber = bingoCard.some(findNumber);
    let totalCounter1 = sayLine(0, 5);
    let totalCounter2 = sayLine(5, 10);
    let totalCounter3 = sayLine(10, 15);

    let total = totalCounter1 + totalCounter2 + totalCounter3;

    switch (total) {
      case 5:
        console.log("1 LINE is done!!!");
        break;
      case 10:
        console.log("2 LiNES are done!!!");
        break;
    }

    if (isNumber) {
      rounds++;
      result = nextRound();
      bingoCard = checkNumber();
      alert(bingoCard.join(" "));
      playAgain();
    } else if (total === 15) {
      console.log("BINGO!!!");
    }
  };

  const pointsSystem = () => {
    const userPoints = 500 - rounds * 5;
    players[players.length - 1].points = userPoints;
  };

  const playNext = () => {
    const message = window.confirm("Do you want to play again?");
    if (message) {
      playBingo();
    } else alert(`Thanks for Visiting!`);
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
  playAgain();
  pointsSystem();
  sortByPoints();
  console.table(players);
  playNext();
};

playBingo();
