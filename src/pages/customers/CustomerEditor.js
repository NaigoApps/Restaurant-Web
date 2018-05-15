import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import {iGet} from "../../utils/Utils";

export default class CustomerEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;
        const actionsProvider = this.props.actionsProvider;

        let customer = props.get('customer');

        const actions = CustomerEditor.buildActions(props, actionsProvider);

        return <Row topSpaced grow>
            <Column>
                <EntityEditor
                    entity={customer}
                    valid={customer => customer.get('name') && customer.get('surname')}
                    confirmMethod={actionsProvider.onConfirm}
                    abortMethod={actionsProvider.onAbort}
                    deleteMessage="Eliminazione cliente"
                    deleteMethod={actionsProvider.onDelete}>
                    {actions}
                </EntityEditor>
            </Column>
        </Row>;
    }

    static buildActions(data, actionsProvider) {
        let actions = [];
        if (actionsProvider.confirmName) {
            actions.push(CustomerEditor.buildNameEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmSurname) {
            actions.push(CustomerEditor.buildSurnameEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmCf) {
            actions.push(CustomerEditor.buildCfEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmPiva) {
            actions.push(CustomerEditor.buildPivaEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmAddress) {
            actions.push(CustomerEditor.buildAddressEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmCity) {
            actions.push(CustomerEditor.buildCityEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmCap) {
            actions.push(CustomerEditor.buildCapEditor(data, actionsProvider));
        }
        if (actionsProvider.confirmDistrict) {
            actions.push(CustomerEditor.buildDistrictEditor(data, actionsProvider));
        }

        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        })
    }

    static buildNameEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Nome",
            value: iGet(data, 'customer.name'),
            callback: result => actionsProvider.confirmName(iGet(data, 'customer.uuid'), result)
        }}/>;
    }

    static buildSurnameEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Cognome",
            value: iGet(data, 'customer.surname'),
            callback: result => actionsProvider.confirmSurname(iGet(data, 'customer.uuid'), result)
        }}/>;
    }

    static buildCfEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Codice fiscale",
            value: iGet(data, 'customer.cf'),
            callback: result => actionsProvider.confirmCf(iGet(data, 'customer.uuid'), result)
        }}/>;
    }

    static buildPivaEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Partiva IVA",
            value: iGet(data, 'customer.piva'),
            callback: result => actionsProvider.confirmPiva(iGet(data, 'customer.uuid'), result)
        }}/>;
    }

    static buildAddressEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Indirizzo",
            value: iGet(data, 'customer.address'),
            callback: result => actionsProvider.confirmAddress(iGet(data, 'customer.uuid'), result)
        }}/>;
    }

    static buildCityEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Città",
            value: iGet(data, 'customer.city'),
            callback: result => actionsProvider.confirmCity(iGet(data, 'customer.uuid'), result)
        }}/>;
    }

    static buildCapEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "CAP",
            value: iGet(data, 'customer.cap'),
            callback: result => actionsProvider.confirmCap(iGet(data, 'customer.uuid'), result)
        }}/>;
    }

    static buildDistrictEditor(data, actionsProvider) {
        return <TextEditor options={{
            label: "Provincia",
            value: iGet(data, 'customer.district'),
            callback: result => actionsProvider.confirmDistrict(iGet(data, 'customer.uuid'), result)
        }}/>;
    }
}