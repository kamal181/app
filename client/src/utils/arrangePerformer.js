import React from "react";
import getDefaultValue from "./defaultValue";
import { rankingRound1, rankingRound2, rankingRound3, rankingRound4, rankingRound5 } from "./ranking";








// gor = GAME OF ROUND
// net.performance, 1, props.game[0], POINT, props.roundNum, getDefaultValue
// ⛏️⛏️ CHOOSING WHO WILL PLAY AGAINEST WHO ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const arrangingPerformer = (performer, gor, game, scoreType, roundNum) => {
    // console.log("Game of round - ", gor);


    // CHECK OWN OR LOSE 
    const checkWon = (pointValue, firstname, lastname) => {
        // console.log("Point value", pointValue);
        // {getDefaultValue(one, scoreType, game, roundNum) >= 1 ? (<div className="p-rival got-point-name">{one.participant.firstname} {one.participant.lastname}  </div>) : (<div className="p-rival">{one.participant.firstname} {one.participant.lastname}  </div>)}
        if (pointValue === null) {
            return (<div className="p-rival">{firstname} {lastname}  </div>);
        } else if (pointValue === 0) {
            return (<div className="p-rival">{firstname} {lastname}  </div>);
        } else if (pointValue > 0) {
            return (<div className="p-rival text-success">{firstname} {lastname}  </div>);
        } else if (pointValue < 0) {
            return (<div className="p-rival text-danger">{firstname} {lastname}  </div>);
        } else {
            return (<div className="p-rival">{firstname} {lastname}  </div>);
        }
    }
    const returnPerformer = (t1p1, t1p2, t2p1, t2p2) => {
        const t1p1default = getDefaultValue(t1p1, scoreType, game, roundNum);
        const t1p2default = getDefaultValue(t1p2, scoreType, game, roundNum);
        const t2p1default = getDefaultValue(t2p1, scoreType, game, roundNum);
        const t2p2default = getDefaultValue(t2p2, scoreType, game, roundNum);

        return (
            <div className="f-net d-flex flex-column text-center ">
                <div className="two-participant team-1">
                    {checkWon(t1p1default, t1p1.participant.firstname, t1p1.participant.lastname)}
                    {checkWon(t1p2default, t1p2.participant.firstname, t1p2.participant.lastname)}
                </div>
                <div className="vs text-uppercase">VS</div>
                <div className="two-participant team-2">
                    {checkWon(t2p1default, t2p1.participant.firstname, t2p1.participant.lastname)}
                    {checkWon(t2p2default, t2p2.participant.firstname, t2p2.participant.lastname)}
                </div>
            </div>);
    }


    // console.log("Arranging Perfomer - ", performer);

    // console.log("-------------------------------------------------------------------------");
    if (performer.length < 4) {

        {/* // <div className="player-name" key={j}>{p.participant.firstname} {p.participant.lastname}</div> */ }
        return (<div className="net-less-four">{(performer.map((p, j) => (<React.Fragment key={j}>
            <div className="short-net-player">{checkWon(getDefaultValue(p, scoreType, game, roundNum), p.participant.firstname, p.participant.lastname)}</div>
        </React.Fragment>
        )))}</div>);
    } else {
        if (gor === 1) {
            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // ONE & FOUR VS TWO & THREE 
            return returnPerformer(one, four, two, three);
        } else if (gor === 2) {
            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // 1 & 2 VS 3 & 4 
            return returnPerformer(one, two, three, four);
        } else if (gor === 3) {
            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // 1 & 3 VS 2 & 4 
            return returnPerformer(one, three, two, four);
        } else {
            return;
        }
    }

}






// ⛏️⛏️ CHOOSING WHO WILL PLAY AGAINEST WHO ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const serializePerformer = (performers) => {
    // console.log("Game of round - ",gor);
    console.log("Performers - ", performers);



    if (performers.length < 4) {
        return (
            <div className="net-less-four-total">
                {performers.map((p, j) => (
                    <div className="player-name player-sl short-net-player" key={j}>{p.participant.firstname} {p.participant.lastname} {p.pre_rank}</div>
                ))
                }
            </div>);
    } else {
        return (
            <div className="players-in-net-total">
                {performers.map((p, j) => (
                    <div className="player-name player-sl" key={j}>{p.participant.firstname} {p.participant.lastname}</div>
                ))
                }
            </div>);
    }

}










