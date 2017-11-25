import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {LINKS, SIZES} from "./RestaurantNav";

export default class RestaurantHomeNav extends Component {

    constructor() {
        super();
    }

    linkClass(link) {
        let classes = ["home-link"];
        if (link.size && link.size === SIZES.MAIN) {
            classes.push("main");
        }
        return classes.join(" ");
    }

    render() {
        let linksComponents = LINKS.filter(link => !link.size || link.size !== SIZES.MAIN && link.size !== SIZES.HIDDEN).map(link =>
            (<div key={link.path} className={this.linkClass(link)}>
                <Link to={"/restaurant/" + link.path} replace={!!link.replace}>
                    <span className={"glyphicon glyphicon-" + link.icon}/>
                </Link>
            </div>));

        let mainComponent = LINKS.filter(link => link.size === SIZES.MAIN).map(link =>
            (<div key={link.path} className={this.linkClass(link)}>
                <Link to={"/restaurant/" + link.path} replace={!!link.replace}>
                    <span className={"glyphicon glyphicon-" + link.icon}/>
                </Link>
            </div>));

        return (
            <div>
                <div className="home-links-container">
                    {linksComponents}
                </div>
                <div>
                    {mainComponent}
                </div>
            </div>
        );
    }
}