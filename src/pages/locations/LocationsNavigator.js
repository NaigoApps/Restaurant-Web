import React, {Component} from 'react';
import {TYPES} from "../../components/editors/EntityEditor";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import locationsEditorActions from "./LocationsEditorActions";
import locationsCreatorActions from "./LocationsCreatorActions";

export default class LocationsNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedEntitiesList
                    entities={props.get('locations')}
                    renderer={location => location.get('name')}
                    selectMethod={locationsEditorActions.selectLocation}
                    deselectMethod={locationsEditorActions.deselectLocation}
                />
            </Column>
        </Row>,
            <Row key="new" topSpaced>
                <Column>
                    <Button
                        text="Nuova postazione"
                        type="info"
                        commitAction={locationsCreatorActions.beginLocationCreation}
                    />
                </Column>
            </Row>];
    }

}