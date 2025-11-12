async function getData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=6");
        const photos = await response.json();
        const random = Math.floor(Math.random() * 1000);
        const photosWithLocal = photos.map((photo) => ({
            ...photo,
            localUrl: `https://picsum.photos/seed/${photo.id + random}/600/400`,
        }));
        return photosWithLocal;
    }
    catch (error) {
        console.error("Помилка при отриманні даних:", error);
        return [];
    }
}
export { getData };
console.log("API module loaded");
//# sourceMappingURL=api.js.map