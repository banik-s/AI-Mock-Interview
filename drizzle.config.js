/** @type {import ("drizzle-kit").config}*/
export default {
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: 'postgresql://neondb_owner:txaeM9EJi4WY@ep-dawn-dream-a88zxlj4.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require'
  }
};