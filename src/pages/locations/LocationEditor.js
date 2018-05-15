import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import {iGet} from "../../utils/Utils";
import {EditorStatus} from "../StoresUtils";

export default class LocationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;
        const actionsProvider = this.props.actionsProvider;

        const location = props.get('location');
        const editorStatus = props.get('editorStatus');

        const actions = LocationEditor.buildActions(this.props);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">{editorStatus === EditorStatus.CREATING ?
                            "Creazione postazione" : "Modifica postazione"}</h3>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <EntityEditor
                            valid={!!location.get('name') && !!location.get('printer')}
                            entity={location}
                            confirmMethod={actionsProvider.onConfirm}
                            abortMethod={actionsProvider.onAbort}
                            deleteMessage="Eliminazione postazione"
                            deleteMethod={actionsProvider.onDelete}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(props) {
        const data = props.data;
        const actionsProvider = props.actionsProvider;

        const actions = [];
        if (actionsProvider) {
            if (actionsProvider.confirmName) {
                actions.push(<TextEditor options={{
                    label: "Nome",
                    value: iGet(data, 'location.name'),
                    callback: result => actionsProvider.confirmName(iGet(data, 'location.uuid'), result)
                }}/>);
            }
            if (actionsProvider.confirmPrinter) {
                actions.push(<SelectEditor options={{
                    label: "Stampante",
                    value: iGet(data, 'location.printer'),
                    values: data.get('printers'),
                    id: printer => printer.get('uuid'),
                    isValid: printer => !!printer,
                    renderer: printer => printer.get('name'),
                    callback: printer => actionsProvider.confirmPrinter(iGet(data, 'location.uuid'), printer)
                }}/>);
            }
        }
        return <Row>
            {actions.map((action, index) => <Column key={index}>{action}</Column>)}
        </Row>;
    }

}