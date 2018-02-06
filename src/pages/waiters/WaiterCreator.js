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
        let waiter = props.get('waiter');
        let name = waiter.get('name') + " " + waiter.get('surname') || "Nuovo cameriere";
        let uuid = waiter.get('uuid');

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={waiter}
                    valid={!!waiter.get('name')}
                    confirmMethod={waitersCreatorActions.createWaiter}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={waiter.get('name')}
                        commitAction={waitersCreatorActions.updateWaiterName}
                    />
                    <TextEditor
                        label="Cognome"
                        value={waiter.get('surname')}
                        commitAction={waitersCreatorActions.updateWaiterSurname}
                    />
                    <TextEditor
                        label="Codice fiscale"
                        value={waiter.get('cf')}
                        commitAction={waitersCreatorActions.updateWaiterCf}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}