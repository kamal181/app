import { POINT_DIFFERENTIAL, POINT, SCORE } from "../utils/global";
const getDefaultValue = (p, scoreType, gameNum, roundNum) => {
    // console.log("Performance - ", p);
    // console.log("Game num - ", gameNum);
    // console.log("Round num - ", roundNum);
    if (p !== null) {
        if (roundNum === 1) {
            if (scoreType === POINT) {
                switch (gameNum) {
                    case 1:
                        if (p.game1 && p.game1 !== undefined) { return p.game1.point } else { return null };
                    case 2:
                        // console.log("Game -2 ", p.game2);
                        if (p.game2 && p.game2 !== undefined) { return p.game2.point } else { return null };
                    case 3:
                        if (p.game3 && p.game3 !== undefined) { return p.game3.point } else { return null };
                    default:
                        return;
                }
            } else if (scoreType === POINT_DIFFERENTIAL) {
                // console.log(p, round2.pointDeferential);
                switch (gameNum) {
                    case 1:
                        if (p.game1 && p.game1 !== undefined) { return p.game1.pointDeferential } else { return null };
                    case 2:
                        if (p.game2 && p.game2 !== undefined) { return p.game2.pointDeferential } else { return null };
                    case 3:
                        if (p.game3 && p.game3 !== undefined) { return p.game3.pointDeferential } else { return null };
                    default:
                        return;
                }
            } else if (scoreType === SCORE) {
                switch (gameNum) {
                    case 1:
                        if (p.game1 && p.game1 !== undefined) { return p.game1.score } else { return null };
                    case 2:
                        if (p.game2 && p.game2 !== undefined) { return p.game2.score } else { return null };
                    case 3:
                        if (p.game3 && p.game3 !== undefined) { return p.game3.score } else { return null };
                    default:
                        return;
                }
            }
        }
        if (roundNum === 2) {
            // console.log(gameNum);
            // console.log("Round num -",roundNum);
            if (scoreType === POINT) {
                switch (gameNum) {
                    case 4:
                        if (p.game4 && p.game4 !== undefined) { return p.game4.point } else { return null };
                    case 5:
                        // console.log("Game -5 ", p.game5);
                        if (p.game5 && p.game5 !== undefined) { return p.game5.point } else { return null };
                    case 6:
                        if (p.game6 && p.game6 !== undefined) { return p.game6.point } else { return null };
                    default:
                        return;
                }
            }

            if (scoreType === POINT_DIFFERENTIAL) {
                // console.log(p, round2.pointDeferential);
                switch (gameNum) {
                    case 4:
                        if (p.game4 && p.game4 !== undefined) { return p.game4.pointDeferential } else { return null };
                    case 5:
                        if (p.game5 && p.game5 !== undefined) { return p.game5.pointDeferential } else { return null };
                    case 6:
                        if (p.game6 && p.game6 !== undefined) { return p.game6.pointDeferential } else { return null };
                    default:
                        return;
                }
            } else if (scoreType === SCORE) {
                switch (gameNum) {
                    case 4:
                        if (p.game4 && p.game4 !== undefined) { return p.game4.score } else { return null };
                    case 5:
                        if (p.game5 && p.game5 !== undefined) { return p.game5.score } else { return null };
                    case 6:
                        if (p.game6 && p.game6 !== undefined) { return p.game6.score } else { return null };
                    default:
                        return;
                }
            }
        } else if (roundNum === 3) {
            if (scoreType === POINT) {
                switch (gameNum) {
                    case 7:
                        if (p.game7 && p.game7 !== undefined) { return p.game7.point } else { return null };
                    case 8:
                        // console.log("Game -8 ", p.game8);
                        if (p.game8 && p.game8 !== undefined) { return p.game8.point } else { return null };
                    case 9:
                        if (p.game9 && p.game9 !== undefined) { return p.game9.point } else { return null };
                    default:
                        return;
                }
            }

            if (scoreType === POINT_DIFFERENTIAL) {
                // console.log(p, round2.pointDeferential);
                switch (gameNum) {
                    case 7:
                        if (p.game7 && p.game7 !== undefined) { return p.game7.pointDeferential } else { return null };
                    case 8:
                        if (p.game8 && p.game8 !== undefined) { return p.game8.pointDeferential } else { return null };
                    case 9:
                        if (p.game9 && p.game9 !== undefined) { return p.game9.pointDeferential } else { return null };
                    default:
                        return;
                }
            } else if (scoreType === SCORE) {
                switch (gameNum) {
                    case 7:
                        if (p.game7 && p.game7 !== undefined) { return p.game7.score } else { return null };
                    case 8:
                        if (p.game8 && p.game8 !== undefined) { return p.game8.score } else { return null };
                    case 9:
                        if (p.game9 && p.game9 !== undefined) { return p.game9.score } else { return null };
                    default:
                        return;
                }
            }
        } else if (roundNum === 4) {
            if (scoreType === POINT) {
                switch (gameNum) {
                    case 10:
                        if (p.game10 && p.game10 !== undefined) { return p.game10.point } else { return null };
                    case 11:
                        // console.log("Game -11 ", p.game11);
                        if (p.game11 && p.game11 !== undefined) { return p.game11.point } else { return null };
                    case 12:
                        if (p.game12 && p.game12 !== undefined) { return p.game12.point } else { return null };
                    default:
                        return;
                }
            }

            if (scoreType === POINT_DIFFERENTIAL) {
                // console.log(p, round2.pointDeferential);
                switch (gameNum) {
                    case 10:
                        if (p.game10 && p.game10 !== undefined) { return p.game10.pointDeferential } else { return null };
                    case 11:
                        if (p.game11 && p.game11 !== undefined) { return p.game11.pointDeferential } else { return null };
                    case 12:
                        if (p.game12 && p.game12 !== undefined) { return p.game12.pointDeferential } else { return null };
                    default:
                        return;
                }
            } else if (scoreType === SCORE) {
                switch (gameNum) {
                    case 10:
                        if (p.game10 && p.game10 !== undefined) { return p.game10.score } else { return null };
                    case 11:
                        if (p.game11 && p.game11 !== undefined) { return p.game11.score } else { return null };
                    case 12:
                        if (p.game12 && p.game12 !== undefined) { return p.game12.score } else { return null };
                    default:
                        return;
                }
            }
        } else if (roundNum === 5) {
            if (scoreType === POINT) {
                switch (gameNum) {
                    case 13:
                        if (p.game13 && p.game13 !== undefined) { return p.game13.point } else { return null };
                    case 14:
                        // console.log("Game -14 ", p.game14);
                        if (p.game14 && p.game14 !== undefined) { return p.game14.point } else { return null };
                    case 15:
                        if (p.game15 && p.game15 !== undefined) { return p.game15.point } else { return null };
                    default:
                        return;
                }
            }

            if (scoreType === POINT_DIFFERENTIAL) {
                // console.log(p, round2.pointDeferential);
                switch (gameNum) {
                    case 13:
                        if (p.game13 && p.game13 !== undefined) { return p.game13.pointDeferential } else { return null };
                    case 14:
                        if (p.game14 && p.game14 !== undefined) { return p.game14.pointDeferential } else { return null };
                    case 15:
                        if (p.game15 && p.game15 !== undefined) { return p.game15.pointDeferential } else { return null };
                    default:
                        return;
                }
            } else if (scoreType === SCORE) {
                switch (gameNum) {
                    case 13:
                        if (p.game13 && p.game13 !== undefined) { return p.game13.score } else { return null };
                    case 14:
                        if (p.game14 && p.game14 !== undefined) { return p.game14.score } else { return null };
                    case 15:
                        if (p.game15 && p.game15 !== undefined) { return p.game15.score } else { return null };
                    default:
                        return;
                }
            }
        }
    } else {
        return null;
    }

}




export default getDefaultValue;