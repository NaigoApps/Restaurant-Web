import React, {Component} from 'react';
import Button from "../../widgets/Button";
import {uuid} from "../../utils/Utils";
import Modal from "../../widgets/modal/Modal";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import RoundButton from "../../widgets/RoundButton";

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
        const deleteMethod = this.props.deleteMethod;
        const abortMethod = this.props.abortMethod;
        const confirmMethod = this.props.confirmMethod;

        if (entity) {
            let mainButtons = [];

            if (confirmMethod) {
                mainButtons.push(this.makeConfirmButton(confirmMethod, entity));
            }
            if (abortMethod) {
                mainButtons.push(this.makeAbortButton(abortMethod, entity));
            }
            if (mainButtons.length > 0) {
                mainButtons = <Row topSpaced>
                    {mainButtons}
                </Row>;
            }

            let deleteButton;
            if (deleteMethod) {
                deleteButton = <Row topSpaced>
                    <Column right>
                        {this.makeDeleteButton(deleteMethod, entity)}
                    </Column>
                </Row>;
            }

            return (
                <Row grow>
                    <Column>
                        <Row topSpaced grow>
                            <Column>
                                {this.props.children}
                            </Column>
                        </Row>
                        {mainButtons}
                        {deleteButton}
                    </Column>
                </Row>
            )
        }
        return <div/>;

    }

    makeDeleteButton(method, entity) {
        let showDeleteModal = () => {
            this.setState({showDeleteModal: true});
        };

        let doDelete = () => {
            this.setState({showDeleteModal: false});
            method(entity);
        };

        let doNotDelete = () => {
            this.setState({showDeleteModal: false});
        };

        return <div>
            <Button icon="trash"
                    text={this.props.deleteMessage}
                    type="danger"
                    commitAction={showDeleteModal}
                    highPadding
            />

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
                    <Button type="danger" text="Sì" commitAction={doDelete} highPadding/>
                    <Button text="No" commitAction={doNotDelete} highPadding/>
                </div>
            </Modal>
        </div>;
    }


    makeConfirmButton(method, entity) {
        let x = [];
        let button = <span/>;
        if (method) {
            button = <Column key="confirm" align="end">
                <RoundButton icon="check"
                             disabled={!this.props.valid}
                             type="success"
                             size="lg"
                             commitAction={() => method(entity)}/>
            </Column>
        }
        return button;
    }

    makeAbortButton(method, entity) {
        let button = <span/>;
        if (method) {
            button = <Column key="abort" align="start">
                <RoundButton icon="times"
                             type="danger"
                             size="lg"
                             commitAction={() => method(entity)}/>
            </Column>
        }
        return button;
    }
}