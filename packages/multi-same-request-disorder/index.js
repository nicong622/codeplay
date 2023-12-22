// 模拟网络请求
function api(data, delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay, data);
  });
}

function request(data, delay) {
  return api(data, delay);
}

function wrap(handler, cb) {
  let flag;

  return (...args) => {
    let local = (flag = Math.random());

    handler(...args).then((res) => {
      if (local === flag) {
        cb(res);
      }
    });
  };
}

const req = wrap(request, console.log);

req(1, 200);
req(2, 100);
