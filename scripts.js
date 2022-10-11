/** Lágmark bolla sem má velja. */
const MIN_NUM_OF_CUPS = 2;

/** Hámark bolla sem má velja. */
const MAX_NUM_OF_CUPS = 10;

/** Fjöldi spilaðra leikja. */
let played = 0;

/** Fjöldi unnra leikja. */
let won = 0;

/** Fjöldi stiga. */
let points = 0;

/**
 * Athugar hvort gefin tala sé á bilinu [min, max].
 *
 * @param {string | number} numAsString Tala sem á að athuga.
 * @param {number} min Lágmark sem tala má vera.
 * @param {number} max Hámark sem tala má vera.
 * @returns `true` ef tala er innan bils, annars `false`.
 */
function isValidNum(numAsString, min, max) {
  // Ef `numAsString` er strengur fáum við tölu, ef tala, fáum líka tölu
  const num = Number.parseInt(numAsString);
  return min <= num && num <= max;
}

/**
 * Nær í gisk frá notanda.
 *
 * @param {number} numOfCups Heildar fjöldi bolla.
 * @returns `null` ef notandi hætti við, annars vali notanda sem tölu.
 */
function getChoice(numOfCups) {
  // Höfum við fengið gilt svar?
  let hasChoice = false;
  do {
    const choice = prompt(`Hvaða bolla veluru af ${numOfCups}?`);

    // ESC/Cancel
    if (choice === null) {
      return null;
    }

    if (isValidNum(choice, 1, numOfCups)) {
      // Skilum tölu svo það sé hægt að bera saman við tölu
      return Number.parseInt(choice);
    } else {
      alert(`${numOfCups} er ekki löglegt val. Reyndu aftur.`);
    }
    // Spyrjum aftur ef ekki gilt svar
  } while (!hasChoice);
}

/**
 * Skilar tölu af handahófi á bilinu [min, max].
 *
 * @param {number} min Lágmark bils.
 * @param {number} max Hámark bils.
 * @returns Tala af handahófi á bili [min, max].
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Spilum leik.
 */
function play() {
  do {
    const numOfCups = prompt(`Hve marga bolla?
Verður að vera gildi á bilinu [${MIN_NUM_OF_CUPS}, ${MAX_NUM_OF_CUPS}].
Þú færð N-1 fyrir að finna bolta í N bollum.
Ýttu á cancel eða ESC til að hætta.`);

    // Ýtt á ESC/Cancel
    if (numOfCups === null) {
      return;
    }

    // Pössum upp á að við höfum rétta tölu af bollum m.v. lágmark og hámark.
    if (!isValidNum(numOfCups, MIN_NUM_OF_CUPS, MAX_NUM_OF_CUPS)) {
      console.error(`${numOfCups} er ekki löglegt gildi.`);
      return;
    }

    // Svar notanda, annað hvort `null` eða tala.
    const choice = getChoice(numOfCups);

    // Hættum ef notandi valdi að hætta í svari.
    if (choice === null) {
      return;
    }

    // Veljum bolla af handahófi.
    const cup = randomNumber(1, numOfCups);

    played = played + 1;

    if (choice === cup) {
      const pointsAwarded = numOfCups - 1;
      points = points + pointsAwarded;
      won = won + 1;
      alert(`Rétt! Þú færð ${pointsAwarded} stig.`);
    } else {
      alert(`Rangt, boltinn var í bolla númer ${cup}.`);
    }
  } while (confirm('Spila aftur?'));
}

/**
 * Birtir stöðu spilara.
 */
function games() {
  if (played === 0) {
    console.log('Þú hefur ekki spilað neina leiki.');
  } else {
    console.log(`Leikir spilaðir: ${played}. Unnir leikir: ${won}. Stig: ${points}.`);
  }
}
