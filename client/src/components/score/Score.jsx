import React, { Component } from 'react';
import { hostname } from '../../utils/global';
import Point from './Point';
import Round from './Round';
import Loader from '../elements/Loader';
import withRouter from '../../HOC/withRouter';
import "../../style/Score.css";


class Score extends Component {
    constructor(props) {
        super(props);
        this.is_mounted = false;
        this.state = {
            currentEventID: this.props.params.id,
            // currentEventID: this.props.match.params.id,
            isLoading: false,
            round1: [],
            round2: [],
            round3: [],
            round4: [],
            round5: [],
            round1NR: [],
            round2NR: [],
            round3NR: [],
            round4NR: [],
            round5NR: [],
            allRank: [],

            activeItem: 1,
            allRound: [],
            game: [1, 2, 3]
        }


        this.findRankingRound = this.findRankingRound.bind(this);
        this.showTabContent = this.showTabContent.bind(this);
        this.activeItemHandler = this.activeItemHandler.bind(this);
        this.findRound = this.findRound.bind(this);
    }


    // ⛏️⛏️ GET ALL NETS FROM A ROUND WITH RANKING ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    async findRankingRound() {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { "Content-Type": 'application/json' },
                credentials: "include"
            };

            this.setState({ isLoading: true });
            const response = await fetch(`${hostname}/api/round/ranking/${this.state.currentEventID}`, requestOptions);
            console.log("Get nets from round with ranking - ", response);
            const text = await response.text();
            const jsonRes = await JSON.parse(text);
            // console.log("JSON--------------------");
            // console.log(jsonRes);
            for (let i = 1; i <= 5; i++) {
                if (jsonRes[`round${i}`]) this.setState({ [`round${i}`]: jsonRes[`round${i}`] });
                if (jsonRes[`round${i}NR`]) this.setState({ [`round${i}NR`]: jsonRes[`round${i}NR`] });
            }


            if (jsonRes.allPerformances && jsonRes.allPerformances.length > 0) this.setState({ allRank: jsonRes.allPerformances });
            // console.log("jsonRes.allPerformances - ", jsonRes.allPerformances);


            // CHECK FOR INITIAL NET 
            this.setState({ isLoading: false });

        } catch (error) {
            console.log(error);
        }

    }



    // ⛏️⛏️ GET ALL NETS FROM A ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    findRound = async (r) => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { "Content-Type": 'application/json' },
                credentials: "include"
            };
            this.setState({ isLoading: true });

            const response = await fetch(`${hostname}/api/round/get-single-round/${this.state.currentEventID}/${r}`, requestOptions);
            console.log("Get nets from round - ", response);
            const text = await response.text();
            const jsonRes = await JSON.parse(text);
            // console.log(r);
            // console.log("JSON - find round");
            // console.log(jsonRes);

            // CHECK FOR INITIAL NET 
            if (jsonRes.findRound) {
                this.setState({ allRound: jsonRes.findRound })
            }

            this.setState({ isLoading: false });
            // console.log("Loading - ",isLoading);
        } catch (error) {
            console.log(error);
        }

    }

    // componentDidUpdate(){
    //     console.log(this.state.pp);
    // }

    componentDidMount() {
        // console.log(this.props);
        this.is_mounted = true;
        this.findRankingRound();
        this.findRound(this.state.activeItem);
        // if (!this.props.admin) {
        //     // console.log("Active item - ", this.state.activeItem);

        // }
    }


    componentWillUnmount() {
        this.is_mounted = false;
    }


    activeItemHandler(e, item) {
        // console.log(e);
        // console.log(item);
        e.preventDefault();
        // setActiveItem(item);
        if (!this.props.admin) {
            this.findRound(item);
        }
        this.setState({ activeItem: item, allRound: this.state[`round${item}NR`] });
        // findRankingRound(item);
        if (item === 1) {
            this.setState({ game: [1, 2, 3] });
        } else if (item === 2) {
            this.setState({ game: [4, 5, 6] });
        } else if (item === 3) {
            this.setState({ game: [7, 8, 9] });
        } else if (item === 4) {
            this.setState({ game: [10, 11, 12] });
        } else if (item === 5) {
            this.setState({ game: [13, 14, 15] });
        }
    }



    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS */
    showTabContent = () => {
        // console.log("Loading - ", isLoading);
        switch (this.state.activeItem) {
            case 1:
                if (this.state.isLoading) {
                    // console.log("Loading (true) - ", isLoading);
                    return <Loader />;
                } else {
                    // console.log("Loading(false) - ", isLoading);
                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round1} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            case 2:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {

                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round2} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            case 3:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round3} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            case 4:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round4} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            case 5:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round5} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            default:
                return (<div className="tab-pane fade show active" >Event overview</div>);
        }
    }




    render() {
        const one = 1, two = 2, three = 3, four = 4, five = 5;
        return (
            <div className="Score">
                <div className="container">
                    {this.state.isLoading ? <Loader /> : (<div className="display-event-details">
                        <div className="whole-ranking">
                            <h2 className="h2">Overall ranking</h2>
                            <Point roundNum={5} pp={this.state.allRank} roundwise={false} />
                        </div>
                        <nav className="nav nav-pills">
                            {/* <a className="nav-link active" className={this.state.activeItem === one ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, one)}>Round 1</a>
                            <a className="nav-link active" className={this.state.activeItem === two ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, two)}>Round 2</a>
                            <a className="nav-link active" className={this.state.activeItem === three ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, three)}>Round 3</a>
                            <a className="nav-link active" className={this.state.activeItem === four ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, four)}>Round 4</a>
                            <a className="nav-link active" className={this.state.activeItem === five ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, five)}>Round 5</a> */}

                            <a className={this.state.activeItem === one ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, one)}>Round 1</a>
                            <a className={this.state.activeItem === two ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, two)}>Round 2</a>
                            <a className={this.state.activeItem === three ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, three)}>Round 3</a>
                            <a className={this.state.activeItem === four ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, four)}>Round 4</a>
                            <a className={this.state.activeItem === five ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, five)}>Round 5</a>

                            {/* <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
                        </nav>
                        <div className="tab-content" >
                            {this.showTabContent()}
                        </div>
                        {/* <div className="row">
                        {this.state.round1 && this.state.round1.length > 1 && (
                            <div className="col-md-6">
                                <div className="roundwise-ranking">
                                    <h2 className="h2">Round 1</h2>
                                    <Point roundNum={1} pp={this.state.round1} />
                                </div>
                            </div>
                        )}
                        {this.state.round2 && this.state.round2.length > 1 && (
                            <div className="col-md-6">
                                <div className="roundwise-ranking">
                                    <h2 className="h2">Round 2</h2>
                                    <Point roundNum={2} pp={this.state.round2} />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        {this.state.round3 && this.state.round3.length > 1 && (
                            <div className="col-md-6">
                                <div className="roundwise-ranking">
                                    <h2 className="h2">Round 3</h2>
                                    <Point roundNum={3} pp={this.state.round3} />
                                </div>
                            </div>
                        )}

                        {this.state.round4 && this.state.round4.length > 1 && (
                            <div className="col-md-6">
                                <div className="roundwise-ranking">
                                    <h2 className="h2">Round 4</h2>
                                    <Point roundNum={4} pp={this.state.round4} />
                                </div>
                            </div>
                        )}

                    </div>
                 */}
                    </div>)}
                </div>
            </div>
        )
    }
}

export default withRouter(Score);
