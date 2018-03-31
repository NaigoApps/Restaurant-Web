import React, {Component} from 'react';
import applicationActions from "../actions/ApplicationActions";
import Icon from "../widgets/Icon";
import Button from "../widgets/Button";
import {HOME} from "../App";

export const SIZES = {
    HIDDEN: "HIDDEN",
    SMALL: "SMALL",
    MAIN: "MAIN"
};

class RestaurantNav extends Component {

    constructor() {
        super();
    }

    goHome(){
        applicationActions.dismissFullScreen();
        applicationActions.goToPage(HOME)
    }

    render() {

        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <Icon name="gear"/>
                </button>
                <div id="navbar" className="collapse navbar-collapse">
                    <Button
                        text="Home"
                        icon="home"
                        commitAction={() => this.goHome()}
                    />
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Button
                                icon="window-restore"
                                commitAction={() => applicationActions.toggleFullScreen()}/>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default RestaurantNav;