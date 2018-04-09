import React from 'react';
import EntitySelectEditor from "../../../components/widgets/inputs/EntitySelectEditor";
import IntegerEditor from "../../../components/widgets/inputs/IntegerEditor";
import diningTablesCreatorActions from "../diningTablesEditing/DiningTablesCreatorActions";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import EntityEditor from "../../../components/editors/EntityEditor";

export default class CustomerInfoPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const customer = this.props.entity;
        if(customer) {
            return <Row>
                <Column>
                    <Row>
                        <Column>
                            <p><b>Nome: </b><span>{customer.get('name')}</span></p>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <p><b>Cognome: </b><span>{customer.get('surname')}</span></p>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <p><b>CF: </b><span>{customer.get('cf')}</span></p>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <p><b>P.iva: </b><span>{customer.get('piva')}</span></p>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <p><b>Indirizzo: </b><span>{customer.get('address')}</span></p>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <p><b>Città: </b><span>{customer.get('city')}</span></p>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <p><b>Provincia: </b><span>{customer.get('district')}</span></p>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <p><b>CAP: </b><span>{customer.get('cap')}</span></p>
                        </Column>
                    </Row>
                </Column>
            </Row>
        }
        return <div/>;


    }

}