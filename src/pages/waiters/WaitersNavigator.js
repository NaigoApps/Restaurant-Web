import React, {Component} from 'react';
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import waitersEditorActions from "./WaitersEditorActions";
import waitersCreatorActions from "./WaitersCreatorActions";

export default class WaitersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedEntitiesList
                    entities={props.waiters}
                    renderer={waiter => waiter.name}
                    selectMethod={waitersEditorActions.selectWaiter}
                    deselectMethod={waitersEditorActions.deselectWaiter}
                />
            </Column>
        </Row>,
            <Button key="new"
                    text="Nuovo cameriere"
                    type="success"
                    commitAction={waitersCreatorActions.beginWaiterCreation}
            />]
    }

}