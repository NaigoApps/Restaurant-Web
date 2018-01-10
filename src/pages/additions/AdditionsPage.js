import React, {Component} from 'react';
import Page from "../Page";
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import additionsPageStore from "./AdditionsPageStore";
import additionsPageActions from "./AdditionsPageActions";
import additionsCreatorActions from "./AdditionsCreatorActions";
import additionsEditorActions from "./AdditionsEditorActions";
import AdditionEditor from "./AdditionEditor";
import AdditionCreator from "./AdditionCreator";
import AdditionsNavigator from "./AdditionsNavigator";
import NavElementLink from "../../widgets/NavElementLink";
import NavElement from "../../widgets/NavElement";
import NavPills from "../../widgets/NavPills";
import {findByUuid} from "../../utils/Utils";

export default class AdditionsPage extends Component {

    constructor(props) {
        super(props);
        this.state = additionsPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        additionsPageStore.addChangeListener(this.updateState);

        additionsPageActions.initAdditionsPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        additionsPageStore.removeChangeListener(this.updateState);
    }


    render() {
        let navContent = AdditionsPage.makeNavContent(this.state);
        let pageContent = AdditionsPage.makePageContent(this.state);
        return (
            <Page title="Varianti">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.selectedAddition) {
            return <AdditionEditor data={AdditionsPage.makeAdditionEditorDescriptor(state)}/>
        } else if (state.createdAddition) {
            return <AdditionCreator data={AdditionsPage.makeAdditionCreatorDescriptor(state)}/>
        } else {
            return <AdditionsNavigator data={state}/>
        }
    }

    static makeAdditionEditorDescriptor(data) {
        return {
            addition: findByUuid(data.additions, data.selectedAddition)
        }
    }

    static makeAdditionCreatorDescriptor(data) {
        return {
            addition: data.createdAddition
        }
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            href="/restaurant/settings"
        />);
        elements.push(<NavElement
            key="additions"
            text="Varianti"
            active={!state.selectedAddition && !state.createdAddition}
            commitAction={additionsEditorActions.deselectAddition}
        />);
        if (state.selectedAddition) {
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.additions, state.selectedAddition).name}
                active={true}
            />);
        } else if (state.createdAddition) {
            elements.push(<NavElement
                key="selected"
                text={state.createdAddition.name || "Nuova variante"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}