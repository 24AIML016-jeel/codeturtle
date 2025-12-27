export function startViewTransition(callback: () => void): ViewTransition | void {
  if ('startViewTransition' in document) {
    return (document as Document & {
      startViewTransition: (callback: () => void) => ViewTransition
    }).startViewTransition(callback);
  } else {
    callback();
  }
}