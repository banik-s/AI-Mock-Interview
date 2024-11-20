/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:dNP7T9yQBuRq@ep-shiny-king-a570injt.us-east-2.aws.neon.tech/mock_interview?sslmode=require',
    }
};