import { PrismaClient } from "@prisma/client";
import { ClassService } from "../server/services/class.service.js";

async function runTests() {
  const prisma = new PrismaClient();
  const classService = new ClassService(prisma);

  console.log("🚀 Starting Class Lifecycle & Close Verification Tests...\n");

  try {
    // 1. Kiểm tra existence của methods
    if (typeof classService.closeClass !== "function") {
      throw new Error("❌ closeClass method is missing in ClassService");
    }
    if (typeof classService.runClassLifecycleMaintenance !== "function") {
      throw new Error("❌ runClassLifecycleMaintenance method is missing in ClassService");
    }
    console.log("✅ ClassService methods verified: closeClass, runClassLifecycleMaintenance are present.");

    // 2. Chạy thử runClassLifecycleMaintenance
    console.log("🔄 Executing runClassLifecycleMaintenance (Dry Run / Current State)...");
    const maintenanceResult = await classService.runClassLifecycleMaintenance();
    console.log("✅ runClassLifecycleMaintenance executed successfully:", maintenanceResult);

    console.log("\n🎉 All Class Lifecycle checks passed successfully!");
  } catch (err: any) {
    console.error("❌ Test error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
