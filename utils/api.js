export default async function api() {
    try {
        const response = await fetch("data/recipes.json");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
