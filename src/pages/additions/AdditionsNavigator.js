import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";
import AdditionsPageActions from "./AdditionsPageActions";

export default class AdditionsNavigator extends Component {

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
                        rows={StoresUtils.option(data, "additionsRows", 3)}
                        cols={StoresUtils.option(data, "additionsColumns", 3)}
                        options={data.data.additions}
                        page={data.navigator.page}
                        renderer={addition => addition.name}
                        onSelectPage={index => AdditionsPageActions.selectAdditionsPage(index)}
                        onSelect={addition => AdditionsPageActions.selectAddition(addition)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuova variante"
                                 type="success"
                                 commitAction={() => AdditionsPageActions.beginAdditionCreation()}
                    />
                </Column>
            </Row>];
    }

}