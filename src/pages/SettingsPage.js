import React, {Component} from 'react';
import applicationStore from "../stores/ApplicationStore";
import {ApplicationActions} from "../actions/ApplicationActions";
import IntegerEditor from "../components/widgets/inputs/IntegerEditor";
import {iGet} from "../utils/Utils";
import Column from "../widgets/Column";
import Row from "../widgets/Row";
import Page from "./Page";
import RestaurantNav from "../components/RestaurantNav";
import SelectEditor from "../components/widgets/inputs/SelectEditor";
import printersStore from "../stores/generic/PrintersStore";
import printersPageActions from "./printers/PrintersPageActions";

const {Map} = require('immutable');

export default class SettingsPage extends Component {

    constructor(props) {
        super(props);
        this.state = applicationStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        applicationStore.addChangeListener(this.updateState);

        ApplicationActions.loadSettings();
        printersPageActions.initPrintersPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        applicationStore.removeChangeListener(this.updateState);
    }

    render() {
        let pageContent = this.makePageContent();
        return (
            <Page title="Impostazioni">
                <RestaurantNav/>
                <Row topSpaced>
                    <Column>
                        {pageContent}
                    </Column>
                </Row>
            </Page>
        )
    }

    makePageContent() {
        const settings = this.state.settings;
        const printers = printersStore.getPrinters().getPayload();
        let options = [];
        if (settings) {
            options.push([
                <IntegerEditor options={this.makeIntegerOptions("Righe elenco stampanti", "printersRows")}/>,
                <IntegerEditor options={this.makeIntegerOptions("Colonne elenco stampanti", "printersColumns")}/>
            ]);
            options.push([
                <IntegerEditor options={this.makeIntegerOptions("Righe elenco postazioni", "locationsRows")}/>,
                <IntegerEditor options={this.makeIntegerOptions("Colonne elenco postazioni", "locationsColumns")}/>
            ]);
            options.push([
                <IntegerEditor options={this.makeIntegerOptions("Righe elenco tavoli", "tablesRows")}/>,
                <IntegerEditor options={this.makeIntegerOptions("Colonne elenco tavoli", "tablesColumns")}/>
            ]);
            options.push([
                <IntegerEditor options={this.makeIntegerOptions("Righe elenco camerieri", "waitersRows")}/>,
                <IntegerEditor options={this.makeIntegerOptions("Colonne elenco camerieri", "waitersColumns")}/>
            ]);
            options.push([
                <IntegerEditor options={this.makeIntegerOptions("Righe elenco categorie", "categoriesRows")}/>,
                <IntegerEditor options={this.makeIntegerOptions("Colonne elenco categorie", "categoriesColumns")}/>
            ]);
            options.push([
                <IntegerEditor options={this.makeIntegerOptions("Righe elenco piatti", "dishesRows")}/>,
                <IntegerEditor options={this.makeIntegerOptions("Colonne elenco piatti", "dishesColumns")}/>
            ]);
            options.push([
                <IntegerEditor options={this.makeIntegerOptions("Righe elenco varianti", "additionsRows")}/>,
                <IntegerEditor options={this.makeIntegerOptions("Colonne elenco varianti", "additionsColumns")}/>
            ]);
            options.push([
                <IntegerEditor options={this.makeIntegerOptions("Righe elenco clienti", "customersRows")}/>,
                <IntegerEditor options={this.makeIntegerOptions("Colonne elenco clienti", "customersColumns")}/>
            ]);

            options.push([
                <SelectEditor options={this.makeSelectOptions(
                    "Stampante principale", settings.get('mainPrinter'), printers,
                    ApplicationActions.setMainPrinter)}/>,
                <SelectEditor options={this.makeSelectOptions(
                    "Stampante fiscale", settings.get('fiscalPrinter'), printers,
                    ApplicationActions.setFiscalPrinter)}/>
            ]);
        }

        return options.map((row, rowIndex) => {
            return <Row key={rowIndex} ofList={rowIndex > 0}>
                {row.map((column, colIndex) => {
                    return <Column key={colIndex}>
                        {column}
                    </Column>
                })}
            </Row>
        });
    }

    makeSelectOptions(label, value, values, callback) {
        return {
            label: label,
            value: value,
            values: values,
            id: entity => entity.get('uuid'),
            isValid: entity => !!entity,
            renderer: entity => entity.get('name'),
            callback: entity => callback(entity)
        };
    }

    makeIntegerOptions(label, property) {
        const clientSettings = this.state.settings.get('clientSettings');
        return {
            label: label,
            value: iGet(clientSettings, property) || null,
            callback: result => ApplicationActions.storeClientSettings(clientSettings.set(property, result))
        }
    }
}