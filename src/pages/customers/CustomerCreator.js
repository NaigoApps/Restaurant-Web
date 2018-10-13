import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import CustomersPageActions from "./CustomersPageActions";

export default class CustomerCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;

        const customer = data.editor.customer;

        const actions = CustomerCreator.buildActions(customer);

        return <Row topSpaced grow>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Creazione cliente</h3>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <EntityEditor
                            entity={customer}
                            valid={customer.name && customer.surname}
                            confirmMethod={customer => CustomersPageActions.createCustomer(customer)}
                            abortMethod={() => CustomersPageActions.selectCustomer(null)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(customer) {
        let actions = [];
        actions.push(CustomerCreator.buildNameEditor(customer));
        actions.push(CustomerCreator.buildSurnameEditor(customer));
        actions.push(CustomerCreator.buildCfEditor(customer));
        actions.push(CustomerCreator.buildPivaEditor(customer));
        actions.push(CustomerCreator.buildAddressEditor(customer));
        actions.push(CustomerCreator.buildCityEditor(customer));
        actions.push(CustomerCreator.buildCapEditor(customer));
        actions.push(CustomerCreator.buildDistrictEditor(customer));

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
            callback: result => CustomersPageActions.setEditorName(result)
        }}/>;
    }

    static buildSurnameEditor(customer) {
        return <TextEditor options={{
            label: "Cognome",
            value: customer.surname,
            callback: result => CustomersPageActions.setEditorSurname(result)
        }}/>;
    }

    static buildCfEditor(customer) {
        return <TextEditor options={{
            label: "Codice fiscale",
            value: customer.cf,
            callback: result => CustomersPageActions.setEditorCf(result)
        }}/>;
    }

    static buildPivaEditor(customer) {
        return <TextEditor options={{
            label: "Partiva IVA",
            value: customer.piva,
            callback: result => CustomersPageActions.setEditorPiva(result)
        }}/>;
    }

    static buildAddressEditor(customer) {
        return <TextEditor options={{
            label: "Indirizzo",
            value: customer.address,
            callback: result => CustomersPageActions.setEditorAddress(result)
        }}/>;
    }

    static buildCityEditor(customer) {
        return <TextEditor options={{
            label: "Città",
            value: customer.city,
            callback: result => CustomersPageActions.setEditorCity(result)
        }}/>;
    }

    static buildCapEditor(customer) {
        return <TextEditor options={{
            label: "CAP",
            value: customer.cap,
            callback: result => CustomersPageActions.setEditorCap(result)
        }}/>;
    }

    static buildDistrictEditor(customer) {
        return <TextEditor options={{
            label: "Provincia",
            value: customer.district,
            callback: result => CustomersPageActions.setEditorDistrict(result)
        }}/>;
    }
}