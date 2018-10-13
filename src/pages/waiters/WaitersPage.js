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

export default class WaitersPage extends ViewController {

    constructor(props) {
        super(props, waitersPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        WaitersPageActions.initWaitersPage();
    }

    render() {
        let pageContent = WaitersPage.makePageContent(this.state);
        return (
            <Page title="Camerieri" {...this.state.general}>
                <WaitersNav {...this.state}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {

        if (data.editor.mode === EditorMode.EDITING) {
            return <WaiterEditor {...data}/>
        } else if (data.editor.mode  === EditorMode.CREATING) {
            return <WaiterCreator {...data}/>
        } else {
            return <WaitersNavigator {...data}/>
        }
    }
}