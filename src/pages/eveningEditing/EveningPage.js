import React from 'react';
import {beautifyDate} from "../../components/widgets/inputs/DateInput";
import Page from "../Page";
import eveningPageStore from "./EveningPageStore";
import eveningPageActions from "./EveningPageActions";
import EveningNav from "./EveningNav";
import ViewController from "../../widgets/ViewController";
import EditorMode from "../../utils/EditorMode";
import DiningTableCreator from "./diningTableEditing/DiningTableCreator";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import DiningTableEditor from "./diningTableEditing/DiningTableEditor";
import DiningTablesCRUD from "./DiningTablesCRUD";

export default class EveningPage extends ViewController {
    constructor(props) {
        super(props, eveningPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout(() => eveningPageActions.initEveningPage());
    }

    render() {
        let pageContent = EveningPage.makePageContent(this.state);
        let pageActions = EveningPage.makePageActions(this.state);
        let title = EveningPage.makeTitle(this.state);

        return (
            <Page title={title} {...this.state.general}>
                <EveningNav {...this.state}/>
                <Row topSpaced grow>
                    <Column sm="9">
                        {pageContent}
                    </Column>
                    <Column sm="3">
                        {pageActions}
                    </Column>
                </Row>
            </Page>
        );
    }

    static makeTitle(state) {
        let title = "Gestione serata";
        if (state.evening) {
            title += " " + beautifyDate(state.evening.day);
        }
        return title;
    }

    static makePageContent(state) {
        if(state.data.evening) {
            return <DiningTablesCRUD tables={state.data.evening.tables} page={state.tablesListPage}/>;
        }
        return <div/>;
    }

    static makePageActions(state){
        return <div/>;
    }

    static makeDiningTablePageContent(state) {
        const editor = state.diningTableEditing.editor;
        if (editor.mode === EditorMode.EDITING) {
            return <DiningTableEditor {...state}/>;
        } else if (editor.mode === EditorMode.CREATING) {
            return <DiningTableCreator {...state}/>;
        } else {
            return <div/>;
        }
    }
}