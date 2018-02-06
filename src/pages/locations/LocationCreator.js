import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import locationsCreatorActions from "./LocationsCreatorActions";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";

export default class LocationCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let name = props.get('location').get('name') || "Nuova postazione";
        let location = props.get('location');

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    valid={!!location.get('name') && !!location.get('printer')}
                    entity={props.get('location')}
                    confirmMethod={locationsCreatorActions.createLocation}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={props.get('location').get('name')}
                        commitAction={locationsCreatorActions.updateLocationName}
                    />
                    <EntitySelectEditor
                        label="Stampante"
                        options={props.get('printers')}
                        renderer={printer => printer.get('name')}
                        value={props.get('location').get('printer')}
                        commitAction={locationsCreatorActions.updateLocationPrinter}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}