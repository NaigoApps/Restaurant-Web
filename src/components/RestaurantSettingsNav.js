import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import FullPageLink from "../widgets/FullPageLink";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import {ADDITIONS, CUSTOMERS, LOCATIONS, MENU, PRINTERS, TABLES, WAITERS} from "../App";

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
            <Row grow>
                <Column>
                    <Row grow>
                        <Column>
                            <FullPageLink page={PRINTERS} icon="print" text="Stampanti"/>
                        </Column>
                        <Column>
                            <FullPageLink page={LOCATIONS} icon="print" text="Postazioni"/>
                        </Column>
                        <Column>
                            <FullPageLink page={TABLES} icon="sun-o" text="Tavoli"/>
                        </Column>
                        <Column>
                            <FullPageLink page={WAITERS} icon="male" text="Camerieri"/>
                        </Column>
                    </Row>
                    <Row grow topSpaced>
                        <Column>
                            <FullPageLink page={MENU} icon="cutlery" text="Menu"/>
                        </Column>
                        <Column>
                            <FullPageLink page={ADDITIONS} icon="sliders" text="Varianti"/>
                        </Column>
                        <Column>
                            <FullPageLink page={CUSTOMERS} icon="male" text="Clienti"/>
                        </Column>
                    </Row>
                </Column>
            </Row>
        );
    }
}