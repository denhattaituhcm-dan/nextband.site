/**
 * Student Model Domain Mathematics — Phase 3: Bayesian Beta Accumulator
 * 
 * CORE PRINCIPLES:
 * 1. Pure domain functions — ZERO Prisma, database, network, or external IO dependencies.
 * 2. 100% Deterministic — Given the exact same inputs, outputs are identical byte-for-byte.
 * 3. Formal Bayesian Conjugate Prior: Beta(alpha, beta) distribution with Bernoulli/Binomial evidence.
 * 4. Fails loudly on invalid/corrupted evidence rows (outcome < 0 or > 1, weight <= 0, NaN/Infinity).
 */

export interface LearningObservationInput {
  outcome: number;        // 1.0 = Success, 0.0 = Failure, [0.0, 1.0] for partial credit
  evidenceWeight?: number; // Default 1.0; Must be > 0
  observedAt?: Date | string | number;
}

export interface BetaParameters {
  alpha: number;
  beta: number;
  totalEvidence: number;
}

export interface PosteriorMetrics {
  alpha: number;
  beta: number;
  totalEvidence: number;
  posteriorMean: number;       // Expected Value: alpha / (alpha + beta)
  uncertaintyVariance: number; // Var(Beta) = (alpha * beta) / ((alpha + beta)^2 * (alpha + beta + 1))
  sampleSize: number;          // Total effective pseudocounts: (alpha + beta)
}

export const DEFAULT_PRIOR_ALPHA = 1.0;
export const DEFAULT_PRIOR_BETA = 1.0;

/**
 * Validates a single learning observation input.
 * Invariant: Never silently fix corrupted historical evidence. Fail loudly!
 */
export function validateObservation(obs: LearningObservationInput): void {
  if (typeof obs.outcome !== "number" || Number.isNaN(obs.outcome)) {
    throw new Error(`[StudentModelDomain] Invalid outcome: ${obs.outcome}. Must be a valid number.`);
  }
  if (obs.outcome < 0.0 || obs.outcome > 1.0) {
    throw new Error(
      `[StudentModelDomain] Outcome out of range [0.0, 1.0]: ${obs.outcome}. Strict integrity check failed.`
    );
  }

  const weight = obs.evidenceWeight ?? 1.0;
  if (typeof weight !== "number" || Number.isNaN(weight) || weight <= 0) {
    throw new Error(
      `[StudentModelDomain] Invalid evidenceWeight: ${weight}. Must be a finite number > 0.`
    );
  }
}

/**
 * Accumulates observations using Bayesian conjugate updating for Beta-Binomial:
 * alpha = priorAlpha + sum(outcome_i * weight_i)
 * beta  = priorBeta  + sum((1 - outcome_i) * weight_i)
 * totalEvidence = count of valid observations
 *
 * Order-independent math (commutative addition).
 */
export function calculateAlphaBeta(
  observations: LearningObservationInput[],
  priorAlpha: number = DEFAULT_PRIOR_ALPHA,
  priorBeta: number = DEFAULT_PRIOR_BETA
): BetaParameters {
  if (priorAlpha <= 0 || priorBeta <= 0 || Number.isNaN(priorAlpha) || Number.isNaN(priorBeta)) {
    throw new Error(`[StudentModelDomain] Priors must be positive numbers. Got alpha=${priorAlpha}, beta=${priorBeta}`);
  }

  let alpha = priorAlpha;
  let beta = priorBeta;
  let totalEvidence = 0;

  for (const obs of observations) {
    validateObservation(obs);
    const weight = obs.evidenceWeight ?? 1.0;
    alpha += obs.outcome * weight;
    beta += (1.0 - obs.outcome) * weight;
    totalEvidence += 1;
  }

  return {
    alpha,
    beta,
    totalEvidence,
  };
}

/**
 * Expected Value of Beta distribution:
 * E[Theta] = alpha / (alpha + beta)
 */
export function calculatePosteriorMean(alpha: number, beta: number): number {
  if (alpha <= 0 || beta <= 0) {
    throw new Error(`[StudentModelDomain] Parameters must be > 0. Got alpha=${alpha}, beta=${beta}`);
  }
  return alpha / (alpha + beta);
}

/**
 * Variance of Beta distribution:
 * Var[Theta] = (alpha * beta) / ((alpha + beta)^2 * (alpha + beta + 1))
 * Represents epistemic uncertainty about the student's true mastery.
 */
export function calculateUncertainty(alpha: number, beta: number): number {
  if (alpha <= 0 || beta <= 0) {
    throw new Error(`[StudentModelDomain] Parameters must be > 0. Got alpha=${alpha}, beta=${beta}`);
  }
  const sum = alpha + beta;
  return (alpha * beta) / (sum * sum * (sum + 1));
}

/**
 * Computes full mathematical metrics for a set of observations or accumulated parameters.
 */
export function computePosteriorMetrics(
  alpha: number,
  beta: number,
  totalEvidence: number
): PosteriorMetrics {
  const mean = calculatePosteriorMean(alpha, beta);
  const variance = calculateUncertainty(alpha, beta);

  return {
    alpha,
    beta,
    totalEvidence,
    posteriorMean: mean,
    uncertaintyVariance: variance,
    sampleSize: alpha + beta,
  };
}
