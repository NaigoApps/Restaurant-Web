import React, {Component} from 'react';
import Page from "./Page";
import {CONFIGURATION, EVENINGS, SETTINGS} from "../App";
import Row from "../widgets/Row";
import {ApplicationActions} from "../actions/ApplicationActions";
import Button from "../widgets/Button";
import Column from "../widgets/Column";

class HomePage extends Component {

    goToPage(page) {
        ApplicationActions.requestFullScreen();
        ApplicationActions.goToPage(page);
    }

    render() {
        return (
            <Page title="Home">
                <Row grow>
                    <Column sm="3">
                        <Button
                            text="Impostazioni"
                            icon="gears"
                            commitAction={() => this.goToPage(SETTINGS)}
                            size="xl"
                            vertical fill
                        />
                    </Column>
                    <Column sm="6">
                        <Button
                            text="Serate"
                            icon="calendar"
                            commitAction={() => this.goToPage(EVENINGS)}
                            size="xl"
                            vertical fill
                        />
                    </Column>
                    <Column sm="3">
                        <Button
                            text="Configurazione"
                            icon="pencil"
                            commitAction={() => this.goToPage(CONFIGURATION)}
                            size="xl"
                            vertical fill
                        />
                    </Column>
                </Row>
            </Page>
        );
    }
}

export default HomePage;
