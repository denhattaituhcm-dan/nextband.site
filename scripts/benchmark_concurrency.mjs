import { buildApp } from "../server/app.js";

async function runBenchmark() {
  console.log("==========================================================");
  console.log("🚀 PHASE 3.3: IN-MEMORY FASTIFY & CACHE CONCURRENCY BENCHMARK");
  console.log("==========================================================");

  process.env.JWT_SECRET = "test-secret-1234567890-test-secret-1234567890";
  process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/postgres";
  process.env.NODE_ENV = "production";

  const app = await buildApp();
  await app.ready();

  const token = app.jwt.sign({
    id: "bench-user-1",
    roles: ["student"],
    email: "bench@nextband.site",
  });

  const concurrencyLevels = [10, 25, 50, 100, 200];

  for (const concurrency of concurrencyLevels) {
    console.log(`\n--- BENCHMARKING CONCURRENCY: ${concurrency} concurrent requests ---`);

    // Scenario A: Public Cached Route (GET /api/v1/courses)
    const startTimeA = performance.now();
    const latenciesA = [];
    let errorsA = 0;

    const promisesA = Array.from({ length: concurrency }).map(async () => {
      const t0 = performance.now();
      try {
        const res = await app.inject({
          method: "GET",
          url: "/api/v1/courses",
        });
        const t1 = performance.now();
        latenciesA.push(t1 - t0);
        if (res.statusCode !== 200) errorsA++;
      } catch (err) {
        errorsA++;
      }
    });

    await Promise.all(promisesA);
    const totalTimeA = performance.now() - startTimeA;

    latenciesA.sort((a, b) => a - b);
    const p50A = latenciesA[Math.floor(latenciesA.length * 0.5)] || 0;
    const p95A = latenciesA[Math.floor(latenciesA.length * 0.95)] || 0;
    const p99A = latenciesA[Math.floor(latenciesA.length * 0.99)] || 0;
    const rpsA = (concurrency / (totalTimeA / 1000)).toFixed(1);

    console.log(`[Public GET /courses] (Unauthenticated)`);
    console.log(`  ➔ Total Time: ${totalTimeA.toFixed(2)} ms | Throughput: ${rpsA} req/s | Error Rate: ${((errorsA / concurrency) * 100).toFixed(1)}%`);
    console.log(`  ➔ Latencies: p50 = ${p50A.toFixed(2)} ms | p95 = ${p95A.toFixed(2)} ms | p99 = ${p99A.toFixed(2)} ms`);

    // Scenario B: Authenticated Non-Cached Route (GET /api/v1/courses with Auth Header)
    const startTimeB = performance.now();
    const latenciesB = [];
    let errorsB = 0;

    const promisesB = Array.from({ length: concurrency }).map(async () => {
      const t0 = performance.now();
      try {
        const res = await app.inject({
          method: "GET",
          url: "/api/v1/courses",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const t1 = performance.now();
        latenciesB.push(t1 - t0);
        if (res.statusCode >= 500) errorsB++;
      } catch (err) {
        errorsB++;
      }
    });

    await Promise.all(promisesB);
    const totalTimeB = performance.now() - startTimeB;

    latenciesB.sort((a, b) => a - b);
    const p50B = latenciesB[Math.floor(latenciesB.length * 0.5)] || 0;
    const p95B = latenciesB[Math.floor(latenciesB.length * 0.95)] || 0;
    const p99B = latenciesB[Math.floor(latenciesB.length * 0.99)] || 0;
    const rpsB = (concurrency / (totalTimeB / 1000)).toFixed(1);

    console.log(`[Authenticated GET /courses] (Anti-Data-Leak No-Store)`);
    console.log(`  ➔ Total Time: ${totalTimeB.toFixed(2)} ms | Throughput: ${rpsB} req/s | 5xx Errors: ${errorsB}`);
    console.log(`  ➔ Latencies: p50 = ${p50B.toFixed(2)} ms | p95 = ${p95B.toFixed(2)} ms | p99 = ${p99B.toFixed(2)} ms`);
  }

  console.log("\n==========================================================");
  console.log("✅ PHASE 3.3 CONCURRENCY BENCHMARK COMPLETE");
  console.log("==========================================================");

  await app.close();
}

runBenchmark().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
