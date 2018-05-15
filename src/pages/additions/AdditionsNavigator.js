import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {AdditionsCreatorActions} from "./AdditionsCreatorActions";
import {AdditionsEditorActions} from "./AdditionsEditorActions";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";

export default class AdditionsNavigator extends Component {

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
                        rows={StoresUtils.settings(data, "additionsRows", 3)}
                        cols={StoresUtils.settings(data, "additionsColumns", 3)}
                        id={addition => addition.get('uuid')}
                        options={data.get('additions')}
                        page={data.get('page')}
                        renderer={addition => addition.get('name')}
                        onSelectPage={index => AdditionsEditorActions.selectAdditionsPage(index)}
                        onSelect={addition => AdditionsEditorActions.selectAddition(addition)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuova variante"
                                 type="success"
                                 commitAction={() => AdditionsCreatorActions.beginAdditionCreation()}
                    />
                </Column>
            </Row>];
    }

}