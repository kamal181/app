export const totalDeferential = (performance) => {
    let deferential = 0;
    try {
        deferential = round1TD(performance) + round2TD(performance) + round3TD(performance) + round4TD(performance) + round5TD(performance);

        // if (performance.game13) { let pd = performance.game13.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        // if (performance.game14) { let pd = performance.game14.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        // if (performance.game15) { let pd = performance.game15.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}


export const roundwiseTotalPD = (performance, game1, game2, game3) => {
    let pointDifferential = 0;
    if (performance) {
        if (performance[game1]) pointDifferential += performance[game1].pointDeferential;
        if (performance[game2]) pointDifferential += performance[game2].pointDeferential;
        if (performance[game3]) pointDifferential += performance[game3].pointDeferential;
    }

    return pointDifferential;
}




export const round1TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game1) { deferential += performance.game1.pointDeferential; };
        if (performance.game2) { deferential += performance.game2.pointDeferential; };
        if (performance.game3) { deferential += performance.game3.pointDeferential; };
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}


export const round2TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game4) { deferential += performance.game4.pointDeferential; };
        if (performance.game5) { deferential += performance.game5.pointDeferential; };
        if (performance.game6) { deferential += performance.game6.pointDeferential; };
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}



export const round3TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game7) { deferential += performance.game7.pointDeferential; };
        if (performance.game8) { deferential += performance.game8.pointDeferential; };
        if (performance.game9) { deferential += performance.game9.pointDeferential; };
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}




export const round4TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game10) { deferential += performance.game10.pointDeferential; };
        if (performance.game11) { deferential += performance.game11.pointDeferential; };
        if (performance.game12) { deferential += performance.game12.pointDeferential; };
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}




export const round5TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game13) { deferential += performance.game13.pointDeferential; };
        if (performance.game14) { deferential += performance.game14.pointDeferential; };
        if (performance.game15) { deferential += performance.game15.pointDeferential; };
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}

