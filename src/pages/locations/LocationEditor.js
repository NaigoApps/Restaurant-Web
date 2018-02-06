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
        let uuid = props.get('location').get('uuid');
        let location = props.get('location');

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    valid={!!location.get('name') && !!location.get('printer')}
                    entity={location}
                    deleteMethod={locationsEditorActions.deleteLocation}
                    render={location => location.get('name')}>
                    <TextEditor
                        label="Nome"
                        value={location.get('name')}
                        commitAction={result => locationsEditorActions.updateLocationName(uuid, result)}
                    />
                    <EntitySelectEditor
                        label="Stampante"
                        options={props.get('printers')}
                        renderer={printer => printer.get('name')}
                        value={location.get('printer')}
                        commitAction={result => locationsEditorActions.updateLocationPrinter(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}