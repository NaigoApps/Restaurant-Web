import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';
import wizardStore from "./WizardStore";
import wizardActions from "./WizardActions";
import graphWizardStore from "./GraphWizardStore";
import graphWizardActions from "./GraphWizardActions";
import Button from "../../../widgets/Button";

export default class GraphWizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: "gw_" + uuid(),
            wizardData: {
                page: null,
                data: props.initializer()
            }
        };

        this.updateWizard = this.updateWizard.bind(this);
    }

    componentDidMount() {
        graphWizardStore.addChangeListener(this.updateWizard);
        if (this.props.autoShow) {
            this.openWizard();
        }
    }

    componentWillUnmount() {
        graphWizardStore.removeChangeListener(this.updateWizard);
    }

    openWizard() {
        graphWizardActions.reset(React.Children.toArray(this.props.children).map(page => page.props),this.props.initializer());
        $("#" + this.state.uuid).modal("show");
    }

    closeWizard() {
        this.props.commitAction(this.state.wizardData.data);
        $("#" + this.state.uuid).modal("hide");
    }

    updateWizard() {
        this.setState({
            wizardData: graphWizardStore.getWizardData()
        });
    }

    goBackAction() {
        wizardActions.previousStep();
    }

    movePage(pageProps) {
        graphWizardActions.movePage(pageProps.identifier);
        if (pageProps.onEnter) {
            pageProps.onEnter(this.state.wizardData.data);
        }
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

    getPageButtonClass(page) {
        let classes = ["btn", "navbar-btn"];
        if (this.state.wizardData.page === page.identifier) {
            classes.push("active");
        }
        if (page.type) {
            classes.push("btn-" + page.type);
        } else {
            classes.push("btn-default")
        }
        return classes.join(" ");
    }

    render() {

        const pageName = this.state.wizardData.page;
        const pagesNumber = this.pagesNumber();

        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            abortAction: this.abortAction.bind(this),
            confirmAction: this.confirmAction.bind(this),
            wizardData: this.state.wizardData.data
        }));

        const currentPage = React.Children.toArray(pages).find(page => page.props.identifier === pageName);

        let label = "";

        let nav = React.Children.map(this.props.children, (child) => {
            return <li role="presentation" className="active">
                <button type="button"
                        className={this.getPageButtonClass(child.props)}
                        disabled={child.props.canEnter ? !child.props.canEnter(this.state.wizardData.data) : false}
                        onClick={this.movePage.bind(this, child.props)}>{child.props.name}</button>
            </li>;
        });

        let value = this.props.renderer(this.state.wizardData.data);
        let review;
        if (value) {
            review = <div className="well well-sm text-left">
                {value}
            </div>
        }

        let confirmBtn = <Button text="Conferma" type="success" commitAction={this.closeWizard.bind(this)}/>;

        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="control-label col-sm-2">{this.props.label}</label>
                    <div className="col-sm-10">
                        <div className="input-group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.openWizard.bind(this)}>
                                <span className="glyphicon glyphicon-pencil"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={this.state.uuid}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <ul className="nav nav-pills">
                                    {nav}
                                </ul>
                            </div>
                            <div className="modal-body">
                                {currentPage}
                            </div>
                            <div className="modal-footer">
                                {review}{confirmBtn}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}