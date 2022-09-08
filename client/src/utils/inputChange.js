import { SCORE } from '../utils/global';



// e, net._id, winningExtraPoint, setWinningExtraPoint
const handleExtraWinningPointChange = (e, netID, roundNum, updateScore, setUpdateScore) => {
    const wp = parseFloat(e.target.value);


    const findNet = updateScore.find((elm, i) => elm.netID === netID);
    if (findNet) {
        // UPDATE EXISTING NET 
        updateScore.forEach((up, i) => {
            if (up.netID === netID) {
                up.wp = wp;
            }
        });
    } else {
        // CREATE NEW RECORD 
        setUpdateScore(oldState => [...oldState,
        {
            team1: null,
            team2: null,
            game: null,
            wp: null,
            netID
        }]);
    }
}



// e, game, net._id, scoreType, team1, team2, true, updateScore, setUpdateScore
const handleScoreChange = (e, game, netID, scoreType, team, oponent, firstTeam, updateScore, setUpdateScore, individual) => {
    // THIS IS NOT EXTRA POINT 
    if (scoreType === SCORE) {
        // console.log("Update team - ", updateScore);
        // console.log("-----------😱😱Score😱😱----------------");
        // console.log("Game of round - ", game);
        // console.log("Team - ",team);
        // console.log("Oponent team - ", oponent);
        // console.log("inputChange.js line 30 - ",updateScore);

        const findNet = updateScore.find((elm, i) => elm.netID === netID);

        // A NET THAT HAS LESS THAN 4 PLAYERS 
        if (individual === true) {
            let score = parseInt(e.target.value);
            if (findNet) {
                // console.log("Net found");
                if (findNet.team1 !== null && findNet.game !== null) {
                    const findNetGame = updateScore.find((elm, i) => elm.netID === netID && elm.game === game);

                    // UPDATE TEAM AND GAME 
                    if (findNetGame) {
                        const findPlayerGame =  updateScore.find((elm, i) => elm.netID === netID && elm.game === game && team[0] === elm.team1.players[0]);
                        if(findPlayerGame){
                            // UPDATE EXISTING GAME 
                            updateScore.forEach((up, i) => {
                                if (up.team1.players[0] === team[0] && up.netID === netID && up.game === game) {
                                    // console.log("match - ");
                                    up.team1.score = score;
                                }
                                // else{
                                //     singlePlayerRecord(score, findNet.wp);
                                // }
                            });
                        }else{
                            singlePlayerRecord(score, findNet.wp); 
                        }

                    } else {
                        // CREATE NEW RECORD
                        // NET FOUND BUT GAME NOT FROUND 
                        // console.log("Net found but game not found");
                        singlePlayerRecord(score, findNet.wp);
                    }
                } else {
                    // UPDATE TEAM 
                    updateScore.forEach((up, i) => {
                        if (up.netID === netID) {
                            up.team1 = {
                                players: [team[0]],
                                score
                            };
                            up.game = game;
                        }
                    });
                }
            } else {
                // console.log("Net not found");
                singlePlayerRecord(score, null);
            }
        } else {
            // UPDATE EXISTING NET 
            if (findNet) {
                if (findNet.team1 !== null && findNet.team2 !== null && findNet.game !== null) {
                    // console.log(findNet);
                    const findNetGame = updateScore.find((elm, i) => elm.netID === netID && elm.game === game);
                    // UPDATE TEAM AND GAME 
                    if (findNetGame) {
                        // console.log("game matches");
                        // UPDATE EXISTING GAME 
                        updateSpecificGame(firstTeam, updateScore, netID, game, team, e);
                        // console.log("Update score--- ");
                    } else {
                        // CREATE NEW RECORD 
                        // console.log("game didn't matches");
                        if (firstTeam === true) {
                            // WITH TEAM ONE SCORE 
                            // console.log("findNet.wp - CREATE NEW TEAM WITH TEAM ONE SCORE ", findNet.wp );
                            let score = parseInt(e.target.value);
                            let oponentScore = findOponentScore();
                            createNewRecord([team[0], team[1]], [oponent[0], oponent[1]], score, oponentScore, findNet.wp);
                        } else {
                            // CREATE NEW TEAM WITH TEAM TWO SCORE
                            // console.log("findNet.wp - CREATE NEW TEAM WITH TEAM TWO SCORE ", findNet.wp);
                            let score = parseInt(e.target.value);
                            let oponentScore = findOponentScore();
                            createNewRecord([oponent[0], oponent[1]], [team[0], team[1]], oponentScore, score, findNet.wp);
                        }
                    }
                } else {
                    // console.log("it has only net, no team12, or game");
                    // THERE IS NET BUT NO TEAM AND GAME SO UPDATE TEAM 
                    if (firstTeam === true) {
                        // UPDATE FIRST TEAM 
                        updateScore.map((up, i) => {
                            if (up.netID === netID) {
                                up.team1 = {
                                    players: [team[0], team[1]],
                                    score: parseInt(e.target.value)
                                };
                                up.team2 = {
                                    players: [oponent[0], oponent[1]],
                                    score: null
                                };
                                up.game = game;
                            }
                            return;
                        });
                    } else {
                        // console.log("not first team");
                        // UPDATE OPONENT TEAM 
                        updateScore.map((up, i) => {
                            if (up.netID === netID) {
                                up.team1 = {
                                    players: [team[0], team[1]],
                                    score: null
                                };
                                up.team2 = {
                                    players: [oponent[0], oponent[1]],
                                    score: parseInt(e.target.value)
                                };
                                up.game = game;
                            }
                            return;
                        });
                    }
                }
            } else {
                // IF THERE IS NO NET CREATE NEW NET 
                if (firstTeam === true) {
                    // WITH TEAM ONE SCORE 
                    let score = parseInt(e.target.value);
                    let oponentScore = findOponentScore();
                    createNewRecord([team[0], team[1]], [oponent[0], oponent[1]], score, oponentScore, null);
                } else {
                    // CREATE NEW TEAM WITH TEAM TWO SCORE
                    let score = parseInt(e.target.value);
                    let oponentScore = findOponentScore();
                    createNewRecord([oponent[0], oponent[1]], [team[0], team[1]], oponentScore, score, null);
                }
            }
        }
    }



    function singlePlayerRecord(score, wp) {
        setUpdateScore(oldState => [...oldState,
        {
            team1: {
                players: [team[0]],
                score
            },
            team2: null,
            game,
            wp,
            netID
        }]);
    }

    function updateSpecificGame(ft, us, nID, g, t, e) {
        if (ft === true) {
            // UPDATE TEAM 1
            us.forEach((up, i) => {
                if (up.netID === nID && up.game === g) {
                    if (up.team1.players[0] === t[0] && up.team1.players[1] === t[1]) {
                        up.team1.score = parseInt(e.target.value);
                    }
                }
                return;
            });
        } else {
            // UPDATE TEAM 2
            us.forEach((up, i) => {
                if (up.netID === nID && up.game === g) {
                    if (up.team2.players[0] === t[0] && up.team2.players[1] === t[1]) {
                        // let scr = e.target.value;
                        up.team2.score = parseInt(e.target.value);
                    }
                }
            });
        }
    }




    function findOponentScore() {
        let oponentScore = null;
        const findOpnent = updateScore.find((elm, i) => {
            if (elm.team1 && elm.team2) {
                if (elm.team2.players[0] === oponent[0] && elm.team2.players[1] === oponent[1] && elm.game === game) {
                    return elm;
                }
            }
            return null;
        });
        if (findOpnent)
            oponentScore = findOpnent.team2.score;
        return oponentScore;
    }




    function createNewRecord(team1Players, team2Players, teamScore, oponentScore, wp) {
        setUpdateScore(oldState => [...oldState,
        {
            team1: {
                players: team1Players,
                score: teamScore
            },
            team2: {
                players: team2Players,
                score: oponentScore,
            },
            game,
            wp,
            netID
        }]);
    }

    /*
    function createNewRecord( score, oponentScore) {
        setUpdateScore(oldState => [...oldState,
        {
            team1: {
                players: [team[0], team[1]],
                score
            },
            team2: {
                players: [oponent[0], oponent[1]],
                score: oponentScore,
            },
            game,
            wp: null,
            netID
        }]);
    }
    */

}


export { handleScoreChange, handleExtraWinningPointChange };




