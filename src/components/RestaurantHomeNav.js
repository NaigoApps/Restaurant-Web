import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import FullPageLink from "../widgets/FullPageLink";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import {EVENINGS, SETTINGS} from "../App";

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
            <Row grow>
                <Column>
                    <FullPageLink page={SETTINGS} icon="gears" text="Impostazioni"/>
                </Column>
                <Column>
                    <FullPageLink page={EVENINGS} icon="calendar" text="Serate"/>
                </Column>
            </Row>
        );
    }
}