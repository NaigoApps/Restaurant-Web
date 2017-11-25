import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';
import wizardStore from "./WizardStore";
import wizardActions from "./WizardActions";
import graphWizardStore from "./GraphWizardStore";
import graphWizardActions from "./GraphWizardActions";
import Button from "../../../widgets/Button";
import GraphWizardPage from "./graph/GraphWizardPage";

/**
 * function initializer -> provides initial wizard data
 * boolean autoShow -> if true wizard modal will show after mount
 * string label -> label of wizard button
 * function renderer(data) -> text to output as review
 * function commitAction -> called when user confirms wizard
 * function abortAction -> called when user aborts
 */

export default class GraphWizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: "gw_" + uuid(),
            confirmed: false,
            page: null,
            data: {}
        };

        this.updateWizard = this.updateWizard.bind(this);

    }

    componentDidMount() {
        graphWizardStore.addChangeListener(this.updateWizard);
        $('#' + this.state.uuid).on('hide.bs.modal', this.mayAbort.bind(this));
        if (this.props.autoShow) {
            this.openWizard();
        }
    }

    mayAbort() {
        if (!this.state.confirmed) {
            if (this.props.abortAction) {
                this.props.abortAction();
            }
        }
    }

    componentWillUnmount() {
        graphWizardStore.removeChangeListener(this.updateWizard);
    }

    openWizard() {
        graphWizardActions.reset(this.initialWizardData(), this.props.initialPage);
        $("#" + this.state.uuid).modal("show");
    }

    initialWizardData() {
        let initialData = {};
        React.Children.forEach(this.props.children, child => {
            initialData[child.props.identifier] = GraphWizardPage.initializeWizard(child.props);
        });
        return initialData;
    }

    confirmAction() {
        this.props.commitAction(this.state.data);
        $("#" + this.state.uuid).modal("hide");
    }

    abortAction() {
        this.setState({
            confirmed: false
        });
        $("#" + this.state.uuid).modal("hide");
    }

    updateWizard(state) {
        this.setState(state);
    }

    movePage(pageProps) {
        graphWizardActions.movePage(pageProps.identifier);
        if (pageProps.onEnter) {
            pageProps.onEnter(this.state.data);
        }
    }

    pagesNumber() {
        return React.Children.count(this.props.children);
    }

    getPageButtonClass(page) {
        let classes = ["btn", "navbar-btn"];
        if (this.state.page === page.identifier) {
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
        if (this.props.isForNav) {
            return this.buildNavContent();
        } else {
            return this.buildDefaultContent();
        }
    }

    buildAbortButton() {
        return <Button
            text="Annulla"
            type="danger"
            commitAction={this.abortAction.bind(this)}/>;
    }

    buildConfirmButton() {
        return <Button
            text="Conferma"
            type="success"
            disabled={this.props.isValid && !this.props.isValid(this.state.data)}
            commitAction={this.confirmAction.bind(this)}/>;
    }

    buildNavContent() {
        return <div className="form-group">
            <button
                type="button"
                className="btn btn-primary"
                onClick={this.openWizard.bind(this)}>
                {this.props.label} {this.props.renderer(this.initialWizardData())} <span
                className="glyphicon glyphicon-pencil"/>
            </button>
            {this.buildModal()}
        </div>;
    }

    buildDefaultContent() {
        return <div className="form-horizontal">
            <div className="form-group">
                <label className="control-label col-sm-2">{this.props.label}</label>
                <div className="col-sm-10">
                    <div className="input-group">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.openWizard.bind(this)}>
                            {this.props.renderer(this.initialWizardData())} <span
                            className="glyphicon glyphicon-pencil"/>
                        </button>
                    </div>
                </div>
            </div>
            {this.buildModal()}
        </div>;
    }

    buildModal() {

        const pageName = this.state.page;

        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            wizardData: this.state.data
        }));

        const currentPage = React.Children.toArray(pages).find(page => page.props.identifier === pageName);

        let value = this.props.renderer(this.state.data);
        let review;
        if (value && !this.props.hideReview) {
            review = <div className="well well-sm text-left">
                {value}
            </div>
        }

        let nav = React.Children.map(this.props.children, (child) => {
            return <li role="presentation" className="active">
                <button type="button"
                        className={this.getPageButtonClass(child.props)}
                        disabled={child.props.canEnter ? !child.props.canEnter(this.state.data) : false}
                        onClick={this.movePage.bind(this, child.props)}>
                    {child.props.name}
                    <span className={child.props.icon ? "glyphicon glyphicon-" + child.props.icon : ""}/>
                </button>
            </li>;
        });

        let navContainer;
        if (nav.length > 1) {
            navContainer = <div className="modal-header">
                <ul className="nav nav-pills">
                    {nav}
                </ul>
            </div>;
        }

        return <div className="modal fade" id={this.state.uuid}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {navContainer}
                    <div className="modal-body">
                        {currentPage}
                    </div>
                    <div className="modal-footer">
                        <div className="col-sm-12">
                            <div className="row">
                                {review}
                            </div>
                            <div className="row text-center">
                                {this.buildAbortButton()}{this.buildConfirmButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}