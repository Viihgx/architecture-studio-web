export type Locale = "pt" | "en";

export function withLocale(path: string, locale: Locale) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (cleanPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${cleanPath}`;
}
