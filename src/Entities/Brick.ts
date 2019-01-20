import { IBrick, VPosType } from "src/interfaces";

export class Brick {
    public drawBrick = (brick: IBrick, vPos: VPosType) => {
        const image = images[curBrick.type]
        if (image) context.drawImage(image, curBrick.hPos, vPos, curBrick.size, curBrick.size)
    }
}