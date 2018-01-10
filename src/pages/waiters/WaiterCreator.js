import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import waitersCreatorActions from "./WaitersCreatorActions";

export default class WaiterCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let name = props.waiter.name + " " + props.waiter.surname || "Nuovo cameriere";
        let uuid = props.waiter.uuid;

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.waiter}
                    confirmMethod={waitersCreatorActions.createWaiter}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={props.waiter.name}
                        commitAction={waitersCreatorActions.updateWaiterName}
                    />
                    <TextEditor
                        label="Cognome"
                        value={props.waiter.surname}
                        commitAction={waitersCreatorActions.updateWaiterSurname}
                    />
                    <TextEditor
                        label="Codice fiscale"
                        value={props.waiter.cf}
                        commitAction={waitersCreatorActions.updateWaiterCf}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}