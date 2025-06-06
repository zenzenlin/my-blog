/**
 * SEO 驗證工具
 * 提供 SEO 相關的驗證和檢查功能
 */

interface SEOValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  suggestions: string[];
}

export const useSEOValidation = () => {
  const validateTitle = (title?: string): SEOValidationResult => {
    const warnings: string[] = [];
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (!title) {
      errors.push("標題不能為空");
    } else {
      if (title.length < 30) {
        warnings.push("標題太短，建議至少 30 個字符");
      }
      if (title.length > 60) {
        warnings.push("標題太長，可能在搜尋結果中被截斷");
      }
      if (!title.includes("|") && !title.includes("-")) {
        suggestions.push("考慮在標題中加入品牌名稱");
      }
    }

    return {
      isValid: errors.length === 0,
      warnings,
      errors,
      suggestions,
    };
  };

  const validateDescription = (description?: string): SEOValidationResult => {
    const warnings: string[] = [];
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (!description) {
      errors.push("描述不能為空");
    } else {
      if (description.length < 120) {
        warnings.push("描述太短，建議至少 120 個字符");
      }
      if (description.length > 160) {
        warnings.push("描述太長，可能在搜尋結果中被截斷");
      }
    }

    return {
      isValid: errors.length === 0,
      warnings,
      errors,
      suggestions,
    };
  };

  const validateImage = (imageUrl?: string): SEOValidationResult => {
    const warnings: string[] = [];
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (!imageUrl) {
      warnings.push("缺少 OG 圖片");
    } else {
      if (!imageUrl.startsWith("http")) {
        errors.push("圖片 URL 必須是完整的 HTTP(S) 路徑");
      }
      if (!imageUrl.includes("1200x630") && !imageUrl.includes("og-image")) {
        suggestions.push("建議使用 1200x630 尺寸的 OG 圖片");
      }
    }

    return {
      isValid: errors.length === 0,
      warnings,
      errors,
      suggestions,
    };
  };

  const validateKeywords = (keywords?: string[]): SEOValidationResult => {
    const warnings: string[] = [];
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (!keywords || keywords.length === 0) {
      warnings.push("缺少關鍵字");
    } else {
      if (keywords.length > 10) {
        warnings.push("關鍵字太多，建議控制在 10 個以內");
      }
      if (keywords.length < 3) {
        suggestions.push("建議至少添加 3 個相關關鍵字");
      }
    }

    return {
      isValid: true, // 關鍵字不是必需的
      warnings,
      errors,
      suggestions,
    };
  };

  const validateFullPage = (data: {
    title?: string;
    description?: string;
    image?: string;
    keywords?: string[];
    url?: string;
  }): SEOValidationResult => {
    const titleResult = validateTitle(data.title);
    const descResult = validateDescription(data.description);
    const imageResult = validateImage(data.image);
    const keywordsResult = validateKeywords(data.keywords);

    return {
      isValid: titleResult.isValid && descResult.isValid && imageResult.isValid,
      warnings: [
        ...titleResult.warnings,
        ...descResult.warnings,
        ...imageResult.warnings,
        ...keywordsResult.warnings,
      ],
      errors: [
        ...titleResult.errors,
        ...descResult.errors,
        ...imageResult.errors,
        ...keywordsResult.errors,
      ],
      suggestions: [
        ...titleResult.suggestions,
        ...descResult.suggestions,
        ...imageResult.suggestions,
        ...keywordsResult.suggestions,
      ],
    };
  };

  return {
    validateTitle,
    validateDescription,
    validateImage,
    validateKeywords,
    validateFullPage,
  };
};
