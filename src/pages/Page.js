import React, {Component} from 'react';
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
import ApplicationColorInput from "../components/widgets/ApplicationColorInput";
import Alert from "../components/widgets/Alert";

const {Map} = require('immutable');

export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = applicationStore.getState();

        this.updateErrorStatus = this.updateErrorStatus.bind(this);
        this.updateApplicationStatus = this.updateApplicationStatus.bind(this);
    }

    clearMessages() {
        errorActions.clearMessages();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.data.fullscreen && this.state.data.fullscreen) {
            if (screenfull.enabled) {
                screenfull.request();
            }
        } else if (prevState.data.fullscreen && !this.state.data.fullscreen) {
            screenfull.exit();
        }
    }

    updateApplicationStatus() {
        let status = applicationStore.getState();
        console.warn(status);
        this.setState(status);
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
        this.updateErrorStatus();
        this.updateApplicationStatus();
    }

    componentWillUnmount() {
        errorsStore.removeChangeListener(this.updateErrorStatus);
        applicationStore.removeChangeListener(this.updateApplicationStatus);
    }

    render() {
        const loadingComponent = this.state.data.loading.busy ? this.buildLoadingComponent() : null;

        return (
            <div className="container-fluid main">
                <Row fullHeight>
                    <Column>
                        {this.props.children}
                    </Column>
                    <Modal visible={!!this.state.data.errorMessage}>
                        <div className="modal-header">
                            <h4 className="modal-title text-danger text-center">
                                <span className="glyphicon glyphicon-warning-sign"/> Errore
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="text-center text-danger">{this.state.data.errorMessage}</div>
                        </div>
                        <div className="modal-footer">
                            <Button text="Chiudi" commitAction={this.clearMessages}/>
                        </div>
                    </Modal>
                    <ApplicationTextInput data={this.state.data.textInput}/>
                    <ApplicationFloatInput data={this.state.data.floatInput}/>
                    <ApplicationIntegerInput data={this.state.data.integerInput}/>
                    <ApplicationSelectInput data={this.state.data.selectInput}/>
                    <ApplicationColorInput data={this.state.data.colorInput}/>
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