import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";
import {LocationsPageActions} from "./LocationsPageActions";

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
                        rows={StoresUtils.option(data, "locationsRows", 3)}
                        cols={StoresUtils.option(data, "locationsColumns", 3)}
                        options={data.locations}
                        page={data.navigator.page}
                        renderer={location => location.name}
                        onSelectPage={index => LocationsPageActions.selectLocationNavigatorPage(index)}
                        onSelect={location => LocationsPageActions.selectLocation(location)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuova postazione"
                                 type="success"
                                 commitAction={() => LocationsPageActions.beginLocationCreation()}
                    />
                </Column>
            </Row>];
    }

}