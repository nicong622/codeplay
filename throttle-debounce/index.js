function debounce(fn, delay) {
  let timeout = null;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let canRun = true;
  let params = undefined;

  return function (...args) {
    params = args;

    if (!canRun) return;

    canRun = false;
    setTimeout(() => {
      canRun = true;
      fn.apply(this, params);
    }, delay);
  };
}
