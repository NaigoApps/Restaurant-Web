import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';
import wizardStore from "./WizardStore";
import wizardActions from "./WizardActions";

export default class Wizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: "w_" + uuid(),
            wizardData: {
                step: 0,
                data: []
            }
        };

        this.updateWizard = this.updateWizard.bind(this);
    }

    componentDidMount() {
        wizardStore.addChangeListener(this.updateWizard);
    }

    componentWillUnmount() {
        wizardStore.removeChangeListener(this.updateWizard);
    }

    openWizard() {
        wizardActions.reset();
        $("#" + this.state.uuid).modal("show");
    }

    updateWizard() {
        this.setState({
            wizardData: wizardStore.getWizardData()
        });
    }

    goBackAction() {
        wizardActions.previousStep();
    }

    goOnAction(option) {
        wizardActions.nextStep(option);
    }

    abortAction() {
        $("#" + this.state.uuid).modal("hide");
    }

    confirmAction(option) {
        let data = this.state.wizardData.data.slice();
        data.push(option);
        this.props.commitAction(data);
        $("#" + this.state.uuid).modal("hide");
    }

    pagesNumber() {
        return React.Children.count(this.props.children);
    }

    isLastPage() {
        return this.state.wizardData.step === this.pagesNumber() - 1;
    }

    render() {

        const currentPageIndex = this.state.wizardData.step;
        const pagesNumber = this.pagesNumber();

        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            goBackAction: (currentPageIndex > 0) ? this.goBackAction.bind(this) : undefined,
            goOnAction: (currentPageIndex < pagesNumber - 1) ? this.goOnAction.bind(this) : undefined,
            abortAction: this.abortAction.bind(this),
            confirmAction: (currentPageIndex === pagesNumber - 1) ? this.confirmAction.bind(this) : undefined,
            wizardData: this.state.wizardData.data
        }));

        const currentPage = React.Children.toArray(pages)[currentPageIndex];

        let label = "";
        let value = this.props.renderer(this.state.wizardData.data);

        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="control-label col-sm-2">{this.props.label}</label>
                    <div className="col-sm-10">
                        <div className="input-group">
                            <label className="form-control">{value}</label>
                            <span className="input-group-btn">
                                <button type="button"
                                        className="btn btn-primary"
                                        onClick={this.openWizard.bind(this)}>
                                    <span className="glyphicon glyphicon-pencil"/>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={this.state.uuid}>
                    <div className="modal-dialog modal-lg">
                        {currentPage}
                    </div>
                </div>
            </div>
        )
    }

}