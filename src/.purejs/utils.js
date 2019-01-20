import { brickTypes } from "./variables"

export const newImageLoader = (imgPath) => {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => {
            resolve(image)
        }
        image.onerror = (e) => {
            reject(e)
        }
        image.src = imgPath
    })
}