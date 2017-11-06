import React, {Component} from 'react';

export default class GraphWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    static canEnter(wizardDate){
        return true;
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }

}