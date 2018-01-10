import React from 'react';
import locationsEditorActions from "./LocationsEditorActions";
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";

export default class LocationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let uuid = props.location.uuid;


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.location}
                    abortMethod={locationsEditorActions.deleteLocation}
                    render={location => location.name}>
                    <TextEditor
                        label="Nome"
                        value={props.location.name}
                        commitAction={result => locationsEditorActions.updateLocationName(uuid, result)}
                    />
                    <EntitySelectEditor
                        label="Stampante"
                        options={props.printers}
                        renderer={printer => printer.name}
                        value={props.location.printer}
                        commitAction={result => locationsEditorActions.updateLocationPrinter(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}