import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import {LocationsPageActions} from "./LocationsPageActions";

export default class LocationCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;
        const editor = data.editor;

        const actions = LocationCreator.buildActions(data);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Creazione postazione</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!editor.location.name && editor.location.printer}
                            entity={editor.location}
                            deleteMessage="Eliminazione postazione"
                            confirmMethod={(location) => LocationsPageActions.createLocation(location)}
                            abortMethod={() => LocationsPageActions.selectLocation(null)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(data) {
        const location = data.editor.location;
        const actions = [];
        actions.push(<TextEditor options={{
            label: "Nome",
            value: location.name,
            callback: result => LocationsPageActions.setEditorName(result)
        }}/>);
        actions.push(<SelectEditor options={{
            label: "Stampante",
            value: location.printer,
            values: data.data.printers,
            isValid: printer => !!printer,
            renderer: printer => printer.name,
            callback: printer => LocationsPageActions.setEditorPrinter(printer)
        }}/>);
        return <Row>
            {actions.map((action, index) => <Column key={index}>{action}</Column>)}
        </Row>;
    }

}