import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import customersEditorActions from "./CustomersEditorActions";

export default class CustomerEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let customer = props.get('editingCustomer');
        let uuid = customer.get('uuid');


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={customer}
                    valid={customer => this.isCustomerValid(customer)}
                    deleteMethod={customersEditorActions.deleteCustomer}
                    render={customer => customer.get('name') + " " + customer.get('surname')}>
                    <TextEditor
                        label="Nome"
                        value={customer.get('name')}
                        commitAction={result => customersEditorActions.updateCustomerName(uuid, result)}
                    />
                    <TextEditor
                        label="Cognome"
                        value={customer.get('surname')}
                        commitAction={result => customersEditorActions.updateCustomerSurname(uuid, result)}
                    />
                    <TextEditor
                        label="Codice fiscale"
                        value={customer.get('cf')}
                        commitAction={result => customersEditorActions.updateCustomerCf(uuid, result)}
                    />
                    <TextEditor
                        label="Partita iva"
                        value={customer.get('piva')}
                        commitAction={result => customersEditorActions.updateCustomerPiva(uuid, result)}
                    />
                    <TextEditor
                        label="Indirizzo"
                        value={customer.get('address')}
                        commitAction={result => customersEditorActions.updateCustomerAddress(uuid, result)}
                    />
                    <TextEditor
                        label="Città"
                        value={customer.get('city')}
                        commitAction={result => customersEditorActions.updateCustomerCity(uuid, result)}
                    />
                    <TextEditor
                        label="CAP"
                        value={customer.get('cap')}
                        commitAction={result => customersEditorActions.updateCustomerCap(uuid, result)}
                    />
                    <TextEditor
                        label="Provincia"
                        value={customer.get('district')}
                        commitAction={result => customersEditorActions.updateCustomerDistrict(uuid, result)}
                    />

                </EntityEditor>
            </Column>
        </Row>;
    }

    isCustomerValid(customer){
        return true;
    }
}