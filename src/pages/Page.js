import React, {Component} from 'react';
import errorsStore from "../stores/ErrorsStore";
import $ from "jquery";
import applicationStore from "../stores/ApplicationStore";

import * as screenfull from 'screenfull';
import Modal from "../widgets/modal/Modal";
import Button from "../widgets/Button";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import ApplicationTextInput from "../components/widgets/ApplicationTextInput";
import ApplicationFloatInput from "../components/widgets/ApplicationFloatInput";
import ApplicationIntegerInput from "../components/widgets/ApplicationIntegerInput";
import ApplicationSelectInput from "../components/widgets/ApplicationSelectInput";
import ApplicationColorInput from "../components/widgets/ApplicationColorInput";
import Alert from "../components/widgets/Alert";
import ErrorActions from "../stores/ErrorActions";

export default class Page extends Component {

    constructor(props) {
        super(props);
    }

    clearMessages() {
        ErrorActions.clearErrorMessages();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.fullscreen && this.props.fullscreen) {
            if (screenfull.enabled) {
                screenfull.request();
            }
        } else if (prevProps.fullscreen && !this.props.fullscreen) {
            screenfull.exit();
        }

        // if (!prevState.error.message && this.state.error.message) {
        //     $("#error-modal").modal("show");
        // }
    }

    render() {
        const loadingComponent = this.props.loading.busy ? this.buildLoadingComponent() : null;

        return (
            <div className="container-fluid main">
                <Row fullHeight>
                    <Column>
                        {this.props.children}
                    </Column>
                    <Modal visible={!!this.props.error.message}>
                        <div className="modal-header">
                            <h4 className="modal-title text-danger text-center">
                                <span className="glyphicon glyphicon-warning-sign"/> Errore
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="text-center text-danger">{this.props.error.message}</div>
                        </div>
                        <div className="modal-footer">
                            <Button text="Chiudi" commitAction={this.clearMessages}/>
                        </div>
                    </Modal>
                    <ApplicationTextInput {...this.props.textInput}/>
                    <ApplicationFloatInput {...this.props.floatInput}/>
                    <ApplicationIntegerInput {...this.props.integerInput}/>
                    <ApplicationSelectInput {...this.props.selectInput}/>
                    <ApplicationColorInput {...this.props.colorInput}/>
                </Row>
                {loadingComponent}
            </div>
        )
    }

    buildLoadingComponent() {
        return <Alert visible={true}>
            <h1 className="text-center text-warning">LOADING</h1>
        </Alert>;
    }
};