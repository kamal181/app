import { roundwiseTotalPoint } from './addTotalPoint';
import { roundwiseTotalPD } from './pointDeferential';
// import equal from '/icon/equal_math_sign_icon.svg';

export const getTotalPointOfARound = (p, rn) => {
    // console.log(p);
    // console.log(rn);
    /**
     * temperary update.
     */
    rn--;
    if (rn === 1) {
        return roundwiseTotalPoint(p, "game1", 'game2', "game3");
    } else if (rn === 2) {
        return roundwiseTotalPoint(p, "game1", 'game2', "game3") + roundwiseTotalPoint(p, "game4", 'game5', "game6");
    } else if (rn === 3) {
        return roundwiseTotalPoint(p, "game1", 'game2', "game3") + roundwiseTotalPoint(p, "game4", 'game5', "game6") + roundwiseTotalPoint(p, "game7", 'game8', "game9");
    } else if (rn === 4) {
        return roundwiseTotalPoint(p, "game1", 'game2', "game3") + roundwiseTotalPoint(p, "game4", 'game5', "game6") + roundwiseTotalPoint(p, "game7", 'game8', "game9") + roundwiseTotalPoint(p, "game10", 'game11', "game12");
    } else if (rn === 5) {
        return roundwiseTotalPoint(p, "game1", 'game2', "game3") + roundwiseTotalPoint(p, "game4", 'game5', "game6") + roundwiseTotalPoint(p, "game7", 'game8', "game9") + roundwiseTotalPoint(p, "game10", 'game11', "game12") + roundwiseTotalPoint(p, "game13", 'game14', "game15");
    }
}


export const getTDRound = (p, rn) => {
    // console.log(p);
    // console.log(rn);
    /**
     * temperary update.
     */
    rn--;
    if (rn === 1) {
        return roundwiseTotalPD(p, "game1", "game2", "game3");
    } else if (rn === 2) {
        return roundwiseTotalPD(p, "game1", "game2", "game3") + roundwiseTotalPD(p, "game4", "game5", "game6");
    } else if (rn === 3) {
        return roundwiseTotalPD(p, "game1", "game2", "game3") + roundwiseTotalPD(p, "game4", "game5", "game6") + roundwiseTotalPD(p, "game7", "game8", "game9");
    } else if (rn === 4) {
        return roundwiseTotalPD(p, "game1", "game2", "game3") + roundwiseTotalPD(p, "game4", "game5", "game6") + roundwiseTotalPD(p, "game7", "game8", "game9") + roundwiseTotalPD(p, "game10", "game11", "game12");
    } else if (rn === 5) {
        return roundwiseTotalPD(p, "game1", "game2", "game3") + roundwiseTotalPD(p, "game4", "game5", "game6") + roundwiseTotalPD(p, "game7", "game8", "game9") + roundwiseTotalPD(p, "game10", "game11", "game12") + roundwiseTotalPD(p, "game13", "game14", "game15");
    }
}




export const getRankingNumber = (index, pList, rn) => {
    let cell = null;
    // const nextPlayerTotal = getTotalPointOfARound(pList[index + 1], rn);
    // const nextPlayerTD = getTDRound(pList[index + 1], rn);
    // console.log(rn);
    const previousPlayerTotal = getTotalPointOfARound(pList[index - 1], rn);
    const previousPlayerTD = getTDRound(pList[index - 1], rn);


    const currentPlyerTotal = getTotalPointOfARound(pList[index], rn);
    const nextPlayerTotal = getTotalPointOfARound(pList[index + 1], rn);

    const currentPlyerPD = getTDRound(pList[index], rn);
    const nextPlayerTD = getTDRound(pList[index + 1], rn);

    cell = <><div>{index + 1}</div></>;
    /* 
        if (currentPlyerTotal === nextPlayerTotal && currentPlyerPD === nextPlayerTD) {
            cell = <><div>{index + 1}</div><div><img src="/icon/equal_math_sign_icon.svg" className="equal-icon" alt="image" /></div></>;
        } else {
            if (currentPlyerTotal === previousPlayerTotal && currentPlyerPD === previousPlayerTD) {
                // cell = `${index + 1} = `;
                cell = <><div>{index + 1}</div><div><img src="/icon/equal_math_sign_icon.svg" className="equal-icon"  alt="image" /></div></>;
            } else {
                // cell = `<div>${index + 1}</div>`;
                cell = <><div>{index + 1}</div></>;
            }
        }
     */
    // else if (currentPlyerTotal === previousPlayerTotal && currentPlyerPD === previousPlayerTD) {
    //     i =  index ;
    // } else {
    //     i = index + 1;
    // }
    return <div className="rank-num d-flex w-full justify-content-between">{cell}</div>;
}

