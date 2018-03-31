import React, {Component} from 'react';
import Modal from "./modal/Modal";
import {uuid} from "../utils/Utils";
import Button from "./Button";
import Column from "./Column";

export default class OkCancelModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "em_" + uuid()
        }
    }

    render() {

        return <Modal visible={this.props.visible} lg={!!this.props.lg}>
            <div className="modal-header">
                <h4 className="modal-title text-danger text-center">
                    {this.props.message || "Procedere?"}
                </h4>
            </div>
            <div className="modal-body d-flex">
                <Column>
                    {this.props.children}
                </Column>
            </div>
            <div className="modal-footer">
                <Button type={this.props.confirmType || "success"}
                        disabled={!this.props.isValid}
                        text={this.props.confirmMessage || "Conferma"}
                        commitAction={this.props.confirmAction}/>
                <Button type={this.props.abortType || "danger"}
                        text={this.props.abortMessage || "Annulla"}
                        commitAction={this.props.abortAction}/>
            </div>
        </Modal>

    }

}