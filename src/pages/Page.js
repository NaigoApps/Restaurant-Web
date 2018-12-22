import React from 'react';
import errorsStore from "../stores/ErrorsStore";
import applicationStore from "../stores/ApplicationStore";
import Modal from "../widgets/modal/Modal";
import Button from "../widgets/Button";
import Row from "../widgets/Row";
import Column from "../widgets/Column";
import ApplicationTextInput from "../components/widgets/ApplicationTextInput";
import ApplicationFloatInput from "../components/widgets/ApplicationFloatInput";
import ApplicationIntegerInput from "../components/widgets/ApplicationIntegerInput";
import ApplicationSelectInput from "../components/widgets/ApplicationSelectInput";
import ApplicationColorInput from "../components/widgets/ApplicationColorInput";
import ErrorActions from "../stores/ErrorActions";
import ViewController from "../widgets/ViewController";
import loadingStore from "../stores/LoadingStore";
import ApplicationPercentInput from "../components/widgets/ApplicationPercentInput";
import PopupContainer from "../components/widgets/PopupContainer";

export const ApplicationContext = React.createContext(undefined);

export default class Page extends ViewController {

    constructor(props) {
        super(props, errorsStore, loadingStore, applicationStore);
    }

    clearMessages() {
        ErrorActions.clearErrorMessages();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.loading.busy ||
            !this.state.loading.busy && nextState.loading.busy;
    }

    render() {
        const loadingComponent = this.buildLoadingComponent();

        return (
            <ApplicationContext.Provider value={this.state.general}>
                <div className="container-fluid main">
                    <Row fullHeight>
                        <Column>
                            {this.props.children}
                        </Column>
                        <Modal visible={!!this.state.error.message}>
                            <div className="modal-header">
                                <h4 className="modal-title text-danger text-center">
                                    <span className="glyphicon glyphicon-warning-sign"/> Errore
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="text-center text-danger">{this.state.error.message}</div>
                            </div>
                            <div className="modal-footer">
                                <Button text="Chiudi" commitAction={this.clearMessages}/>
                            </div>
                        </Modal>
                        <ApplicationTextInput {...this.state.general.textInput}/>
                        <ApplicationFloatInput {...this.state.general.floatInput}/>
                        <ApplicationIntegerInput {...this.state.general.integerInput}/>
                        <ApplicationPercentInput {...this.state.general.percentInput}/>
                        <ApplicationSelectInput {...this.state.general.selectInput}/>
                        <ApplicationColorInput {...this.state.general.colorInput}/>
                    </Row>
                    {loadingComponent}
                </div>
            </ApplicationContext.Provider>
        )
    }

    buildLoadingComponent() {
        return <PopupContainer visible={this.state.loading.busy}>
            <h1 className="text-center text-warning">LOADING</h1>
        </PopupContainer>;
    }
};