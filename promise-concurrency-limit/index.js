// 限制同一时间的请求数

function promiseConcurrencyLimit(limit, tasks) {
  let i = 0;

  while (i++ < limit && tasks.length) {
    const task = tasks.shift();
    task().then(() => {
      promiseConcurrencyLimit(1, tasks);
    });
  }
}

const task = (id, timeout) => () =>
  new Promise((resolve) => {
    console.log(`task ${id} start`);

    setTimeout(() => {
      console.log(`task ${id} end`);
      resolve();
    }, timeout);
  });

const tasks = [
  task(1, 1500),
  task(2, 1000),
  task(3, 500),
  task(4, 2000),
  task(5, 2500),
  task(6, 3000),
];

promiseConcurrencyLimit(3, tasks);
