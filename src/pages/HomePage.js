import React from 'react';
import Page from "./Page";
import Row from "../widgets/Row";
import {ApplicationActions} from "../actions/ApplicationActions";
import Button from "../widgets/Button";
import Column from "../widgets/Column";
import ViewController from "../widgets/ViewController";
import {Pages} from "../App";
import EveningEditorActions from "./eveningEditing/EveningEditorActions";
import dataStore from "../stores/DataStore";
import loadingStore from "../stores/LoadingStore";
import applicationStore from "../stores/ApplicationStore";
import errorsStore from "../stores/ErrorsStore";

class HomePage extends ViewController {

    constructor(props){
        super(props, dataStore, loadingStore, applicationStore, errorsStore);
    }

    componentDidMount(){
        super.componentDidMount();
        EveningEditorActions.getSelectedEvening();
    }

    goToPage(page) {
        ApplicationActions.requestFullScreen();
        ApplicationActions.goToPage(page);
    }

    goToEveningPage(){
        ApplicationActions.requestFullScreen();
        if(this.state.data.evening){
            ApplicationActions.goToPage(Pages.EVENINGS);
        }else{
            ApplicationActions.goToPage(Pages.EVENING_SELECTION);
        }
    }

    render() {
        return (
            <Page title="Home">
                <Row grow>
                    <Column sm="3">
                        <Button
                            text="Impostazioni"
                            icon="gears"
                            commitAction={() => this.goToPage(Pages.SETTINGS)}
                            size="xl"
                            vertical fill
                        />
                    </Column>
                    <Column sm="6">
                        <Button
                            text="Serate"
                            icon="calendar"
                            commitAction={() => this.goToEveningPage()}
                            size="xl"
                            vertical fill
                        />
                    </Column>
                    <Column sm="3">
                        <Button
                            text="Configurazione"
                            icon="pencil"
                            commitAction={() => this.goToPage(Pages.CONFIGURATION)}
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
