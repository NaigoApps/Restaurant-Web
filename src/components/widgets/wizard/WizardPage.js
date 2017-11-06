import React, {Component} from 'react';
import Button from "../../../widgets/Button";

export default class WizardPage extends Component {
    constructor(props) {
        super(props);
    }

    goOnAction(){
        this.props.goOnAction(this.props.pageData);
    }

    confirmAction(){
        this.props.confirmAction(this.props.pageData);
    }

    render() {

        let goBackButton;
        if(this.props.goBackAction){
            goBackButton = <Button icon="triangle-left" commitAction={this.props.goBackAction}/>;
        }
        let goOnButton;
        if(this.props.goOnAction){
            goOnButton = <Button icon="triangle-right" commitAction={this.goOnAction.bind(this)} disabled={!this.props.valid}/>;
        }
        let abortButton;
        if(this.props.abortAction){
            abortButton = <Button icon="remove" type="danger" commitAction={this.props.abortAction}/>;
        }
        let confirmButton;
        if(this.props.confirmAction){
            confirmButton = <Button icon="ok" type="success" commitAction={this.confirmAction.bind(this)} disabled={!this.props.valid}/>;
        }

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.props.children}
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <div className="col-sm-1">
                            {goBackButton}
                        </div>

                        <div className="col-sm-1 col-sm-offset-3">
                            {abortButton}
                        </div>

                        <div className="col-sm-1 col-sm-offset-2">
                            {confirmButton}
                        </div>

                        <div className="col-sm-1 col-sm-offset-3">
                            {goOnButton}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}