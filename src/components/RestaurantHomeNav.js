import React, {Component} from 'react';
import {SIZES} from "./RestaurantNav";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import {EVENINGS, SETTINGS} from "../App";
import Button from "../widgets/Button";
import {ApplicationActions} from "../actions/ApplicationActions";

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

    goToPage(page) {
        ApplicationActions.requestFullScreen();
        ApplicationActions.goToPage(page);
    }

    render() {
        return (
            <Row grow>
                <Column>
                    <Button
                        separator={<br/>}
                        size="xl"
                        icon="gears"
                        text="Impostazioni"
                        commitAction={() => this.goToPage(SETTINGS)}
                        fill
                    />
                </Column>
                <Column>
                    <Button
                        separator={<br/>}
                        size="xl"
                        icon="calendar"
                        text="Serate"
                        commitAction={() => this.goToPage(EVENINGS)}
                        fill
                    />
                </Column>
            </Row>
        );
    }
}