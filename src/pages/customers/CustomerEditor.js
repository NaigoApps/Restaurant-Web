import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import CustomersPageActions from "./CustomersPageActions";

export default class CustomerEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        const customer = data.editor.customer;

        const actions = CustomerEditor.buildActions(customer);

        return <Row topSpaced grow>
            <Column>
                <EntityEditor
                    entity={customer}
                    valid={customer => customer.name && customer.surname}
                    deleteMessage="Eliminazione cliente"
                    deleteMethod={customer => CustomersPageActions.deleteCustomer(customer)}>
                    {actions}
                </EntityEditor>
            </Column>
        </Row>;
    }

    static buildActions(customer) {
        let actions = [];
        actions.push(CustomerEditor.buildNameEditor(customer));
        actions.push(CustomerEditor.buildSurnameEditor(customer));
        actions.push(CustomerEditor.buildCfEditor(customer));
        actions.push(CustomerEditor.buildPivaEditor(customer));
        actions.push(CustomerEditor.buildAddressEditor(customer));
        actions.push(CustomerEditor.buildCityEditor(customer));
        actions.push(CustomerEditor.buildCapEditor(customer));
        actions.push(CustomerEditor.buildDistrictEditor(customer));

        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        })
    }

    static buildNameEditor(customer) {
        return <TextEditor options={{
            label: "Nome",
            value: customer.name,
            callback: result => CustomersPageActions.updateName(customer.uuid, result)
        }}/>;
    }

    static buildSurnameEditor(customer) {
        return <TextEditor options={{
            label: "Cognome",
            value: customer.surname,
            callback: result => CustomersPageActions.updateSurname(customer.uuid, result)
        }}/>;
    }

    static buildCfEditor(customer) {
        return <TextEditor options={{
            label: "Codice fiscale",
            value: customer.cf,
            callback: result => CustomersPageActions.updateCf(customer.uuid, result)
        }}/>;
    }

    static buildPivaEditor(customer) {
        return <TextEditor options={{
            label: "Partiva IVA",
            value: customer.piva,
            callback: result => CustomersPageActions.updatePiva(customer.uuid, result)
        }}/>;
    }

    static buildAddressEditor(customer) {
        return <TextEditor options={{
            label: "Indirizzo",
            value: customer.address,
            callback: result => CustomersPageActions.updateAddress(customer.uuid, result)
        }}/>;
    }

    static buildCityEditor(customer) {
        return <TextEditor options={{
            label: "Città",
            value: customer.city,
            callback: result => CustomersPageActions.updateCity(customer.uuid, result)
        }}/>;
    }

    static buildCapEditor(customer) {
        return <TextEditor options={{
            label: "CAP",
            value: customer.cap,
            callback: result => CustomersPageActions.updateCap(customer.uuid, result)
        }}/>;
    }

    static buildDistrictEditor(customer) {
        return <TextEditor options={{
            label: "Provincia",
            value: customer.district,
            callback: result => CustomersPageActions.updateDistrict(customer.uuid, result)
        }}/>;
    }
}