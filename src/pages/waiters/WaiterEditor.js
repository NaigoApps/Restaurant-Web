import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import waitersEditorActions from "./WaitersEditorActions";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";

export default class WaiterEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let uuid = props.waiter.uuid;


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.waiter}
                    abortMethod={waitersEditorActions.deleteWaiter}
                    render={location => location.name}>
                    <TextEditor
                        label="Nome"
                        value={props.waiter.name}
                        commitAction={result => waitersEditorActions.updateWaiterName(uuid, result)}
                    />
                    <TextEditor
                        label="Cognome"
                        value={props.waiter.surname}
                        commitAction={result => waitersEditorActions.updateWaiterSurname(uuid, result)}
                    />
                    <TextEditor
                        label="Codice fiscale"
                        value={props.waiter.cf}
                        commitAction={result => waitersEditorActions.updateWaiterCf(uuid, result)}
                    />
                    <SelectEditor
                        label="Stato"
                        options={props.statuses}
                        value={props.waiter.status}
                        commitAction={result => waitersEditorActions.updateWaiterStatus(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}