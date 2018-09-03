import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import {ADDITIONS, CATEGORIES, CUSTOMERS, DISHES, LOCATIONS, PRINTERS, TABLES, WAITERS} from "../App";
import Button from "../widgets/Button";
import {ApplicationActions} from "../actions/ApplicationActions";

export default class ConfigurationNav extends Component {

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
                    <Row grow topSpaced>
                        <Column>
                            <Button
                                icon="print"
                                text="Stampanti"
                                commitAction={() => this.goToPage(PRINTERS)}
                                size="xl"
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="print"
                                text="Postazioni"
                                size="xl"
                                commitAction={() => this.goToPage(LOCATIONS)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="sun-o"
                                text="Tavoli"
                                size="xl"
                                commitAction={() => this.goToPage(TABLES)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="male"
                                text="Camerieri"
                                size="xl"
                                commitAction={() => this.goToPage(WAITERS)}
                                fill vertical/>
                        </Column>
                    </Row>
                    <Row grow ofList>
                        <Column>
                            <Button
                                icon="cutlery"
                                text="Categorie"
                                size="xl"
                                commitAction={() => this.goToPage(CATEGORIES)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="cutlery"
                                text="Piatti"
                                size="xl"
                                commitAction={() => this.goToPage(DISHES)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="sliders"
                                text="Varianti"
                                size="xl"
                                commitAction={() => this.goToPage(ADDITIONS)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="male"
                                text="Clienti"
                                size="xl"
                                commitAction={() => this.goToPage(CUSTOMERS)}
                                fill vertical/>
                        </Column>
                    </Row>
                </Column>
            </Row>
        );
    }
}