import { IColumn, IBrickColumn } from "./IColumn"
import { VPosType } from "./genericTypes";

export interface IRow {
    vPos: VPosType
    /**
     * @default equal to COL_HEIGHT
     */
    height?: number
    columns: IBrickColumn[]
}