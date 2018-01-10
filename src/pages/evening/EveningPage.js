import React, {Component} from 'react';
import EveningSelectionForm from "../../components/EveningSelectionForm";
import EntityEditor, {COMPONENTS, TYPES} from "../../components/editors/EntityEditor";
import eveningActions from "../../actions/pages/EveningActions";
import {beautifyDate, beautifyTime} from "../../components/widgets/inputs/DateInput";
import Page from "../Page";
import OrdinationCreator from "../../components/widgets/inputs/OrdinationCreator";
import eveningPageStore from "./EveningPageStore";
import eveningPageActions from "./EveningPageActions";
import diningTablesCreatorActions from "./DiningTablesCreatorActions";
import diningTablesEditorActions from "./DiningTablesEditorActions";
import ordinationsCreatorActions from "./OrdinationsCreatorActions";
import ordinationsEditorActions from "./OrdinationsEditorActions";
import DiningTableEditor from "./DiningTableEditor";
import Button from "../../widgets/Button";
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";
import eveningEditorActions from "./EveningEditorActions";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import EveningEditor from "./EveningEditor";

export default class EveningPage extends Component {
    constructor(props) {
        super(props);

        this.state = eveningPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        eveningPageStore.addChangeListener(this.updateState);

        eveningPageActions.initEveningPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        eveningPageStore.removeChangeListener(this.updateState);
    }


    render() {
        let pageContent = EveningPage.makePageContent(this.state);
        let title = EveningPage.makeTitle(this.state);

        return (
            <Page title={title}>
                {pageContent}
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
        if (state.evening) {
            return <EveningEditor data={state}/>;
        } else {
            return <EveningSelectionForm eveningDate={state.date}/>;
        }
    }
}