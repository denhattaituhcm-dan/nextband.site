import { useEffect } from "react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  structuredData?: Record<string, unknown>;
}

const DEFAULT_DOMAIN = "https://nextband.site";
const DEFAULT_IMAGE = `${DEFAULT_DOMAIN}/logo.png`;

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  noIndex = false,
  breadcrumbs,
  faqs,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Dynamic Title
    const formattedTitle = title
      ? title.includes("NextBand")
        ? title
        : `${title} | NextBand IELTS`
      : "NextBand - Nền tảng Luyện thi IELTS Thông minh: Band 7.0+ cấp tốc";
    document.title = formattedTitle;

    // Helper: set or create meta tags
    const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // 2. Meta Description
    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }

    // 3. Meta Keywords
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }

    // 4. Meta Robots
    setMetaTag("name", "robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large");

    // 5. Canonical URL
    const resolvedCanonical =
      canonical ||
      (typeof window !== "undefined"
        ? `${DEFAULT_DOMAIN}${window.location.pathname.replace(/\/$/, "") || "/"}`
        : DEFAULT_DOMAIN);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", resolvedCanonical);

    // 6. Open Graph & Twitter Tags
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:url", resolvedCanonical);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", "NextBand IELTS");
    setMetaTag("property", "og:image", ogImage);

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:url", resolvedCanonical);
    setMetaTag("name", "twitter:image", ogImage);

    // 7. Inject JSON-LD Structured Data
    const injectedScripts: HTMLScriptElement[] = [];

    const addJsonLd = (data: Record<string, unknown>) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      injectedScripts.push(script);
    };

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      addJsonLd({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url.startsWith("http") ? item.url : `${DEFAULT_DOMAIN}${item.url}`,
        })),
      });
    }

    // FAQPage Schema
    if (faqs && faqs.length > 0) {
      addJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }

    // Custom structured data
    if (structuredData) {
      addJsonLd(structuredData);
    }

    // Cleanup injected JSON-LD scripts on component unmount
    return () => {
      injectedScripts.forEach((s) => {
        if (s.parentNode) {
          s.parentNode.removeChild(s);
        }
      });
    };
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    noIndex,
    breadcrumbs,
    faqs,
    structuredData,
  ]);

  return null;
}
