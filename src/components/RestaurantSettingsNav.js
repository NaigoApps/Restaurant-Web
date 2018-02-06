import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import FullPageLink from "../widgets/FullPageLink";
import Row from "../widgets/Row";
import Column from "../widgets/Column";

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
                <Column>
                    <FullPageLink path="settings/printers" icon="print" text="Stampanti"/>
                </Column>
                <Column>
                    <FullPageLink path="settings/locations" icon="print" text="Postazioni"/>
                </Column>
                <Column>
                    <FullPageLink path="settings/tables" icon="sun-o" text="Tavoli"/>
                </Column>
                <Column>
                    <FullPageLink path="settings/waiters" icon="male" text="Camerieri"/>
                </Column>
                <Column>
                    <FullPageLink path="settings/menu" icon="cutlery" text="Menu"/>
                </Column>
                <Column>
                    <FullPageLink path="settings/additions" icon="sliders" text="Varianti"/>
                </Column>
            </Row>
        );
    }
}