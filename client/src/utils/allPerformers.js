import React from 'react';
import { checkNegativePD } from './helpers';
import { POINT, POINT_DIFFERENTIAL, SCORE } from './global';
import getDefaultValue from './defaultValue';
// gor = GAME OF ROUND 
// ⛏️⛏️ INPUT FIELD FOR ALL PARTICIPANT OR PERFORMANCE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
// net, handleExtraWinningPointChange, roundNum, updateScore, setUpdateScore
const playersExtraPoint = (net, handleExtraWinningPointChange, roundNum, updateScore, setUpdateScore, defaultValue) => {
    // console.log("Nets - ",net);
    // console.log("s - ", scoreType);
    // console.log(props.round);
    // console.log("Game - ", game, props.game);



    // return (
    //     <div className="extra d-flex mt-3 short-net-player" >
    //         <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, net._id)} className="extra-icon" />
    //         <input type="text" style={{ display: showInput(net._id) }}
    //             onChange={e => handleExtraWinningPointChange(e, net._id, winningExtraPoint, setWinningExtraPoint)} className="extra-input form-control"
    //         />
    //     </div>
    // );


    return (
        <input
            type="text"
            className="form-control winning-point"
            defaultValue={defaultValue.toFixed(2)}
            onChange={e => handleExtraWinningPointChange(e, net._id, roundNum, updateScore, setUpdateScore)}
        />
    );
}


// net, props.game[2], POINT, 3, getDefaultValue, props.roundNum
const playersPoint = (net, game, scoreType, gor, roundNum) => {
    const returnPoint = (t1p1, t1p2, t2p1, t2p2) => {
        // t1p1default = TEAM ONE PLAYER ONE DEFAULT VALUE 
        const t1p1default = getDefaultValue(t1p1, scoreType, game, roundNum);
        const t1p2default = getDefaultValue(t1p2, scoreType, game, roundNum);
        const t2p1default = getDefaultValue(t2p1, scoreType, game, roundNum);
        const t2p2default = getDefaultValue(t2p2, scoreType, game, roundNum);

        return (<div className="players-in-net">
            <div className="two-p-input two-p-input-1">
                {t1p1default <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{t1p1default.toFixed(2)}</div>)}
                {t1p2default <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{t1p2default.toFixed(2)}</div>)}
            </div>

            <div className="line"></div>

            <div className="two-p-input two-p-input-2 ">
                {t2p1default <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{t2p1default.toFixed(2)}</div>)}
                {t2p2default <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{t2p2default.toFixed(2)}</div>)}
            </div>
        </div>);
    }
    if (scoreType === POINT) {
        if (net.performance.length < 4) {
            return (<div className="net-less-four">{(net.performance.map((p, j) => (
                <div className="short-net-player" key={j}>
                    {getDefaultValue(p, scoreType, game, roundNum) <= 0 ? null : (<div className="text-success">{getDefaultValue(p, scoreType, game, roundNum)}</div>)}
                </div>
            )))}</div>);

        } else {
            if (gor === 1) {
                // 1ST & 4TH VS 2ND  4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnPoint(one, four, two, three);

            } else if (gor === 2) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // 1ST & 2ND VS 3RD & 4TH 
                return returnPoint(one, two, three, four);
            } else if (gor === 3) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // 1ST VS 3RD & 2ND VS 4TH 
                return returnPoint(one, three, two, four);
            }
        }
    }
}




//net, props.game[2], POINT_DIFFERENTIAL, 3, props.roundNum
const playersPointDifferential = (net, game, scoreType, gor, roundNum) => {
    const returnPointDifferential = (t1p1, t1p2, t2p1, t2p2) => {
        const t1p1default = getDefaultValue(t1p1, scoreType, game, roundNum);
        const t1p2default = getDefaultValue(t1p2, scoreType, game, roundNum);
        const t2p1default = getDefaultValue(t2p1, scoreType, game, roundNum);
        const t2p2default = getDefaultValue(t2p2, scoreType, game, roundNum);

        return (<div className="players-in-net">
            <div className="two-p-input two-p-i-1">
                {checkNegativePD(t1p1default, "pd-i-1")}
                {checkNegativePD(t1p2default, "pd-i-2")}
            </div>
            <div className="line"></div>

            <div className="two-p-input two-p-i-2">
                {checkNegativePD(t2p1default, "pd-i-1")}
                {checkNegativePD(t2p2default, "pd-i-2")}
            </div>
        </div>);
    }
    if (scoreType === POINT_DIFFERENTIAL) {
        if (net.performance.length < 4) {
            return (<div className="net-less-four">{(net.performance.map((p, j) => (
                <div className="short-net-player" key={j}>{checkNegativePD(getDefaultValue(p, scoreType, game, roundNum), `pd-i-${j}`)}</div>
            )))}</div>);
        } else {
            if (gor === 1) {
                // 1ST & 4TH VS 2ND  4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnPointDifferential(one, four, two, three);
            } else if (gor === 2) {
                // 1ST & 2ND VS 3RD & 4TH
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnPointDifferential(one, two, three, four);
            } else if (gor === 3) {
                // 1ST & 3RD VS 2ND & 4TH
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // console.log(net.performance);
                return returnPointDifferential(one, three, two, four);
            }
        }
    }

}




// net, props.game[0], SCORE, 1, handleScoreChange, getDefaultValue, props
// gor= GAME OF ROUND 
const playersScore = (net, game, scoreType, gor, handleScoreChange, roundNum, updateScore, setUpdateScore) => {

    const returnScore = (t1p1, t1p2, t2p1, t2p2) => {
        const team1 = [t1p1._id, t1p2._id], team2 = [t2p1._id, t2p2._id];
        const t1p1default = getDefaultValue(t1p1, scoreType, game, roundNum);
        const t2p1default = getDefaultValue(t2p1, scoreType, game, roundNum);


        return (<div className="player-score d-flex flex-column">
            <div className="two-p-input two-p-i-1">
                <input className="form-control input-score" type="text"
                    onChange={e => handleScoreChange(e, game, net._id, scoreType, team1, team2, true, updateScore, setUpdateScore, false)}
                    defaultValue={t1p1default} />
            </div>
            <div className="line"></div>

            <div className="two-p-input two-p-i-2">
                <input className="form-control input-score" type="text"
                    onChange={e => handleScoreChange(e, game, net._id, scoreType, team2, team1, false, updateScore, setUpdateScore, false)}
                    defaultValue={t2p1default} />
            </div>
        </div>);
    }

    if (scoreType === SCORE) {
        if (net.performance.length < 4) {
            return (<div className="net-less-four"> {(net.performance.map((p, j) => (
                <div className="short-net-player player-score" key={j}>
                    <input
                        type="text"
                        className="form-control input-score-no-net"
                        defaultValue={getDefaultValue(p, scoreType, game, roundNum)}
                        style={{ width: "80px" }} name={net.sl}
                        // e, game, netID, scoreType, team, oponent, updateScore, setUpdateScore
                        onChange={e => handleScoreChange(e, game, net._id, scoreType, [p._id], null, null, updateScore, setUpdateScore, true)}
                    />
                </div>
            )))} </div>);
        } else {
            // console.log("player 1 - ", net.performance[0]._id);
            // console.log("player 2 - ", net.performance[1]._id);
            // console.log("player 3 - ", net.performance[2]._id);
            // console.log("player 4 - ", net.performance[3]._id);

            if (gor === 1) {
                // 1ST & 4TH VS 2ND & 3RD 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnScore(one, four, two, three);
                // const team1 = [net.performance[0]._id, net.performance[3]._id];
                // const team2 = [net.performance[1]._id, net.performance[2]._id];
                // return (<div className="player-score d-flex flex-column">
                //     <div className="two-p-input two-p-i-1">
                //         <input className="form-control" type="text"
                //             onChange={e => handleScoreChange(e, game, net._id, scoreType, team1, team2, true, updateScore, setUpdateScore, false)}
                //             defaultValue={getDefaultValue(net.performance[0], scoreType, game, roundNum)} />
                //     </div>
                //     <div className="line"></div>

                //     <div className="two-p-input two-p-i-2">
                //         <input className="form-control" type="text"
                //             onChange={e => handleScoreChange(e, game, net._id, scoreType, team2, team1, false, updateScore, setUpdateScore, false)}
                //             defaultValue={getDefaultValue(net.performance[1], scoreType, game, roundNum)} />
                //     </div>
                // </div>);
            }





            // UNCOMMENT IT 
            else if (gor === 2) {
                // 1ST & 2ND VS 3RD & 4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnScore(one, two, three, four);

            } else if (gor === 3) {
                // 1ST & 3RD VS 2ND & 4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnScore(one, three, two, four);
            }
        }
    }

}




export { playersExtraPoint, playersPoint, playersPointDifferential, playersScore };