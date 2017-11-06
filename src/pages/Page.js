import React, {Component} from 'react';
import loadingStore from "../stores/LoadingStore";
import errorsStore from "../stores/ErrorsStore";
import $ from "jquery";
import errorActions from "../actions/ErrorsActions";

export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            loading: false
        };

        this.updateLoadingStatus = this.updateLoadingStatus.bind(this);
        this.updateErrorStatus = this.updateErrorStatus.bind(this);
    }

    clearMessages(){
        errorActions.clearMessages();
    }

    updateLoadingStatus() {
        this.setState({
            loading: loadingStore.isBusy()
        });
    }

    updateErrorStatus() {
        let message = errorsStore.getMessage();
        this.setState({
            errorMessage: message
        });
        if(message){
            $("#error-modal").modal("show");
        }
    }

    componentDidMount() {
        loadingStore.addChangeListener(this.updateLoadingStatus);
        errorsStore.addChangeListener(this.updateErrorStatus);
        this.updateLoadingStatus();
        this.updateErrorStatus();
    }

    componentWillUnmount() {
        loadingStore.removeChangeListener(this.updateLoadingStatus);
        errorsStore.removeChangeListener(this.updateErrorStatus);
    }

    render() {
        return (
            <div className="container">
                {this.props.children}
                <div className="modal fade" id="error-modal" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title text-danger text-center">Errore</h4>
                            </div>
                            <div className="modal-body">
                                <p>{this.state.errorMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                        className="btn btn-default"
                                        data-dismiss="modal"
                                        onClick={this.clearMessages}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}