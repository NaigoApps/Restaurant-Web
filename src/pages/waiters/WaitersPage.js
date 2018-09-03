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
        let pageContent = WaitersPage.makePageContent(this.state.data);
        return (
            <Page title="Camerieri">
                <WaitersNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {

        if (data.editor.mode === EditorMode.EDITING) {
            return <WaiterEditor data={data}/>
        } else if (data.editor.mode  === EditorMode.CREATING) {
            return <WaiterCreator data={data}/>
        } else {
            return <WaitersNavigator data={data}/>
        }
    }
}