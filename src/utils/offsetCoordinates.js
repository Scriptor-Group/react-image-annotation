export const getRealCoordinates = e => {
  const rect = e.currentTarget.getBoundingClientRect();

  if (isTouchEvent(e)) {
    if (isValidTouchEvent(e)) {
      isTouchMoveEvent(e) && e.preventDefault()
      const touch = e.targetTouches[0]
      const offsetX = touch.clientX - rect.x;
      const offsetY = touch.clientY - rect.y;

      return {
        x: offsetX,
        y: offsetY,
        width: rect.width,
        height: rect.height,
      }
    } else {
      return {
        x: 0,
        y: 0,
        width: rect.width,
        height: rect.height,
      }
    }
  } else {
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;

    return {
      x: offsetX,
      y: offsetY,
      width: rect.width,
      height: rect.height,
    };
  }
}

export const getMouseRelativeCoordinates = e => {
  // nativeEvent.offsetX gives inconsistent results when dragging
  // up and to the left rather than the more natural down and to the
  // right. The reason could be browser implementation (it is still experimental)
  // or it could be that nativeEvent offsets are based on target rather than
  // currentTarget.
  // To keep consistent behavior of the selector use the bounding client rect.
  const rect = e.currentTarget.getBoundingClientRect();
  const offsetX = e.clientX - rect.x;
  const offsetY = e.clientY - rect.y;

  return {
    x: offsetX / rect.width * 100,
    y: offsetY / rect.height * 100
  };
}

const clamp = (a, b, i) => Math.max(a, Math.min(b, i))
const getTouchRelativeCoordinates = e => {
  const touch = e.targetTouches[0]

  const boundingRect = e.currentTarget.getBoundingClientRect()
  // https://idiallo.com/javascript/element-postion
  // https://stackoverflow.com/questions/25630035/javascript-getboundingclientrect-changes-while-scrolling
  const offsetX = touch.clientX - boundingRect.left
  const offsetY = touch.clientY - (boundingRect.top + window.scrollY)

  return {
    x: clamp(0, 100, (offsetX / boundingRect.width) * 100),
    y: clamp(0, 100, (offsetY / boundingRect.height) * 100)
  }
}

const getCoordPercentage = (e) => {
  if (isTouchEvent(e)) {
    if (isValidTouchEvent(e)) {
      isTouchMoveEvent(e) && e.preventDefault()
      return getTouchRelativeCoordinates(e)
    } else {
      return {
        x: null
      }
    }
  } else {
    return getMouseRelativeCoordinates(e)
  }
}

const isTouchEvent = e => e.targetTouches !== undefined
const isValidTouchEvent = e => e.targetTouches.length === 1
const isTouchMoveEvent = e => e.type === 'touchmove'

export { getMouseRelativeCoordinates as getOffsetCoordPercentage, getCoordPercentage };
