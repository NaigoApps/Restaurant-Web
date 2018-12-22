import React, {Component} from 'react';
import Page from "../Page";
import waitersPageStore from "./WaitersPageStore";
import WaiterEditor from "./WaiterEditor";
import WaitersNavigator from "./WaitersNavigator";
import WaitersNav from "./WaitersNav";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import {WaitersPageActions} from "./WaitersPageActions";
import WaiterCreator from "./WaiterCreator";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class WaitersPage extends ViewController {

    constructor(props) {
        super(props, waitersPageStore, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        WaitersPageActions.initWaitersPage();
    }

    render() {
        let pageContent = WaitersPage.makePageContent(this.state);
        return (
            <Page title="Camerieri">
                <WaitersNav {...this.state}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {

        if (data.waiters.editor.mode === EditorMode.EDITING) {
            return <WaiterEditor {...data.waiters} data={data.data}/>
        } else if (data.waiters.editor.mode  === EditorMode.CREATING) {
            return <WaiterCreator {...data.waiters} data={data.data}/>
        } else {
            return <WaitersNavigator {...data}/>
        }
    }
}