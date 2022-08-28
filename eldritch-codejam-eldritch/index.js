import * as Blue from "./data/mythicCards/blue/index.js";
import * as Brown from "./data/mythicCards/brown/index.js";
import * as Green from "./data/mythicCards/green/index.js";
import * as Ancients from "./data/ancients.js";

const azathothImg = document.querySelector('.azathoth');
const cthulthuImg = document.querySelector('.cthulthu');
const iogSothothImg = document.querySelector('.iogSothoth');
const shubNiggurathImg = document.querySelector('.shubNiggurath');

const levelContainer = document.querySelector('.level-container');
const levelButton = document.querySelectorAll('.level');

const trackerContainer = document.querySelector('.tracker-container');
const firstTitle = document.querySelector('.first-title');
const firstStageGreen = document.querySelector('.first-stage-green');
const firstStageBrown = document.querySelector('.first-stage-brown');
const firstStageBlue = document.querySelector('.first-stage-blue');
const secondTitle = document.querySelector('.second-title');
const secondStageGreen = document.querySelector('.second-stage-green');
const secondStageBrown = document.querySelector('.second-stage-brown');
const secondStageBlue = document.querySelector('.second-stage-blue');
const thirdTitle = document.querySelector('.third-title');
const thirdStageGreen = document.querySelector('.third-stage-green');
const thirdStageBrown = document.querySelector('.third-stage-brown');
const thirdStageBlue = document.querySelector('.third-stage-blue');

const reverseSideCardImg = document.querySelector('.reverse-side-card');
const frontSideCardImg = document.querySelector('.front-side-card');

let playAncient = {};
let cardDeck = [];
let playTracker = [];

cthulthuImg.addEventListener('click', () => {
    playAncient = Ancients.ancientsData[1];
    cthulthuImg.classList.add('ancient-active');
    shubNiggurathImg.classList.remove('ancient-active');
    iogSothothImg.classList.remove('ancient-active');
    azathothImg.classList.remove('ancient-active');

    levelContainer.style.opacity = '1';
    levelButton.forEach(el => { el.classList.remove('level-active') });

    trackerContainer.classList.remove('tracker-container-active');
    firstTitle.classList.remove('stage-title-end');
    secondTitle.classList.remove('stage-title-end');
    thirdTitle.classList.remove('stage-title-end');

    levelButton[levelButton.length - 1].classList.remove('shuffle-button-active');

    reverseSideCardImg.classList.remove('reverse-side-card-active');
    frontSideCardImg.style.background = 'none';    
});

shubNiggurathImg.addEventListener('click', () => {
    playAncient = Ancients.ancientsData[3];
    cthulthuImg.classList.remove('ancient-active');
    shubNiggurathImg.classList.add('ancient-active');
    iogSothothImg.classList.remove('ancient-active');
    azathothImg.classList.remove('ancient-active');

    levelContainer.style.opacity = '1';
    levelButton.forEach(el => { el.classList.remove('level-active') });

    trackerContainer.classList.remove('tracker-container-active');
    firstTitle.classList.remove('stage-title-end');
    secondTitle.classList.remove('stage-title-end');
    thirdTitle.classList.remove('stage-title-end');

    levelButton[levelButton.length - 1].classList.remove('shuffle-button-active');

    reverseSideCardImg.classList.remove('reverse-side-card-active');
    frontSideCardImg.style.background = 'none';
});

iogSothothImg.addEventListener('click', () => {
    playAncient = Ancients.ancientsData[2];
    cthulthuImg.classList.remove('ancient-active');
    shubNiggurathImg.classList.remove('ancient-active');
    iogSothothImg.classList.add('ancient-active');
    azathothImg.classList.remove('ancient-active');

    levelContainer.style.opacity = '1';
    levelButton.forEach(el => { el.classList.remove('level-active') });

    trackerContainer.classList.remove('tracker-container-active');
    firstTitle.classList.remove('stage-title-end');
    secondTitle.classList.remove('stage-title-end');
    thirdTitle.classList.remove('stage-title-end');

    levelButton[levelButton.length - 1].classList.remove('shuffle-button-active');

    reverseSideCardImg.classList.remove('reverse-side-card-active');
    frontSideCardImg.style.background = 'none';
});

azathothImg.addEventListener('click', () => {
    playAncient = Ancients.ancientsData[0];
    cthulthuImg.classList.remove('ancient-active');
    shubNiggurathImg.classList.remove('ancient-active');
    iogSothothImg.classList.remove('ancient-active');
    azathothImg.classList.add('ancient-active');

    levelContainer.style.opacity = '1';
    levelButton.forEach(el => { el.classList.remove('level-active') });

    trackerContainer.classList.remove('tracker-container-active');
    firstTitle.classList.remove('stage-title-end');
    secondTitle.classList.remove('stage-title-end');
    thirdTitle.classList.remove('stage-title-end');

    levelButton[levelButton.length - 1].classList.remove('shuffle-button-active');

    reverseSideCardImg.classList.remove('reverse-side-card-active');
    frontSideCardImg.style.background = 'none';
});

//--------------

function shuffle(arr) {
    let currentIndex = arr.length;
    let randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex= currentIndex - 1;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    };
    return arr;
};

const doCardDeck = (Blue, Brown, Green, difficulty) => {
    let allCardDeck = [...Blue.cardsData, ...Brown.cardsData, ...Green.cardsData];
    let easyCard = [];
    let normalCard = [];
    let hardCard = [];

    allCardDeck.forEach(el => {
        if (el.difficulty === 'easy') easyCard.push(el)
        else if (el.difficulty === 'normal') normalCard.push(el)
            else hardCard.push(el);
    });

    switch (difficulty) {
        case 'veryeasy':
            return [...shuffle(easyCard), ...shuffle(normalCard)];
        case 'easy':
            return [...shuffle(normalCard), ...shuffle(easyCard)];
        case 'normal':
            return [...shuffle(easyCard), ...shuffle(hardCard), ...shuffle(normalCard)];
        case 'hard':
            return [...shuffle(normalCard), ...shuffle(hardCard)];
        case 'veryhard':
            return [...shuffle(hardCard), ...shuffle(normalCard)];
    };
};

const doTrackerStage = (stage, cardDeck) => {
    let greenCard = [];
    let brownCard = [];
    let blueCard = [];

    for (const key in stage) {
        for (let i = 0; i < stage[key]; i++) {
            if (key === 'greenCards') {
                const index = cardDeck.findIndex(el => el.color === 'green');
                greenCard.push(...cardDeck.splice(index, 1));
            } else if (key === 'brownCards') {
                const index = cardDeck.findIndex(el => el.color === 'brown');
                brownCard.push(...cardDeck.splice(index, 1));
            } else if (key === 'blueCards') {
                const index = cardDeck.findIndex(el => el.color === 'blue');
                blueCard.push(...cardDeck.splice(index, 1));
            }
        }
    }
    return [shuffle(greenCard), shuffle(brownCard), shuffle(blueCard)]
};

const doPlayTracker = (ancient) => {
    const stage1 = doTrackerStage(ancient.firstStage, cardDeck);
    const stage2 = doTrackerStage(ancient.secondStage, cardDeck);
    const stage3 = doTrackerStage(ancient.thirdStage, cardDeck);
    return [stage1, stage2, stage3];
};

const newCardBalance = (arr) => {
    firstStageGreen.textContent = arr[0][0].length;
    firstStageBrown.textContent = arr[0][1].length;
    firstStageBlue.textContent = arr[0][2].length;
    secondStageGreen.textContent = arr[1][0].length;
    secondStageBrown.textContent = arr[1][1].length;
    secondStageBlue.textContent = arr[1][2].length;
    thirdStageGreen.textContent = arr[2][0].length;
    thirdStageBrown.textContent = arr[2][1].length;
    thirdStageBlue.textContent = arr[2][2].length;
};

levelButton.forEach(el => {
    el.addEventListener('click', (event) => {
        trackerContainer.classList.remove('tracker-container-active');
        firstTitle.classList.remove('stage-title-end');
        secondTitle.classList.remove('stage-title-end');
        thirdTitle.classList.remove('stage-title-end');

        reverseSideCardImg.classList.remove('reverse-side-card-active');
        frontSideCardImg.style.background = 'none';


        levelButton.forEach(item => {
            if (!event.target.classList.contains('shuffle-button')) item.classList.remove('level-active')
        });      
        
        if (event.target.classList.contains('veryeasy-button')) {
            cardDeck = doCardDeck(Blue, Brown, Green, 'veryeasy');
            levelButton[levelButton.length - 1].classList.add('shuffle-button-active');
            el.classList.add('level-active');
        } else if (event.target.classList.contains('easy-button')) {
            cardDeck = shuffle(doCardDeck(Blue, Brown, Green, 'easy'));
            levelButton[levelButton.length - 1].classList.add('shuffle-button-active');
            el.classList.add('level-active');
        } else if (event.target.classList.contains('normal-button')) {
            cardDeck = shuffle(doCardDeck(Blue, Brown, Green, 'normal'));
            levelButton[levelButton.length - 1].classList.add('shuffle-button-active');
            el.classList.add('level-active');
        } else if (event.target.classList.contains('hard-button')) {
            cardDeck = shuffle(doCardDeck(Blue, Brown, Green, 'hard'));
            levelButton[levelButton.length - 1].classList.add('shuffle-button-active');
            el.classList.add('level-active');
        } else if (event.target.classList.contains('veryhard-button')) {
            cardDeck = doCardDeck(Blue, Brown, Green, 'veryhard');
            levelButton[levelButton.length - 1].classList.add('shuffle-button-active');
            el.classList.add('level-active');
        } else 
        
                if (event.target.classList.contains('shuffle-button')) {
                    playTracker = doPlayTracker(playAncient);
                    newCardBalance(playTracker);
                    reverseSideCardImg.classList.add('reverse-side-card-active');
                    trackerContainer.classList.add('tracker-container-active');
                    levelButton[levelButton.length - 1].classList.remove('shuffle-button-active');
                };
    });
});

//----------------------

const deleteCard = (arr) => {
    if (arr) return arr[Math.floor(Math.random() * 3)].pop();
};

reverseSideCardImg.addEventListener('click', () => {
    let delCard;
    if (!playTracker[0].every(el => el.length === 0)) {
        while (!delCard) delCard = deleteCard(playTracker[0]);
        frontSideCardImg.style.background = `url(${delCard.cardFace})`;
        frontSideCardImg.style.backgroundSize = "contain";
        frontSideCardImg.style.backgroundRepeat = "no-repeat";
        newCardBalance(playTracker);
        if (playTracker[0].flat(Infinity).length === 0) firstTitle.classList.add('stage-title-end');
    } else if (!playTracker[1].every(el => el.length === 0)) {
        while (!delCard) delCard = deleteCard(playTracker[1]);
        frontSideCardImg.style.background = `url(${delCard.cardFace})`;
        frontSideCardImg.style.backgroundSize = "contain";
        frontSideCardImg.style.backgroundRepeat = "no-repeat";
        newCardBalance(playTracker);
        if (playTracker[1].flat(Infinity).length === 0) secondTitle.classList.add('stage-title-end');
    } else if (!playTracker[2].every(el => el.length === 0)) {
        while (!delCard) delCard = deleteCard(playTracker[2]);
        frontSideCardImg.style.background = `url(${delCard.cardFace})`;
        frontSideCardImg.style.backgroundSize = "contain";
        frontSideCardImg.style.backgroundRepeat = "no-repeat";
        newCardBalance(playTracker);
        if (playTracker[2].flat(Infinity).length === 0) thirdTitle.classList.add('stage-title-end');
    };
    if (playTracker.flat(Infinity).length === 0) reverseSideCardImg.classList.remove('reverse-side-card-active');
});