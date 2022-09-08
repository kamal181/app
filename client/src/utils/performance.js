import React from 'react';
// ALL CONDITIONS RELATED TO PERFORMANCE 
import { getTDRound, getTotalPointOfARound } from "./tptd";


export const showLiftedPefrormance = (lp, rn, recoverLeftedPerformance, concatinable) => {
    // console.log(lp.length);
    if (lp && lp.length > 0) {
        return (<React.Fragment>
            <h2 className="h2">Players Who Leave</h2>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Point</th>
                        <th scope="col">Point Differential</th>
                        {concatinable && <th scope="col">Action</th>}

                    </tr>
                </thead>
                <tbody>
                    {lp.map((p, i) => (<tr key={i} >
                        <td>{p.participant.firstname + " " + p.participant.lastname}</td>
                        <td>{getTotalPointOfARound(p, rn).toFixed(2)}</td>
                        <td>{getTDRound(p, rn)}</td>
                        {concatinable && <td><button className="btn btn-primary" onClick={(e) => recoverLeftedPerformance(e, p._id)} > Add</button></td>}

                    </tr>))}
                </tbody>
            </table>
        </React.Fragment>);
    }
}
