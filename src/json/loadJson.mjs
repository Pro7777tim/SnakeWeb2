export async function loadJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('HTTP error ' + response.status);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Fetch error:', err);
        return err;
    }
}  