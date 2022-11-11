export default async function api() {
    try {
        const response = await fetch("data/recipes.json");
        const promise = await response.json();
        return promise;
    } catch (error) {
        console.log(error);
    }
}
