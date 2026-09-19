import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

export class ArenaPinService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Generates a 6-digit random PIN string ("100000" to "999999")
   */
  public generateRawPin(): string {
    const min = 100000;
    const max = 999999;
    const pinNumber = crypto.randomInt(min, max + 1);
    return pinNumber.toString();
  }

  /**
   * Generates a cryptographically random 6-digit PIN that is guaranteed
   * NOT to collide with any currently ACTIVE arena room (status != 'ENDED').
   */
  public async generateUniqueActivePin(maxAttempts = 15): Promise<string> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const candidatePin = this.generateRawPin();

      // Check if there is any existing room with this PIN that is NOT 'ENDED'
      const existingActiveRoom = await this.prisma.arenaRoom.findFirst({
        where: {
          pin: candidatePin,
          status: {
            not: "ENDED",
          },
        },
        select: { id: true },
      });

      if (!existingActiveRoom) {
        return candidatePin;
      }
    }

    throw new Error(
      "Không thể sinh mã PIN phòng ngẫu nhiên duy nhất sau nhiều lần thử. Vui lòng thử lại!"
    );
  }

  /**
   * Generates a secure random 32-byte hexadecimal host token
   */
  public generateHostToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Creates a SHA-256 hash of a host token for secure database storage
   */
  public hashHostToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  /**
   * Verifies a candidate token against stored hash in constant time
   */
  public verifyHostToken(candidateToken: string, storedHash: string): boolean {
    const candidateHash = this.hashHostToken(candidateToken);
    if (candidateHash.length !== storedHash.length) return false;
    return crypto.timingSafeEqual(
      Buffer.from(candidateHash, "utf8"),
      Buffer.from(storedHash, "utf8")
    );
  }
}
