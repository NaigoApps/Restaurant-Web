import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import FullPageLink from "../widgets/FullPageLink";
import Row from "../widgets/Row";

export default class RestaurantSettingsNav extends Component {

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
                <FullPageLink path="settings/printers" icon="print" text="Stampanti"/>
                <FullPageLink path="settings/locations" icon="print" text="Postazioni"/>
                <FullPageLink path="settings/tables" icon="sun-o" text="Tavoli"/>
                <FullPageLink path="settings/waiters" icon="male" text="Camerieri"/>
                <FullPageLink path="settings/menu" icon="cutlery" text="Menu"/>
                <FullPageLink path="settings/additions" icon="sliders" text="Varianti"/>
            </Row>
        );
    }
}