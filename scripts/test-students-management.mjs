import { buildApp } from "../server/app.ts";
import dotenv from "dotenv";
dotenv.config();

async function testEndpoint() {
  const app = await buildApp();
  await app.ready();

  // Test students-management directly
  const res = await app.inject({
    method: "GET",
    url: "/api/v1/users/students-management",
    headers: {},
  });

  console.log("Unauthenticated status:", res.statusCode);

  await app.close();
}

testEndpoint();
