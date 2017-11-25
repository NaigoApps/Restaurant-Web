import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class TouchSpace extends Component {
    constructor(props) {
        super(props);
    }

    static getClassName(props){
        let classes = ["col-lg-3","col-md-4","col-sm-6","col-xs-12"];
        return classes.join(" ");
    }

    render() {
        return (
            <div className={TouchSpace.getClassName(this.props)}>
                <span className="touch-space all-sep">&nbsp;</span>
            </div>
        );
    }

}