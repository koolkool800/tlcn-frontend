export const $$ = (name: string) => {
  return document.querySelectorAll(name);
};
export const $ = (name: string) => {
  return document.querySelector(name);
};

export const $element = (element: any, value: string) => {
  return element?.querySelector(value);
};

/** reset effect brightness */

export const handleResetBrightness = () => {
  const gElements = $$('g[id="Group"] > g');
  gElements.forEach((element: any) => {
    element.style.opacity = '1';
  });
};

/**
 * handle for click item in map
 *
 */
export const handleOnClickItem = (event: any, gElements: any) => {
  const gElement = event.currentTarget;
  gElements.forEach((element: any) => {
    if (element.getAttribute('id') === gElement.getAttribute('id')) {
      element.style.opacity = '1';
    } else {
      element.style.opacity = '0,2';
    }
  });
  return gElement.getAttribute('id');
};

export const handleActiveItemMap = (classId?: string) => {
  const gElements = $$('g[id="Group"] > g');
  gElements.forEach((element: any) => {
    if (element.getAttribute('id') === classId) {
      element.style.opacity = '1';
    } else {
      element.style.opacity = '0.2';
    }
  });
};

export const resetColorInMap = (elements: Element[]) => {
  elements.forEach((element) => {
    (element as HTMLElement).style.fill = 'white';
  });
};

/** change color item on map */
export const changeColorItem = (element: Element, color?: string) => {
  (element as HTMLElement).style.fill = color || 'white';
};

export const getColorAndGroupIdFromArray = (arrayOfObjects: any) => {
  const result: any = {};
  for (const obj of arrayOfObjects) {
    const { groupId } = obj;
    result[groupId] = {
      color: obj.color,
      groupId: obj.groupId,
    };
  }
  return result;
};

export const addInitialColorIntoMap = (initialColors: any, elements: any) => {
  elements.forEach((element: any) => {
    $element(element, ':first-child').style.fill = 'inherit';
    $element(element, ':last-child').style.fill = 'inherit';
    element.style.fill =
      initialColors[element.getAttribute('id')]?.color || 'white';
  });
};
