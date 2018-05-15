import React, {Component} from 'react';
import Page from "./Page";
import {CONFIGURATION, EVENINGS, SETTINGS} from "../App";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import Button from "../widgets/Button";
import {ApplicationActions} from "../actions/ApplicationActions";

class HomePage extends Component {

    goToPage(page) {
        ApplicationActions.requestFullScreen();
        ApplicationActions.goToPage(page);
    }

    render() {
        return (
            <Page title="Home">
                <Row grow>
                    <Column>
                        <Button
                            size="xl"
                            icon="calendar"
                            text="Serate"
                            commitAction={() => this.goToPage(EVENINGS)}
                            fill vertical
                        />
                    </Column>
                </Row>
                <Row grow ofList>
                    <Column>
                        <Button
                            size="xl"
                            icon="gears"
                            text="Impostazioni"
                            commitAction={() => this.goToPage(SETTINGS)}
                            fill vertical
                        />
                    </Column>
                    <Column>
                        <Button
                            size="xl"
                            icon="pencil"
                            text="Configurazione"
                            commitAction={() => this.goToPage(CONFIGURATION)}
                            fill vertical
                        />
                    </Column>
                </Row>
            </Page>
        );
    }
}

export default HomePage;
