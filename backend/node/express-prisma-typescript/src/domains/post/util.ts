export function generateImageNames(image: string[]) {
    return image.map((image, index) => {
        return `${index}`;
    });
}