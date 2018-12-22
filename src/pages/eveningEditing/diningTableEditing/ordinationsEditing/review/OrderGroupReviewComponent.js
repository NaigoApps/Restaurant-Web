import React from 'react';
import OrdinationsUtils from "../../../OrdinationsUtils";
import FormattedParagraph from "../../../../../widgets/FormattedParagraph";

export default class OrderGroupReviewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const group = this.props.group;

        let orderText = OrdinationsUtils.renderImplodedOrder(group);
        const priceText = OrdinationsUtils.formatGroupPrice(group);

        let bg;
        if(group.price === 0){
            bg = "warning"
        }

        return <FormattedParagraph
            leftText={orderText}
            rightText={priceText}
            bgBlink={bg}
            textColor={group.dish.category.color}/>;
    }
}