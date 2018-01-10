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
        let name = props.location.name || "Nuova postazione";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.location}
                    confirmMethod={locationsCreatorActions.createLocation}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={props.location.name}
                        commitAction={locationsCreatorActions.updateLocationName}
                    />
                    <EntitySelectEditor
                        label="Stampante"
                        options={props.printers}
                        renderer={printer => printer.name}
                        value={props.location.printer}
                        commitAction={locationsCreatorActions.updateLocationPrinter}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}