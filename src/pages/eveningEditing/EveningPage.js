import React, {Component} from 'react';
import EveningSelectionForm from "./eveningSelector/EveningSelector";
import {COMPONENTS, TYPES} from "../../components/editors/EntityEditor";
import {beautifyDate} from "../../components/widgets/inputs/DateInput";
import Page from "../Page";
import eveningPageStore from "./EveningPageStore";
import eveningPageActions from "./EveningPageActions";
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
            return <EveningSelectionForm data={state.get('eveningSelector')}/>;
        }
    }
}