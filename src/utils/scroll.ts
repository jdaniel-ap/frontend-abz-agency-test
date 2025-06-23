/**
 * Scrolls smoothly to a target element by ID
 * @param targetId - The ID of the target element (without #)
 * @param offset - Optional offset from the top (default: 80px for header)
 */
export const scrollToElement = (targetId: string, offset: number = 80) => {
  const element = document.getElementById(targetId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
