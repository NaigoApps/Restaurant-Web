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

export default class PrintersPage extends ViewController {

    constructor(props) {
        super(props, printersPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        PrintersPageActions.initPrintersPage();
    }

    render() {
        let pageContent = PrintersPage.makePageContent(this.state);
        return (
            <Page title="Stampanti" {...this.state.general}>
                <PrintersNav {...this.state}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        if (data.editor.mode === EditorMode.CREATING) {
            return <PrinterCreator {...data}/>
        } else if (data.editor.mode === EditorMode.EDITING) {
            return <PrinterEditor {...data}/>
        } else {
            return <PrintersNavigator {...data}/>
        }
    }

}