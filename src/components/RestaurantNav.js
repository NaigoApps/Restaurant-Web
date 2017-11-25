import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import applicationStore from "../stores/ApplicationStore";
import applicationActions from "../actions/ApplicationActions";

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

    toggleFullScreen(){
        applicationActions.toggleFullScreen();
    }

    render() {
        let linksComponents = <li>
            <span className="navbar-brand">
                <Link to={"/restaurant/"} replace={true}>
                    <span className="glyphicon glyphicon-home"/>
                </Link>
            </span>
        </li>;

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-left">
                            {linksComponents}
                            <p className="navbar-text">{this.props.title}</p>
                            {this.props.content}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <p className="navbar-text">
                                <a className="clickable" onClick={this.toggleFullScreen.bind(this)}>
                                    <span className="glyphicon glyphicon-resize-full"/>
                                </a>
                            </p>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default RestaurantNav;