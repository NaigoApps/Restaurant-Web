import React, {Component} from 'react';
import Button from "../../widgets/Button";
import {uuid} from "../../utils/Utils";
import Modal from "../../widgets/modal/Modal";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";

export default class EntityEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid: "ee_" + uuid(),
            showDeleteModal: false
        }
    }

    render() {
        const entity = this.props.entity;
        const abortMethod = this.props.abortMethod;
        const confirmMethod = this.props.confirmMethod;
        const title = this.props.render(entity);

        if (entity) {
            let abortButton = this.makeAbortButton.bind(this)(abortMethod, entity);
            let confirmButton = this.makeConfirmButton.bind(this)(confirmMethod, entity);

            return (
                <div className="card">
                    <div className="card-block">
                        <h5 className="card-title">
                            {title}
                        </h5>
                        <div className="form">
                            <Row>
                                <Column>
                                    {this.props.children}
                                </Column>
                            </Row>
                            <Row topSpaced>
                                <Column>
                                    {confirmButton}
                                </Column>
                            </Row>
                            <Row topSpaced>
                                <Column right>
                                    {abortButton}
                                </Column>
                            </Row>
                        </div>
                    </div>
                </div>
            )
        }
        return <div/>;

    }

    makeAbortButton(method, entity) {
        let button = <span/>;

        let showDeleteModal = () => {
            this.setState({showDeleteModal: true});
        };

        let doDelete = () => {
            this.setState({showDeleteModal: false});
            method(entity.uuid);
        };

        let doNotDelete = () => {
            this.setState({showDeleteModal: false});
        };

        if (method) {
            button = (
                <div>
                    <Button icon="trash" type="danger"
                            commitAction={showDeleteModal}/>

                    <Modal visible={this.state.showDeleteModal}>
                        <div className="modal-header">
                            <h4 className="modal-title text-danger text-center">
                                Eliminare?
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="text-center text-danger">{this.state.errorMessage}</div>
                        </div>
                        <div className="modal-footer">
                            <Button type="danger" text="Sì" commitAction={doDelete}/>
                            <Button text="No" commitAction={doNotDelete}/>
                        </div>
                    </Modal>
                </div>
            );
        }
        return button;
    }


    makeConfirmButton(method, entity) {
        let button = <span/>;
        if (method) {
            button = <Button icon="check" text="Ok" type="success"
                             commitAction={() => method(entity)}/>
        }
        return button;
    }
}