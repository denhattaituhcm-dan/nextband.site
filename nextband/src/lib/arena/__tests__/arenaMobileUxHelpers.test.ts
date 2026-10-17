import { describe, it, expect } from 'vitest';
import {
  CHARACTER_CATEGORY_MAP,
  getCharacterCategoryLabel,
  getCharacterBySeed,
  CHARACTER_AVATARS,
} from '../characterCatalog';

describe('Arena Mobile UX Helpers & Category Mapping', () => {
  it('chuyển đổi chuẩn xác các raw category enum sang tiếng Việt thân thiện', () => {
    expect(getCharacterCategoryLabel('anime_fantasy')).toBe('Yu-Gi-Oh! & Anime');
    expect(getCharacterCategoryLabel('pop_heroes')).toBe('Siêu Anh Hùng');
    expect(getCharacterCategoryLabel('cute_chibi')).toBe('Đáng Yêu & Chibi');
    expect(getCharacterCategoryLabel('space_nature')).toBe('Vũ Trụ & Tự Nhiên');
    expect(getCharacterCategoryLabel('creative')).toBe('Sáng Tạo');
    expect(getCharacterCategoryLabel('all')).toBe('Tất cả');
  });

  it('xử lý an toàn khi category rỗng hoặc không xác định', () => {
    expect(getCharacterCategoryLabel(undefined)).toBe('Linh vật');
    expect(getCharacterCategoryLabel('')).toBe('Linh vật');
    expect(getCharacterCategoryLabel('unknown_type')).toBe('unknown type');
  });

  it('bốc nhân vật cố định theo seed nickname hoặc id', () => {
    const char1 = getCharacterBySeed('Bảo Nam');
    const char2 = getCharacterBySeed('Bảo Nam');
    expect(char1.id).toBe(char2.id);

    const charById = getCharacterBySeed(5);
    expect(charById.id).toBe(5);
  });

  it('kho avatar có đầy đủ dữ liệu ảnh và tên không bị rỗng', () => {
    expect(CHARACTER_AVATARS.length).toBeGreaterThan(40);
    CHARACTER_AVATARS.forEach((avatar) => {
      expect(avatar.name.trim().length).toBeGreaterThan(0);
      expect(avatar.url.trim().length).toBeGreaterThan(0);
      expect(avatar.type.trim().length).toBeGreaterThan(0);
    });
  });
});
