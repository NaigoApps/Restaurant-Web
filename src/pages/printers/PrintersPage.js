import React, {Component} from 'react';
import Page from "../Page";
import {TYPES} from "../../components/editors/EntityEditor";
import printersPageStore from "./PrintersPageStore";
import printersPageActions from "./PrintersPageActions";
import {findByUuid, foo} from "../../utils/Utils";
import PrinterEditor from "./PrinterEditor";
import PrinterCreator from "./PrinterCreator";
import PrintersNavigator from "./PrintersNavigator";
import NavElement from "../../widgets/NavElement";
import printersEditorActions from "./PrintersEditorActions";
import NavPills from "../../widgets/NavPills";
import NavElementLink from "../../widgets/NavElementLink";

const {fromJS} = require('immutable');

export default class PrintersPage extends Component {

    constructor(props) {
        super(props);
        this.state = printersPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        printersPageStore.addChangeListener(this.updateState);

        printersPageActions.initPrintersPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        printersPageStore.removeChangeListener(this.updateState);
    }

    render() {
        let navContent = this.makeNavContent();
        let pageContent = this.makePageContent();
        return (
            <Page title="Stampanti">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    makeNavContent() {
        let state = this.state.data;
        let elements = [];
        let editingPrinter = findByUuid(state.get('printers'), state.get('selectedPrinter'));
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            href="/restaurant/settings"
        />);
        elements.push(<NavElement
            key="printers"
            text="Stampanti"
            active={!state.get('selectedPrinter') && !state.get('createdPrinter')}
            commitAction={printersEditorActions.deselectPrinter}
        />);
        if(editingPrinter){
            elements.push(<NavElement
                key="selected"
                text={editingPrinter.get('name')}
                active={true}
            />);
        }else if(state.get('createdPrinter')){
            elements.push(<NavElement
                key="selected"
                text={state.get('createdPrinter').get('name') || "Nuova stampante"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }

    makePageContent() {
        let state = this.state.data;
        if (state.get('selectedPrinter')) {
            return <PrinterEditor data={PrintersPage.makePrinterEditorDescriptor(state)}/>
        } else if (state.get('createdPrinter')) {
            return <PrinterCreator data={PrintersPage.makePrinterCreatorDescriptor(state)}/>
        } else {
            return <PrintersNavigator data={state}/>
        }
    }

    static makePrinterEditorDescriptor(data) {
        return fromJS({
            printer: findByUuid(data.get('printers'), data.get('selectedPrinter')),
            services: data.get('services')
        })
    }

    static makePrinterCreatorDescriptor(data) {
        return fromJS({
            printer: data.get('createdPrinter'),
            services: data.get('services')
        })
    }

}