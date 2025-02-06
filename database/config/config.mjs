export const options = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    // logging
    logging: process.env.NODE_ENV === "development" ? console.log : false,

    // migrations
    migrationStorageTableName: "migrations"
}

if (process.env.NODE_ENV === "development") {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
        const url = new URL(dbUrl);
        options.dialectOptions = {
            ssl: {
                rejectUnauthorized: true, // Ensure SSL is enforced
            }
        };

        // Use URL components to update specific connection options if needed
        options.username = url.username;
        options.password = url.password;
        options.host = url.hostname;
        options.database = url.pathname.split("/")[1]; // Extract the database name from the path
        options.port = Number(url.port) || 5432; // Default PostgreSQL port
    }
}

export default {
    development: options,
    test: options,
    production: options
}