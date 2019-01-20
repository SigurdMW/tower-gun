import { BrickTypes } from "./BrickTypes"
import { HPType, VPosType, HPosType, SizeType } from "./genericTypes";

export interface IBrick {
    hp: HPType
    vPos: VPosType
    hPos: HPosType
    size: SizeType
    type: BrickTypes
}