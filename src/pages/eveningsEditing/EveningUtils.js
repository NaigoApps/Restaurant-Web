import {beautifyDate} from "../../components/widgets/inputs/DateInput";

export default class EveningUtils{
    static renderEvening(evening){
        return beautifyDate(evening.get('day'));
    }
}