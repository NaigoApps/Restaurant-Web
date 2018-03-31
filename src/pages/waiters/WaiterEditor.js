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
        let waiter = props.get('waiter');
        if(waiter) {
            let uuid = waiter.get('uuid');


            return <Row topSpaced>
                <Column>
                    <EntityEditor
                        entity={waiter}
                        valid={!!waiter.get('name')}
                        deleteMethod={waitersEditorActions.deleteWaiter}
                        render={location => location.get('name')}>
                        <TextEditor
                            label="Nome"
                            value={waiter.get('name')}
                            commitAction={result => waitersEditorActions.updateWaiterName(uuid, result)}
                        />
                        <TextEditor
                            label="Cognome"
                            value={waiter.get('surname')}
                            commitAction={result => waitersEditorActions.updateWaiterSurname(uuid, result)}
                        />
                        <TextEditor
                            label="Codice fiscale"
                            value={waiter.get('cf')}
                            commitAction={result => waitersEditorActions.updateWaiterCf(uuid, result)}
                        />
                        <SelectEditor
                            label="Stato"
                            options={props.get('statuses')}
                            value={waiter.get('status')}
                            commitAction={result => waitersEditorActions.updateWaiterStatus(uuid, result)}
                        />
                    </EntityEditor>
                </Column>
            </Row>;
        }
        return <div/>;
    }

}