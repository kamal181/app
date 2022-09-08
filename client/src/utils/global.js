export const hostname = "http://localhost:9290";
// export const hostname = "http://18.216.248.251";

export const POINT = "point", POINT_DIFFERENTIAL = "pointDeferential", SCORE = "score", NO_SCORE = "noScore", EXTRA_POINT = "extraPoint";



/*
// ⛏️⛏️ SETTING DEFAULT VALUE OF INPUT  
export const getDefaultValue = (p, scoreType, gameNum) => {
    if (scoreType === "point") {
        switch (gameNum) {
            case 1:
                if (p.game1 && p.game1 !== undefined) { return p.game1.point } else { return null };
            case 2:
                if (p.game2 && p.game2 !== undefined) { return p.game2.point } else { return null };
            case 3:
                if (p.game3 && p.game3 !== undefined) { return p.game3.point } else { return null };
        }
    }

    if (scoreType === "pointDeferential") {
        // console.log(p, round2.pointDeferential);
        switch (gameNum) {
            case 1:
                if (p.game1 && p.game1 !== undefined) { return p.game1.pointDeferential } else { return null };
            case 2:
                if (p.game2 && p.game2 !== undefined) { return p.game2.pointDeferential } else { return null };
            case 3:
                if (p.game3 && p.game3 !== undefined) { return p.game3.pointDeferential } else { return null };
        }
    }
}
*/
