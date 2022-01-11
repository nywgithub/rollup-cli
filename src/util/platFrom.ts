import isMobile from "is-mobile";

export const isMobilePlatform = isMobile();

export const isDesktopPlatform = !isMobilePlatform;
