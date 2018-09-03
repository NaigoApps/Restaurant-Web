import React from 'react';
import applicationStore from "../../stores/ApplicationStore";
import {ApplicationActions} from "../../actions/ApplicationActions";
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import Page from "../Page";
import RestaurantNav from "../../components/RestaurantNav";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import dataStore, {Topics} from "../../stores/DataStore";
import ViewController from "../../widgets/ViewController";
import {SettingsPageActions} from "./SettingsPageActions";

export default class SettingsPage extends ViewController {

    constructor(props) {
        super(props, applicationStore);
    }

    componentDidMount() {
        super.componentDidMount();
        SettingsPageActions.initSettingsPage();
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
        const settings = this.state.data.settings;
        const printers = dataStore.getEntities(Topics.PRINTERS);
        let options = [];
        if (settings) {
            const clientSettings = settings.clientSettings;
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
                    "Stampante principale", settings.mainPrinter, printers,
                    ApplicationActions.setMainPrinter)}/>,
                <SelectEditor options={this.makeSelectOptions(
                    "Stampante fiscale", settings.fiscalPrinter, printers,
                    ApplicationActions.setFiscalPrinter)}/>
            ]);

            options.push([
                <TextEditor options={{
                    label: "Usability test user",
                    value: clientSettings.utUser,
                    callback: result => {
                        //FIXME
                        clientSettings.utUser = result;
                        ApplicationActions.storeClientSettings(clientSettings);
                    }
                }}/>
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
            id: entity => entity.uuid,
            isValid: entity => !!entity,
            renderer: entity => entity.name,
            callback: entity => callback(entity)
        };
    }

    makeIntegerOptions(label, property) {
        const clientSettings = this.state.data.settings.clientSettings;
        return {
            label: label,
            value: clientSettings[property] || null,
            callback: result => {
                //FIXME
                clientSettings[property] = result;
                ApplicationActions.storeClientSettings(clientSettings)
            }
        }
    }
}