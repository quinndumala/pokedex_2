// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Applied to every Showdown GIF’s intrinsic size before max-box clamping.
export const SHOWDOWN_SPRITE_UNIFORM_SCALE = 2.75;

export function computeUniformScaledSpriteDimensions(
  naturalWidth: number,
  naturalHeight: number,
  options: {
    uniformScale: number;
    maxWidth: number;
    maxHeight: number;
  }
): { width: number; height: number } {
  const { uniformScale, maxWidth, maxHeight } = options;
  let w = naturalWidth * uniformScale;
  let h = naturalHeight * uniformScale;
  if (w > maxWidth || h > maxHeight) {
    const factor = Math.min(maxWidth / w, maxHeight / h);
    w *= factor;
    h *= factor;
  }
  return {
    width: Math.max(1, Math.round(w)),
    height: Math.max(1, Math.round(h)),
  };
}
