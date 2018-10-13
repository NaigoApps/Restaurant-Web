import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";
import {WaitersPageActions} from "./WaitersPageActions";
import WaiterStatus from "../../model/WaiterStatus";

export default class WaitersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        return [
            <Row key="list" topSpaced>
                <Column>
                    <SelectInput
                        bordered
                        rows={StoresUtils.option(data, 'waitersRows', 3)}
                        cols={StoresUtils.option(data, 'waitersColumns', 3)}
                        options={data.data.waiters}
                        page={data.navigator.page}
                        renderer={waiter => waiter.name}
                        colorRenderer={waiter => WaitersNavigator.color(waiter)}
                        onSelectPage={index => WaitersPageActions.selectNavigatorPage(index)}
                        onSelect={waiter => WaitersPageActions.selectWaiter(waiter)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 text="Nuovo cameriere"
                                 type="success"
                                 icon="plus"
                                 commitAction={() => WaitersPageActions.beginWaiterCreation()}
                    />
                </Column>
            </Row>];
    }

    static color(waiter) {
        if (waiter.status === WaiterStatus.SUSPENDED) {
            return "warning";
        }
        if (waiter.status === WaiterStatus.REMOVED) {
            return "danger";
        }
        return 'secondary';
    }

}