export const checkNegativePD = (val, cls) => {
    // <div className="pd-item">{getDefaultValue(net.performance[0], score, game, props.roundNum)}</div>
    if (val > 0) {
        return <div className={`pd-item text-success got-pd ${cls}`}>{val}</div>
    } else {
        return <div className={`pd-item text-danger`}>{val}</div>
    }
}





export const tabKeyFocusChange = () => {
    // console.log("Tab key focus change");
    const wp = document.querySelectorAll('.winning-point');
    const scoreInputs = document.querySelectorAll('.input-score');
    const scoreInputsNoNet = document.querySelectorAll('.input-score-no-net');

    const firstGameInput = new Array();
    const secondGameInput = new Array();
    const thirdGameInput = new Array();


    for (let i = 0; i < wp.length; i++) {
        wp[i].setAttribute('tabIndex', `${i + 1}`);
    }


    // ARRANGING ALL GAME ELEMENTS 
    let i = 0, chunk = 6;
    while (i < scoreInputs.length) {
        try {
            firstGameInput.push(scoreInputs[i], scoreInputs[i + 1]);
            secondGameInput.push(scoreInputs[i + 2], scoreInputs[i + 3]);
            thirdGameInput.push(scoreInputs[i + 4], scoreInputs[i + 5]);
        } catch (error) {
            console.log(error);
        }
        i += chunk;
    }

    const numOfGame = 3;
    const noNetDivider = scoreInputsNoNet.length / numOfGame;
    firstGameInput.forEach((fgi, i) => {
        // fgi.setAttribute("id", `score-input-${i + 1}`);
        fgi.setAttribute("tabIndex", `${i + 1 + wp.length}`);
    });

    for (let i = 0; i < noNetDivider; i++) {
        scoreInputsNoNet[i].setAttribute('tabIndex', `${i + 1 + firstGameInput.length + wp.length}`);
    }

    secondGameInput.forEach((sgi, i) => {
        sgi.setAttribute("tabIndex", `${i + 1 + firstGameInput.length + noNetDivider + wp.length}`);
    });

    for (let i = 0; i < noNetDivider; i++) {
        scoreInputsNoNet[i + noNetDivider].setAttribute('tabIndex', `${i + 1 + firstGameInput.length + noNetDivider + secondGameInput.length + wp.length}`);
    }

    thirdGameInput.forEach((tgi, i) => {
        tgi.setAttribute("tabIndex", `${i + 1 + firstGameInput.length + noNetDivider + secondGameInput.length + noNetDivider + wp.length}`);
    });
    for (let i = 0; i < noNetDivider; i++) {
        scoreInputsNoNet[i + noNetDivider + noNetDivider].setAttribute('tabIndex', `${i + 1 + firstGameInput.length + noNetDivider + secondGameInput.length + noNetDivider + thirdGameInput.length + wp.length}`);
    }
}



export const formattedDate = (eventISODate) => {
    // (new Date(event.date).getMonth() + 1) + '-' + new Date(event.date).getDate() + '-' + new Date(event.date).getFullYear();
    const year = new Date(eventISODate).getFullYear();
    const day = new Date(eventISODate).getDate();
    const month = new Date(eventISODate).getMonth() + 1
    return month + "-" + day + "-" + year;
}


export const checkRoundCompleted = (item, allNets) => {
    const reportComplete = new Object();
    reportComplete.complete = [];
    reportComplete.incomplete = [];


    // console.log(item, allNets);
    function rounwiseCheck(game1, game2, game3, an, ani, anp, anpi) {
        if (anp[game1] && anp[game2] && anp[game3]) {
            // RETURN NO INCOMPLETED NET 
            // console.log("Completed net - ", ani + 1);
            reportComplete.complete.push(ani + 1);
        } else {
            // RETURN INCOMPLETED NET NUMBER 
            // console.log("Incompleted performance - ", anp);
            // console.log("Incompleted net - ", ani + 1);
            reportComplete.incomplete.push(ani + 1);
        }
    }



    if(allNets){
        allNets.forEach((an, ani) => {
            an.performance.forEach((anp, anpi) => {
                if (item === 1) {
                    // CHECK GAME 1, 2, 3
                    rounwiseCheck("game1", "game2", "game2", an, ani, anp, anpi);
                } else if (item === 2) {
                    rounwiseCheck("game4", "game5", "game6", an, ani, anp, anpi);
                } else if (item === 3) {
                    rounwiseCheck("game7", "game8", "game9", an, ani, anp, anpi);
                } else if (item === 4) {
                    rounwiseCheck("game10", "game11", "game12", an, ani, anp, anpi);
                }
            });
        });
    }else{
        reportComplete.incomplete.push(" ");
    }


    // [...new Set(array)];
    if (reportComplete.complete.length > 0) reportComplete.complete = [...new Set(reportComplete.complete)];
    if (reportComplete.incomplete.length > 0) reportComplete.incomplete = [...new Set(reportComplete.incomplete)];

    return reportComplete;
}
