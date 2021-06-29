export function goToPricing() {
  const goToPricingBlock = document.querySelector(".pricing");
  if (goToPricingBlock) {
    window.scrollTo({
      top: goToPricingBlock.offsetTop,
      behavior: "smooth",
    });
  }
}
