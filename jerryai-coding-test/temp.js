const reg = RegExp('(1+)', 'gd');
const str1 = '010110111';

let result;

while ((result = reg.exec(str1)) !== null) {
  console.log(result);
}
