export type Frame = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Fit the photo inside the camera stage without a cover crop.
 * The same rectangle is used for the image and the skeleton, so joints
 * stay on the body when the phone width changes.
 */
export function frameForPhoto(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
): Frame {
  if (containerWidth <= 0 || containerHeight <= 0 || imageWidth <= 0 || imageHeight <= 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  const aspect = imageWidth / imageHeight;
  let width = containerWidth;
  let height = width / aspect;
  if (height > containerHeight) {
    height = containerHeight;
    width = height * aspect;
  }

  return {
    x: (containerWidth - width) / 2,
    y: (containerHeight - height) / 2,
    width,
    height,
  };
}
