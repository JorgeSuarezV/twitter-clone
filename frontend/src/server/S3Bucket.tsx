export async function uploadImage(image: any, url: string) {
    const format = image.dataURL.substring(image.dataURL.indexOf('data:') + 5, image.dataURL.indexOf(';base64'));
    const base64String = image.dataURL.replace(/^data:image\/\w+;base64,/, '');
    const binaryData = atob(base64String);
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    fetch(url, {
        method: "PUT",
        body: uint8Array,
        headers: {
            "Content-Type": format
        }
    }).then(() => {
        console.log("uploaded")
    }).catch((error) => {
        console.error(error)
    })
}
