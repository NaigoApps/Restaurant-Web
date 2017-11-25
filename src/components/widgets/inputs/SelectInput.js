import React, {Component} from 'react';
import Wizard from "../wizard/Wizard";
import BasicWizardPage from "../wizard/SelectWizardPage";

export default class SelectInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        return {
            selectedOption: props.default || ""
        }
    }


    onWizardClose(data) {
        let result;
        if (data.length == 1) {
            result = data[0];
        } else {
            result = "";
        }
        this.props.commitAction(result);
        this.setState({
            selectedOption: result
        });
    }

    render() {
        let pages = [
            (callback, data) => <BasicWizardPage
                nextAction={callback}
                options={this.props.options}
                label={o => o}
            />
        ];
        return <Wizard
            pages={pages}
            default={this.props.default}
            commitAction={this.onWizardClose.bind(this)}
            renderer={o => o}
        />;
    }

}