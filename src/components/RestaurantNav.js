import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import applicationActions from "../actions/ApplicationActions";
import NavButtonLink from "../widgets/NavButtonLink";
import NavButton from "../widgets/NavButton";
import Icon from "../widgets/Icon";
import Button from "../widgets/Button";

export const SIZES = {
    HIDDEN: "HIDDEN",
    SMALL: "SMALL",
    MAIN: "MAIN"
};

export const LINKS = [
    {path: "", replace: true, label: "Home", size: SIZES.HIDDEN},
    {path: "printers", label: "Stampanti", icon: "print"},
    {path: "locations", label: "Postazioni", icon: "map-marker"},
    {path: "tables", label: "Tavoli", icon: "record"},
    {path: "waiters", label: "Camerieri", icon: "user"},
    {path: "additions", label: "Varianti", icon: "pencil"},
    {path: "menu", label: "Menu", icon: "apple"},
    {path: "evening", label: "Serate", size: SIZES.MAIN, icon: "list-alt"},
];

class RestaurantNav extends Component {

    constructor() {
        super();
    }

    toggleFullScreen() {
        applicationActions.toggleFullScreen();
    }

    render() {

        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <Icon name="gear"/>
                </button>
                <div id="navbar" className="collapse navbar-collapse">
                    <NavButtonLink
                        icon="home"
                        path="/restaurant"
                    />
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><a className="nav-link">{this.props.title}</a></li>
                        {this.props.content}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavButton
                                icon="window-restore"
                                commitAction={this.toggleFullScreen.bind(this)}/>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default RestaurantNav;