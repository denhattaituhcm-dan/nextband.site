/**
 * Huyền Cơ Lão Nhân — Character Runtime Contract
 * Single Source of Truth for Character Render Interfaces & Pipeline Contracts
 */

import { HuyenCoState } from "./HuyenCoState";

export type RenderTier = "auto" | "webm" | "glb" | "static";

export interface CharacterContract {
  state: HuyenCoState;
  size: number;
  variant: "avatar" | "portrait" | "inline" | "launcher";
  renderTier: RenderTier;
  className?: string;
  altText?: string;
  onStateChange?: (newState: HuyenCoState) => void;
}

export interface RendererProps {
  state: HuyenCoState;
  size: number;
  variant: "avatar" | "portrait" | "inline" | "launcher";
  altText: string;
  className?: string;
  onFallback?: () => void;
}
