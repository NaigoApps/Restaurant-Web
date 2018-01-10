import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import FullPageLink from "../widgets/FullPageLink";
import Row from "../widgets/Row";

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
            <Row>
                <FullPageLink path="settings" icon="gears" text="Impostazioni"/>
                <FullPageLink path="evening" icon="calendar" text="Serate"/>
            </Row>
        );
    }
}