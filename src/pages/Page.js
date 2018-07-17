import React, {Component} from 'react';
import loadingStore from "../stores/LoadingStore";
import errorsStore from "../stores/ErrorsStore";
import $ from "jquery";
import errorActions from "../actions/ErrorsActions";
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

const {Map} = require('immutable');

export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textInput: Map(),
            floatInput: Map(),
            integerInput: Map(),
            selectInput: Map(),
            keyboardVisible: false,
            errorMessage: null,
            loading: false
        };

        this.updateLoadingStatus = this.updateLoadingStatus.bind(this);
        this.updateErrorStatus = this.updateErrorStatus.bind(this);
        this.updateApplicationStatus = this.updateApplicationStatus.bind(this);
    }

    clearMessages() {
        errorActions.clearMessages();
    }

    updateLoadingStatus() {
        this.setState({
            loading: loadingStore.isBusy()
        });
    }

    updateApplicationStatus() {
        let status = applicationStore.getState();
        if (!this.state.fullScreen && status.fullScreen) {
            if (screenfull.enabled) {
                screenfull.request();
            }
        } else if (this.state.fullScreen && !status.fullScreen) {
            screenfull.exit();
        }
        this.setState({
            textInput: status.textInput,
            floatInput: status.floatInput,
            integerInput: status.integerInput,
            selectInput: status.selectInput,
            fullScreen: status.fullScreen
        });
    }

    updateErrorStatus() {
        let message = errorsStore.getMessage();
        this.setState({
            errorMessage: message
        });
        if (message) {
            $("#error-modal").modal("show");
        }
    }

    componentDidMount() {
        errorsStore.addChangeListener(this.updateErrorStatus);
        applicationStore.addChangeListener(this.updateApplicationStatus);
        this.updateLoadingStatus();
        this.updateErrorStatus();
        this.updateApplicationStatus();
    }

    componentWillUnmount() {
        errorsStore.removeChangeListener(this.updateErrorStatus);
        applicationStore.removeChangeListener(this.updateApplicationStatus);
    }

    render() {
        return (
            <div className="container-fluid main">
                <Row fullHeight>
                    <Column>
                        {this.props.children}
                    </Column>
                    <Modal visible={!!this.state.errorMessage}>
                        <div className="modal-header">
                            <h4 className="modal-title text-danger text-center">
                                <span className="glyphicon glyphicon-warning-sign"/> Errore
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="text-center text-danger">{this.state.errorMessage}</div>
                        </div>
                        <div className="modal-footer">
                            <Button text="Chiudi" commitAction={this.clearMessages}/>
                        </div>
                    </Modal>
                    <ApplicationTextInput data={this.state.textInput}/>
                    <ApplicationFloatInput data={this.state.floatInput}/>
                    <ApplicationIntegerInput data={this.state.integerInput}/>
                    <ApplicationSelectInput data={this.state.selectInput}/>
                </Row>
            </div>
        )
    }
};