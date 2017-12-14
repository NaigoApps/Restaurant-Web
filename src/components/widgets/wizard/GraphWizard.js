import React, {Component} from 'react';
import graphWizardStore from "./GraphWizardStore";
import graphWizardActions from "./GraphWizardActions";
import Button from "../../../widgets/Button";
import GraphWizardPage from "./graph/GraphWizardPage";
import Modal from "../../../widgets/modal/Modal";
import {uuid} from "../../../utils/Utils";
import Icon from "../../../widgets/Icon";
import NavPills from "../../../widgets/NavPills";
import NavElement from "../../../widgets/NavElement";
import Row from "../../../widgets/Row";

export default class GraphWizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: "gw_" + uuid(),
            data: []
        };

        this.updateWizard = this.updateWizard.bind(this);

    }

    componentDidMount() {
        graphWizardStore.addChangeListener(this.updateWizard);
        if (this.props.visible) {
            this.openWizard();
        }
    }

    openWizard() {
        graphWizardActions.reset(this.state.uuid, this.initialWizardData(), this.props.initialPage);
        graphWizardActions.open(this.state.uuid);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.visible && this.props.visible) {
            this.openWizard();
        }
    }

    componentWillUnmount() {
        graphWizardStore.removeChangeListener(this.updateWizard);
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
        graphWizardActions.confirm(this.state.uuid);
    }

    abortAction() {
        graphWizardActions.abort(this.state.uuid);
        if (this.props.abortAction) {
            this.props.abortAction();
        }
    }

    updateWizard(state) {
        this.setState((prevState, props) => (state.get(prevState.uuid)));
    }

    movePage(pageProps) {
        graphWizardActions.movePage(this.state.uuid, pageProps.identifier);
        if (pageProps.onEnter) {
            pageProps.onEnter(this.state.uuid, this.state.data);
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
        if (this.props.hideForm) {
            return <div className="form-horizontal">
                {this.buildModal()}
            </div>;
        }
        return <div className="form-group row">
            <label className="col-form-label col-sm-2">{this.props.label}</label>
            <div className="col-sm-10">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.openWizard.bind(this)}>
                    {this.props.renderer(this.initialWizardData())} <Icon name="pencil"/>
                </button>
            </div>
            {this.buildModal()}
        </div>;
    }


    buildModal() {

        const pageName = this.state.page;

        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            wizardData: this.state.data,
            wizardId: this.state.uuid
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
            return <NavElement>
                <button type="button"
                        className={this.getPageButtonClass(child.props)}
                        disabled={child.props.canEnter ? !child.props.canEnter(this.state.data) : false}
                        onClick={this.movePage.bind(this, child.props)}>
                    {child.props.name}
                    <Icon name={child.props.icon}/>
                </button>
            </NavElement>;
        });

        let navContainer;
        if (nav.length > 1) {
            navContainer = <div className="modal-header">
                <NavPills>
                    {nav}
                </NavPills>
            </div>;
        }

        return <Modal visible={this.props.visible || this.state.open}>
            {navContainer}
            <div className="modal-body">
                {currentPage}
            </div>
            <div className="modal-footer">
                <div className="col-sm-12">
                    <div className="row">
                        {review}
                    </div>
                    <Row justify="center">
                        {this.buildAbortButton()}{this.buildConfirmButton()}
                    </Row>
                </div>
            </div>
        </Modal>
    }
}