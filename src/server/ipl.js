/* functions used to get matchIds for problem 3 and problem 4*/

function getMatchIds(matches, requiredSeason) {
  let matchIds = new Set();
  for (let i = 1; i < matches.length; i++) {
    if (matches[i][1] == requiredSeason) {
      matchIds.add(matches[i][0]);
    }
  }
  return matchIds;
}

/* Problem 1*/

function numberOfMatches(matches) {
  const objectOfYears = new Object();
  for (let i = 1; i < matches.length; i++) {
    let year = matches[i][1];
    if (objectOfYears[year] == undefined) {
      objectOfYears[year] = 1;
    } else {
      objectOfYears[year] = Number(objectOfYears[year]) + 1;
    }
  }
  const arrayOfObjects = Object.entries(objectOfYears).reduce(
    (arrayOfObjects, object) => {
      let year = object[0];
      let matches = object[1];
      arrayOfObjects.push({ year: year, matches: matches });
      return arrayOfObjects;
    },
    []
  );
  return arrayOfObjects;
}

/* Problem 2*/

function matchesWonPerYear(matches) {
  const objectOfMatchesWonPerYear = new Object();
  for (let i = 1; i < matches.length; i++) {
    let year = matches[i][1];
    let team = matches[i][10];
    if (objectOfMatchesWonPerYear[year] == undefined) {
      objectOfMatchesWonPerYear[year] = new Object();
    }
    if (objectOfMatchesWonPerYear[year][team] == undefined && team)
      objectOfMatchesWonPerYear[year][team] = 1;
    else {
      if (team) {
        let noOfMatches = Number(objectOfMatchesWonPerYear[year][team]);

        noOfMatches += 1;
        objectOfMatchesWonPerYear[year][team] = noOfMatches;
      }
    }
  }
  const arrayOfObjects = Object.entries(objectOfMatchesWonPerYear).reduce(
    (arrayOfObjects, mainObject) => {
      let year = Number(mainObject[0]);
      let nestedObject = mainObject[1];
      Object.keys(nestedObject).forEach((team) => {
        let matchesWon = nestedObject[team];
        arrayOfObjects.push({
          year: Number(year),
          team: team,
          wins: Number(matchesWon),
        });
      });
      return arrayOfObjects;
    },
    []
  );
  return arrayOfObjects;
}

/* Problem 3*/

function extraRuns2016(matches, deliveries, requiredSeason) {
  const objOfExtraRuns2016 = new Object();
  let matchIds = getMatchIds(matches, requiredSeason);
  for (let i = 1; i < deliveries.length; i++) {
    let matchId = deliveries[i][0];
    if (matchIds.has(matchId)) {
      let team = deliveries[i][3];
      let extraRuns = Number(deliveries[i][16]);
      if (objOfExtraRuns2016[team] == undefined) {
        objOfExtraRuns2016[team] = extraRuns;
      } else {
        let currentExtraRuns = Number(objOfExtraRuns2016[team]);
        currentExtraRuns += extraRuns;
        objOfExtraRuns2016[team] = currentExtraRuns;
      }
    }
  }
  const arrayOfObjects = Object.entries(objOfExtraRuns2016).reduce(
    (arrayOfObjects, object) => {
      let team = object[0];
      let extraRuns = object[1];
      arrayOfObjects.push({ team: team, extra_runs: extraRuns });
      return arrayOfObjects;
    },
    []
  );
  return arrayOfObjects;
}

/* Problem 4*/

function bowlsToOverConvertion(totalBowls) {
  return Math.floor(totalBowls / 6) + (totalBowls % 6) / 10;
}

function calculateEconomy(objectOfBowlers) {
  const objOfBowlers = new Object();
  for (let [bowler, currentStat] of Object.entries(objectOfBowlers)) {
    let runs = currentStat[0];
    let overs = bowlsToOverConvertion(currentStat[1]);
    let economyRate = (runs / overs).toFixed(2);
    objOfBowlers[bowler] = economyRate;
  }
  return objOfBowlers;
}

function getTop10(objOfBowlers) {
  const resultObject = new Object();
  let keysSorted = Object.keys(objOfBowlers).sort(function (a, b) {
    return objOfBowlers[a] - objOfBowlers[b];
  });
  for (let i = 0; i < 10; i++) {
    let bowler = keysSorted[i];
    let economyRate = objOfBowlers[bowler];
    resultObject[bowler] = economyRate;
  }
  return resultObject;
}

function economicalBowlers(matches, deliveries, requiredSeason) {
  const objectOfBowlers = new Object();
  let matchIds = getMatchIds(matches, requiredSeason);
  for (let i = 1; i < deliveries.length; i++) {
    let matchId = deliveries[i][0];
    if (matchIds.has(matchId)) {
      let bowler = deliveries[i][8];
      let runsOnEachBowl = Number(deliveries[i][17]);
      let wideBalls = Number(deliveries[i][10]);
      let noballs = Number(deliveries[i][13]);
      if (objectOfBowlers[bowler] == undefined) {
        if (wideBalls > 0 || noballs > 0) {
          objectOfBowlers[bowler] = [runsOnEachBowl, 0];
        } else {
          objectOfBowlers[bowler] = [runsOnEachBowl, 1];
        }
      } else {
        let currentStat = objectOfBowlers[bowler];
        currentStat[0] += runsOnEachBowl;
        if (wideBalls == 0 && noballs == 0) {
          currentStat[1] += 1;
        }
        objectOfBowlers[bowler] = currentStat;
      }
    }
  }
  const objOfBowlers = calculateEconomy(objectOfBowlers);

  const objectOfTop10bowlers = getTop10(objOfBowlers);

  const arrayOfObjects = Object.entries(objectOfTop10bowlers).reduce(
    (arrayOfObjects, object) => {
      let bowler = object[0];
      let economy = object[1];
      arrayOfObjects.push({ bowler: bowler, economy: economy });
      return arrayOfObjects;
    },
    []
  );

  return arrayOfObjects;
}

export { numberOfMatches, matchesWonPerYear, extraRuns2016, economicalBowlers };
