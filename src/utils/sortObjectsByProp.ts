export function sortObjectsByProp(
  objectsArr: any,
  prop: string,
  ascending = true,
) {
  const objectsHaveProp: any = objectsArr.every((object) =>
    object.hasOwnProperty(prop),
  );
  if (objectsHaveProp) {
    const newObjectsArr: any = objectsArr.slice();
    newObjectsArr.sort((a, b) => {
      if (isNaN(Number(a[prop]))) {
        const textA = a[prop].toUpperCase(),
          textB = b[prop].toUpperCase();
        if (ascending) {
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        } else {
          return textB < textA ? -1 : textB > textA ? 1 : 0;
        }
      } else {
        return ascending ? a[prop] - b[prop] : b[prop] - a[prop];
      }
    });
    return newObjectsArr;
  }
  return objectsArr;
}
