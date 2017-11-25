import React, {Component} from 'react';
import loadingStore from "../stores/LoadingStore";
import errorsStore from "../stores/ErrorsStore";
import $ from "jquery";
import errorActions from "../actions/ErrorsActions";
import RestaurantNav from "../components/RestaurantNav";
import applicationStore from "../stores/ApplicationStore";

import * as screenfull from 'screenfull';

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
        if(status.fullScreen){
            if (screenfull.enabled) {
                screenfull.request();
            }
        }else{
            screenfull.exit();
        }
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
            <div>
                <RestaurantNav title={this.props.title} content={this.props.navContent}/>
                <div className="container">
                    {this.props.children}
                    <div className="modal fade" id="error-modal" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title text-danger text-center">
                                        <span className="glyphicon glyphicon-warning-sign"/> Errore
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center text-danger">{this.state.errorMessage}</div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button"
                                            className="btn btn-default"
                                            data-dismiss="modal"
                                            onClick={this.clearMessages}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};