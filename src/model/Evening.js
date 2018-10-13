import BaseEntity from "./BaseEntity";
import {EntitiesUtils} from "../utils/EntitiesUtils";
import Color from "../utils/Color";
import {formatDate} from "../components/widgets/inputs/DateInput";

export default class Evening extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._day = new Date(dto.day);
        this._coverCharge = dto.coverCharge;
        this._tables = dto.diningTables.slice();
        this.tables.forEach(table => {
            if (table) {
                table.evening = this;
            }
        });
    }

    static create(dto, pool) {
        return new Evening(dto, pool);
    }

    toDto() {
        const result = super.toDto();
        result.day = this._day;
        result.coverCharge = this._coverCharge;
        result.diningTables = this._tables.slice();
        return result;
    }


    get day() {
        return this._day;
    }

    set day(day) {
        this._day = day;
    }

    get coverCharge() {
        return this._coverCharge;
    }

    set coverCharge(cc) {
        this._coverCharge = cc;
    }

    get tables() {
        return this.getEntities(this._tables).sort(EntitiesUtils.defaultComparator("openingTime"));
    }

    addTable(table) {
        if(!this._tables.includes(table.uuid)){
            this._tables.push(table.uuid);
            table.evening = this;
        }
    }
}