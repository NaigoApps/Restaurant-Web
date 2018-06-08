import React, {Component} from 'react';
import {uuid} from "../../utils/Utils";

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "modal_" + uuid()
        }
    }

    componentDidMount() {
        let component = this;
        global.$("#" + this.state.uuid).on("shown.bs.modal", () => this.props.onModalShown && this.props.onModalShown());

        global.$("#" + this.state.uuid).on("hidden.bs.modal", () => this.props.onModalHidden && this.props.onModalHidden());

        if (this.props.visible) {
            global.$("#" + this.state.uuid).modal("show");
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.visible && this.props.visible) {
            global.$("#" + this.state.uuid).modal("show");
        } else if (prevProps.visible && !this.props.visible) {
            global.$("#" + this.state.uuid).modal("hide");
        }
    }

    componentWillUnmount() {
        if (this.props.visible) {
            global.$("#" + this.state.uuid).modal("hide");
        }
    }


    static modalClass(props) {
        let classes = ["modal", "fade"];
        return classes.join(" ");
    }

    static modalDialogClass(props) {
        let classes = ["modal-dialog"];
        if (props.lg) {
            classes.push("modal-lg");
        }
        return classes.join(" ");
    }

    render() {
        return (
            <div className={Modal.modalClass(this.props)} id={this.state.uuid} data-backdrop="static"
                 data-keyboard="false">
                <div className={Modal.modalDialogClass(this.props)}>
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}