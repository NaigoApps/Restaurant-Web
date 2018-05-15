import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {LocationsEditorActions} from "./LocationsEditorActions";
import {LocationsCreatorActions} from "./LocationsCreatorActions";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";

export default class LocationsNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return [
            <Row key="list" topSpaced>
                <Column>
                    <SelectInput
                        bordered
                        rows={StoresUtils.settings(data, "locationsRows", 3)}
                        cols={StoresUtils.settings(data, "locationsColumns", 3)}
                        id={location => location.get('uuid')}
                        options={data.get('locations')}
                        page={data.get('page')}
                        renderer={location => location.get('name')}
                        onSelectPage={index => LocationsEditorActions.selectLocationsPage(index)}
                        onSelect={location => LocationsEditorActions.selectLocation(location)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuova postazione"
                                 type="success"
                                 commitAction={() => LocationsCreatorActions.beginLocationCreation()}
                    />
                </Column>
            </Row>];
    }

}