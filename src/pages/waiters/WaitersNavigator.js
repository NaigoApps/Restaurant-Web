import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import {WaitersEditorActions} from "./WaitersEditorActions";
import {WaitersCreatorActions} from "./WaitersCreatorActions";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";

export default class WaitersNavigator extends Component {

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
                        rows={StoresUtils.settings(data, 'waitersRows', 3)}
                        cols={StoresUtils.settings(data, 'waitersColumns', 3)}
                        id={waiter => waiter.get('uuid')}
                        options={data.get('waiters')}
                        page={data.get('page')}
                        renderer={waiter => waiter.get('name')}
                        colorRenderer={waiter => WaitersNavigator.color(waiter)}
                        onSelectPage={index => WaitersEditorActions.selectWaiterPage(index)}
                        onSelect={waiter => WaitersEditorActions.selectWaiter(waiter)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 text="Nuovo cameriere"
                                 type="success"
                                 icon="plus"
                                 commitAction={() => WaitersCreatorActions.beginWaiterCreation()}
                    />
                </Column>
            </Row>];
    }

    static color(waiter) {
        if (waiter.get('status') === "SOSPESO") {
            return "warning";
        }
        if (waiter.get('status') === "RIMOSSO") {
            return "danger";
        }
        return 'secondary';
    }

}