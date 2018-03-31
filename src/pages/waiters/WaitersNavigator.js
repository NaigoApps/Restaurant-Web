import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import waitersEditorActions from "./WaitersEditorActions";
import waitersCreatorActions from "./WaitersCreatorActions";
import PaginatedList from "../../components/widgets/PaginatedList";

export default class WaitersNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedList
                    id={waiter => waiter.get('uuid')}
                    entities={props.get('waiters')}
                    renderer={waiter => waiter.get('name')}
                    colorRenderer={waiter => this.color(waiter)}
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

    color(waiter){
        if(waiter.get('status') === "SOSPESO"){
            return "warning";
        }
        if(waiter.get('status') === "RIMOSSO"){
            return "danger";
        }
        return 'secondary';
    }

}