import React, { useState } from 'react';
import { POINT, POINT_DIFFERENTIAL } from '../../utils/global';
import { arrangingPerformer } from '../../utils/arrangePerformer';
import { playersPoint, playersPointDifferential } from '../../utils/allPerformers';


function RoundTable(props) {

    // const [isLoading, setIsLoading] = useState(false);
    const { nets } = props.round;







    // ⛏️⛏️ THIS IS MAIN RETURN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    return (
        <div className="RoundTable">
            <div className="show-all-nets">
                {!props.initialize && (
                    <div className="table-responsive-lg net-table ">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr className="header-group-1">
                                    <th colSpan="1" scope="colgroup"></th>
                                    <th colSpan="3" scope="colgroup">Game {props.game[0]}</th>
                                    <th colSpan="3" scope="colgroup">Game {props.game[1]}</th>
                                    <th colSpan="3" scope="colgroup">Game {props.game[2]}</th>
                                    {/* <th colSpan="4" scope="colgroup">Average</th> */}
                                </tr>
                                <tr className="header-group-2">
                                    <th scope="col">Net</th>

                                    <th scope="col">Team</th>
                                    <th scope="col">point</th>
                                    <th scope="col">point deferential</th>


                                    <th scope="col">Team</th>
                                    <th scope="col">point</th>
                                    <th scope="col">point deferential</th>


                                    <th scope="col">Team</th>
                                    <th scope="col">point</th>
                                    <th scope="col">point deferential</th>

                                    {/* AVERAGE  */}
                                    {/* <th scope="col">Rank</th>
                                    <th scope="col">Participant</th>
                                    <th scope="col">point</th>
                                    <th scope="col">point deferential</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {nets && nets.map((net, i) => (
                                    <tr key={i} className="horizontal-border">
                                        <th scope="row">Net {net.sl || i + 1}</th>
                                        <td>{arrangingPerformer(net.performance, 1, props.game[0], POINT_DIFFERENTIAL, props.roundNum)} </td>
                                        <td >{playersPoint(net, props.game[0], POINT, 1, props.roundNum)} </td>
                                        <td >{playersPointDifferential(net, props.game[0], POINT_DIFFERENTIAL, 1, props.roundNum)} </td>

                                        <td>{arrangingPerformer(net.performance, 2, props.game[1], POINT_DIFFERENTIAL, props.roundNum)} </td>
                                        <td >{playersPoint(net, props.game[1], POINT, 2, props.roundNum)} </td>
                                        <td >{playersPointDifferential(net, props.game[1], POINT_DIFFERENTIAL, 2, props.roundNum)} </td>

                                        <td>{arrangingPerformer(net.performance, 3, props.game[2], POINT_DIFFERENTIAL, props.roundNum)} </td>
                                        <td >{playersPoint(net, props.game[2], POINT, 3, props.roundNum)} </td>
                                        <td >{playersPointDifferential(net, props.game[2], POINT_DIFFERENTIAL, 3, props.roundNum)} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RoundTable;




