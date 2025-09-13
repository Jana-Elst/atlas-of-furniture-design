// scripts/seed.mjs
import fs from 'fs';

// This is the same function you use in your Astro project, adjust if needed
async function fetchApi({ endpoint, query, wrappedByKey }) {
    const url = new URL(`/api/${endpoint}`, 'http://localhost:1337');

    if (query) {
        // A simple query string builder
        Object.entries(query).forEach(([key, value]) => {
            if (typeof value === 'object') {
                Object.entries(value).forEach(([subKey, subValue]) => {
                    url.searchParams.append(`${key}[${subKey}]`, subValue);
                });
            } else {
                url.searchParams.append(key, value);
            }
        });
    }

    const res = await fetch(url.toString());
    let data = await res.json();

    if (wrappedByKey && data[wrappedByKey]) {
        data = data[wrappedByKey];
    }

    // Flattening attributes for easier use in Astro
    return data.map(item => ({ id: item.id, ...item.attributes }));
}

async function seedData() {
    console.log('Fetching data from local Strapi...');

    // Fetch all designers with their relations
    const designers = await fetchApi({
        endpoint: "designers",
        query: {
            populate: ["image", "bio", "furnitures", "furnitures.image"],
            pagination: { pageSize: 100 }, // Make sure to get all items
        },
        wrappedByKey: 'data'
    });

    // You can add more fetches here for other data types if needed

    // Create an object to hold all your data
    const allData = {
        designers: designers,
    };

    // Write the data to a JSON file in your client's src folder
    const outputPath = 'client/src/data/strapi-data.json';
    fs.mkdirSync('client/src/data', { recursive: true }); // Create directory if it doesn't exist
    fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));

    console.log(`✅ Data seeded successfully to ${outputPath}`);
}

seedData();