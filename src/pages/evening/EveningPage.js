import React, {Component} from 'react';
import EveningSelectionForm from "../../components/EveningSelectionForm";
import EntityEditor, {COMPONENTS, TYPES} from "../../components/editors/EntityEditor";
import eveningActions from "../../actions/pages/EveningActions";
import {beautifyDate, beautifyTime} from "../../components/widgets/inputs/DateInput";
import Page from "../Page";
import OrdinationCreator from "../../components/widgets/inputs/OrdinationCreator";
import eveningPageStore from "./EveningPageStore";
import eveningPageActions from "./EveningPageActions";
import diningTablesCreatorActions from "./tables/DiningTablesCreatorActions";
import diningTablesEditorActions from "./tables/DiningTablesEditorActions";
import ordinationsCreatorActions from "./OrdinationsCreatorActions";
import ordinationsEditorActions from "./OrdinationsEditorActions";
import DiningTableEditor from "./tables/DiningTableEditor";
import Button from "../../widgets/Button";
import eveningSelectionFormActions from "../../actions/pages/EveningSelectionFormActions";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";
import eveningEditorActions from "./EveningEditorActions";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import EveningEditor from "./EveningEditor";
import EveningNav from "./EveningNav";

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
        let pageContent = EveningPage.makePageContent(this.state.data);
        let title = EveningPage.makeTitle(this.state.data);

        return (
            <Page title={title}>
                <EveningNav data={this.state.data}/>
                {pageContent}
            </Page>
        );
    }

    static makeTitle(state) {
        let title = "Gestione serata";
        if (state.get('evening')) {
            title += " " + beautifyDate(state.get('evening').get('day'));
        }
        return title;
    }

    static makePageContent(state) {
        if (state.get('evening')) {
            return <EveningEditor data={state}/>;
        } else {
            return <EveningSelectionForm/>;
        }
    }
}