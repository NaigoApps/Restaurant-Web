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
        let navContent = PrintersPage.makeNavContent(this.state);
        let pageContent = PrintersPage.makePageContent(this.state);
        return (
            <Page title="Stampanti">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            href="/restaurant/settings"
        />);
        elements.push(<NavElement
            key="printers"
            text="Stampanti"
            active={!state.selectedPrinter && !state.createdPrinter}
            commitAction={printersEditorActions.deselectPrinter}
        />);
        if(state.selectedPrinter){
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.printers, state.selectedPrinter).name}
                active={true}
            />);
        }else if(state.createdPrinter){
            elements.push(<NavElement
                key="selected"
                text={state.createdPrinter.name || "Nuova stampante"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }

    static makePageContent(state) {
        if (state.selectedPrinter) {
            return <PrinterEditor data={PrintersPage.makePrinterEditorDescriptor(state)}/>
        } else if (state.createdPrinter) {
            return <PrinterCreator data={PrintersPage.makePrinterCreatorDescriptor(state)}/>
        } else {
            return <PrintersNavigator data={state}/>
        }
    }

    static makePrinterEditorDescriptor(data) {
        return {
            printer: findByUuid(data.printers, data.selectedPrinter),
            services: data.services
        }
    }

    static makePrinterCreatorDescriptor(data) {
        return {
            printer: data.createdPrinter,
            services: data.services
        }
    }

}