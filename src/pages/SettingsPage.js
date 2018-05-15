import React, {Component} from 'react';
import applicationStore from "../stores/ApplicationStore";
import {ApplicationActions} from "../actions/ApplicationActions";
import IntegerEditor from "../components/widgets/inputs/IntegerEditor";
import {iGet} from "../utils/Utils";
import Column from "../widgets/Column";
import Row from "../widgets/Row";
import Page from "./Page";
import RestaurantNav from "../components/RestaurantNav";

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
        let options = [];
        options.push([
            <IntegerEditor options={this.makeOptions("Righe elenco stampanti", "printersRows")}/>,
            <IntegerEditor options={this.makeOptions("Colonne elenco stampanti", "printersColumns")}/>
        ]);
        options.push([
            <IntegerEditor options={this.makeOptions("Righe elenco postazioni", "locationsRows")}/>,
            <IntegerEditor options={this.makeOptions("Colonne elenco postazioni", "locationsColumns")}/>
        ]);
        options.push([
            <IntegerEditor options={this.makeOptions("Righe elenco tavoli", "tablesRows")}/>,
            <IntegerEditor options={this.makeOptions("Colonne elenco tavoli", "tablesColumns")}/>
        ]);
        options.push([
            <IntegerEditor options={this.makeOptions("Righe elenco camerieri", "waitersRows")}/>,
            <IntegerEditor options={this.makeOptions("Colonne elenco camerieri", "waitersColumns")}/>
        ]);
        options.push([
            <IntegerEditor options={this.makeOptions("Righe elenco categorie", "categoriesRows")}/>,
            <IntegerEditor options={this.makeOptions("Colonne elenco categorie", "categoriesColumns")}/>
        ]);
        options.push([
            <IntegerEditor options={this.makeOptions("Righe elenco piatti", "dishesRows")}/>,
            <IntegerEditor options={this.makeOptions("Colonne elenco piatti", "dishesColumns")}/>
        ]);
        options.push([
            <IntegerEditor options={this.makeOptions("Righe elenco varianti", "additionsRows")}/>,
            <IntegerEditor options={this.makeOptions("Colonne elenco varianti", "additionsColumns")}/>
        ]);
        options.push([
            <IntegerEditor options={this.makeOptions("Righe elenco clienti", "customersRows")}/>,
            <IntegerEditor options={this.makeOptions("Colonne elenco clienti", "customersColumns")}/>
        ]);

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

    makeOptions(label, property) {
        const settings = this.state.settings;
        return {
            label: label,
            value: iGet(settings, property) || null,
            callback: result => ApplicationActions.storeSettings(settings.set(property, result))
        }
    }
}