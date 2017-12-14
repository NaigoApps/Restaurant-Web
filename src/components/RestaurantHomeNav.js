import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {LINKS, SIZES} from "./RestaurantNav";
import applicationActions from "../actions/ApplicationActions";
import FullPageLink from "../widgets/FullPageLink";

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
        return (
            <div className="home-links-container">
                <FullPageLink path="" icon="gears" text="Impostazioni"/>
                <FullPageLink path="evening" icon="calendar" text="Serate"/>
            </div>
        );
    }
}