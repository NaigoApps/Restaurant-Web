import React from 'react';
import Page from "../Page";
import printersPageStore from "./PrintersPageStore";
import PrinterEditor from "./PrinterEditor";
import PrintersNavigator from "./PrintersNavigator";
import PrintersNav from "./PrintersNav";
import ViewController from "../../widgets/ViewController";
import EditorMode from "../../utils/EditorMode";
import PrinterCreator from "./PrinterCreator";
import {PrintersPageActions} from "./PrintersPageActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class PrintersPage extends ViewController {

    constructor(props) {
        super(props, printersPageStore, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        PrintersPageActions.initPrintersPage();
    }

    render() {
        let pageContent = PrintersPage.makePageContent(this.state);
        return (
            <Page title="Stampanti">
                <PrintersNav {...this.state.printers}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        if (data.printers.editor.mode === EditorMode.CREATING) {
            return <PrinterCreator {...data.printers} data={data.data}/>
        } else if (data.printers.editor.mode === EditorMode.EDITING) {
            return <PrinterEditor {...data.printers} data={data.data}/>
        } else {
            return <PrintersNavigator general={data.general} data={data.data} page={data.printers.navigator.page}/>
        }
    }

}