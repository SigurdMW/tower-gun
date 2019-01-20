export class ImageLoader {
    private imagePromises: any = []
    constructor(private images: string[]) {
        this.imagePromises = images.map(this.loadImage)
    }

    public static queue(images: string[]){
        return new ImageLoader(images)
    }

    public fetch = () => {
        return new Promise((resolve, reject) => {
            Promise.all(this.imagePromises)
                .then(images => resolve(images))
                .catch(err => reject(err))
        })
    }

    private loadImage = (imgPath: string) => {
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
}