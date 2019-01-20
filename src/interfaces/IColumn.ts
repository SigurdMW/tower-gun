import { IBrick } from "./IBrick";
import { Bullet } from "src/Entities";

export type IColumn<T> = T[][]
export type IBulletColumn = IColumn<Bullet>
export type IBrickColumn = IColumn<IBrick>