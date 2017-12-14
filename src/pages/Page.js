import React, {Component} from 'react';
import loadingStore from "../stores/LoadingStore";
import errorsStore from "../stores/ErrorsStore";
import $ from "jquery";
import errorActions from "../actions/ErrorsActions";
import RestaurantNav from "../components/RestaurantNav";
import applicationStore from "../stores/ApplicationStore";

import * as screenfull from 'screenfull';
import Modal from "../widgets/modal/Modal";
import Button from "../widgets/Button";

export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        loadingStore.addChangeListener(this.updateLoadingStatus);
        errorsStore.addChangeListener(this.updateErrorStatus);
        applicationStore.addChangeListener(this.updateApplicationStatus);
        this.updateLoadingStatus();
        this.updateErrorStatus();
        this.updateApplicationStatus();
    }

    componentWillUnmount() {
        loadingStore.removeChangeListener(this.updateLoadingStatus);
        errorsStore.removeChangeListener(this.updateErrorStatus);
        applicationStore.removeChangeListener(this.updateApplicationStatus);
    }

    render() {
        return (
            <div className="container-fluid main">
                <RestaurantNav title={this.props.title} content={this.props.navContent}/>
                <div className="row under-nav top-sep">
                    <div className="col-sm-12">
                        {this.props.children}
                    </div>
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
                </div>
            </div>
        )
    }
};