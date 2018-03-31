import React, {Component} from 'react';
import Page from "../Page";
import additionsPageStore from "./AdditionsPageStore";
import additionsPageActions from "./AdditionsPageActions";
import additionsEditorActions from "./AdditionsEditorActions";
import AdditionEditor from "./AdditionEditor";
import AdditionCreator from "./AdditionCreator";
import AdditionsNavigator from "./AdditionsNavigator";
import NavElementLink from "../../widgets/NavElementLink";
import NavElement from "../../widgets/NavElement";
import NavPills from "../../widgets/NavPills";
import {findByUuid} from "../../utils/Utils";
import {SETTINGS} from "../../App";

const {Map} = require('immutable');

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
        let navContent = AdditionsPage.makeNavContent(this.state.data);
        let pageContent = AdditionsPage.makePageContent(this.state.data);
        return (
            <Page title="Varianti">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.get('selectedAddition')) {
            return <AdditionEditor data={AdditionsPage.makeAdditionEditorDescriptor(state)}/>
        } else if (state.get('createdAddition')) {
            return <AdditionCreator data={AdditionsPage.makeAdditionCreatorDescriptor(state)}/>
        } else {
            return <AdditionsNavigator data={state}/>
        }
    }

    static makeAdditionEditorDescriptor(data) {
        return Map({
            addition: findByUuid(data.get('additions'), data.get('selectedAddition'))
        })
    }

    static makeAdditionCreatorDescriptor(data) {
        return Map({
            addition: data.get('createdAddition')
        })
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            page={SETTINGS}
        />);
        elements.push(<NavElement
            key="additions"
            text="Varianti"
            active={!state.get('selectedAddition') && !state.get('createdAddition')}
            commitAction={additionsEditorActions.deselectAddition}
        />);
        if (state.get('selectedAddition')) {
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.get('additions'), state.get('selectedAddition')).get('name')}
                active={true}
            />);
        } else if (state.get('createdAddition')) {
            elements.push(<NavElement
                key="selected"
                text={state.get('createdAddition').get('name') || "Nuova variante"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}