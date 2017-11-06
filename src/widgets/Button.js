import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    clickAction() {
        this.props.commitAction();
    }

    getClassName(){
        let classes = ["btn"];
        if(this.props.type){
            classes.push("btn-" + this.props.type)
        }else{
            classes.push("btn-default");
        }
        if(this.props.size){
            classes.push("btn-" + this.props.size)
        }else{
            classes.push("btn-sm");
        }
        return classes.join(" ");
    }

    render() {
        let text = this.props.text;
        let glyphicon;
        if(this.props.icon){
            glyphicon = <span className={"glyphicon " + "glyphicon-" + this.props.icon}/>
        }
        return (
            <button
                className={this.getClassName()}
                onClick={this.clickAction.bind(this)}
                disabled={this.props.disabled}
            >
                {text} {glyphicon}
            </button>
        );
    }

}