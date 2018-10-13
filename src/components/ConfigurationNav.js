import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import Button from "../widgets/Button";
import {ApplicationActions} from "../actions/ApplicationActions";
import {Pages} from "../App";

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
                                commitAction={() => this.goToPage(Pages.PRINTERS)}
                                size="xl"
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="print"
                                text="Postazioni"
                                size="xl"
                                commitAction={() => this.goToPage(Pages.LOCATIONS)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="sun-o"
                                text="Tavoli"
                                size="xl"
                                commitAction={() => this.goToPage(Pages.TABLES)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="male"
                                text="Camerieri"
                                size="xl"
                                commitAction={() => this.goToPage(Pages.WAITERS)}
                                fill vertical/>
                        </Column>
                    </Row>
                    <Row grow ofList>
                        <Column>
                            <Button
                                icon="cutlery"
                                text="Categorie"
                                size="xl"
                                commitAction={() => this.goToPage(Pages.CATEGORIES)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="cutlery"
                                text="Piatti"
                                size="xl"
                                commitAction={() => this.goToPage(Pages.DISHES)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="sliders"
                                text="Varianti"
                                size="xl"
                                commitAction={() => this.goToPage(Pages.ADDITIONS)}
                                fill vertical/>
                        </Column>
                        <Column>
                            <Button
                                icon="male"
                                text="Clienti"
                                size="xl"
                                commitAction={() => this.goToPage(Pages.CUSTOMERS)}
                                fill vertical/>
                        </Column>
                    </Row>
                </Column>
            </Row>
        );
    }
}