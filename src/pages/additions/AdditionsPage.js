import React from 'react';
import Page from "../Page";
import additionsPageActions from "./AdditionsPageActions";
import AdditionEditor from "./AdditionEditor";
import AdditionsNavigator from "./AdditionsNavigator";
import AdditionsNav from "./AdditionsNav";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import additionsPageStore from "./AdditionsPageStore";
import AdditionCreator from "./AdditionCreator";

export default class AdditionsPage extends ViewController {

    constructor(props) {
        super(props, additionsPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        additionsPageActions.initAdditionsPage();
    }

    render() {
        let pageContent = AdditionsPage.makePageContent(this.state);
        return (
            <Page title="Varianti" {...this.state.general}>
                <AdditionsNav {...this.state}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editorMode = data.editor.mode;
        if (editorMode === EditorMode.EDITING) {
            return <AdditionEditor {...data}/>
        } else if (editorMode === EditorMode.CREATING) {
            return <AdditionCreator {...data}/>
        } else {
            return <AdditionsNavigator {...data}/>
        }
    }

}