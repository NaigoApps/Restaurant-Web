import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import customersCreatorActions from "./CustomerCreatorActions";


export default class CustomerCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let customer = props.get('editingCustomer');
        let name = customer.get('name') || "Nuovo cliente";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={customer}
                    valid={customer.get('name')}
                    confirmMethod={customersCreatorActions.createCustomer}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={customer.get('name')}
                        commitAction={result => customersCreatorActions.updateCustomerProperty('name', result)}
                    />
                    <TextEditor
                        label="Cognome"
                        value={customer.get('surname')}
                        commitAction={result => customersCreatorActions.updateCustomerProperty('surname', result)}
                    />
                    <TextEditor
                        label="Codice fiscale"
                        value={customer.get('cf')}
                        commitAction={result => customersCreatorActions.updateCustomerProperty('cf', result)}
                    />
                    <TextEditor
                        label="Partita iva"
                        value={customer.get('piva')}
                        commitAction={result => customersCreatorActions.updateCustomerProperty('piva', result)}
                    />
                    <TextEditor
                        label="Indirizzo"
                        value={customer.get('address')}
                        commitAction={result => customersCreatorActions.updateCustomerProperty('address', result)}
                    />
                    <TextEditor
                        label="Città"
                        value={customer.get('city')}
                        commitAction={result => customersCreatorActions.updateCustomerProperty('city', result)}
                    />
                    <TextEditor
                        label="CAP"
                        value={customer.get('cap')}
                        commitAction={result => customersCreatorActions.updateCustomerProperty('cap', result)}
                    />
                    <TextEditor
                        label="Provincia"
                        value={customer.get('district')}
                        commitAction={result => customersCreatorActions.updateCustomerProperty('district', result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}