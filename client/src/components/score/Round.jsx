import React, { useEffect } from 'react';
import Point from './Point';
import RoundTable from './RoundTable';

function Round(props) {

    // console.log("Props - ",props);
    // if()
    useEffect(() => {
        console.log("Component did mount [Round.jsx]");
        // console.log(props);
    }, []);

    return (
        <div className="Round">
            {props.pp.length > 0 ? (<React.Fragment>
                <div className="row">
                    {props.pp && props.pp.length > 1 && (
                        <div className="col-md-6">
                            <div className="roundwise-ranking">
                                <h2 className="h2">Round {props.roundNum}</h2>
                                <Point roundNum={props.roundNum} pp={props.pp} roundwise={true} />
                            </div>
                        </div>
                    )}
                </div>
                {/* {!props.public && ()} */}
                <div className="row">
                    <h3>Match-up</h3>
                    <RoundTable game={props.game} round={props.round} roundNum={props.roundNum} />
                </div>
            </React.Fragment>) : (<div className="row">Round is not assigned yet</div>)}


        </div>
    )
}

export default Round;
