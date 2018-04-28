import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import {ADDITIONS, CUSTOMERS, LOCATIONS, MENU, PRINTERS, TABLES, WAITERS} from "../App";
import Button from "../widgets/Button";
import {ApplicationActions} from "../actions/ApplicationActions";

export default class RestaurantSettingsNav extends Component {

    constructor() {
        super();
    }

    goToPage(page) {
        ApplicationActions.requestFullScreen();
        ApplicationActions.goToPage(page);
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
                            <Button icon="print" text="Stampanti" commitAction={() => this.goToPage(PRINTERS)}/>
                        </Column>
                        <Column>
                            <Button page={LOCATIONS} icon="print" text="Postazioni"/>
                        </Column>
                        <Column>
                            <Button page={TABLES} icon="sun-o" text="Tavoli"/>
                        </Column>
                        <Column>
                            <Button page={WAITERS} icon="male" text="Camerieri"/>
                        </Column>
                    </Row>
                    <Row grow topSpaced>
                        <Column>
                            <Button page={MENU} icon="cutlery" text="Menu"/>
                        </Column>
                        <Column>
                            <Button page={ADDITIONS} icon="sliders" text="Varianti"/>
                        </Column>
                        <Column>
                            <Button page={CUSTOMERS} icon="male" text="Clienti"/>
                        </Column>
                    </Row>
                </Column>
            </Row>
        );
    }
}