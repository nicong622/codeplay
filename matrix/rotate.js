/*
  题目：给定一个 NxN 的二维数组，把矩阵顺时针旋转 90 度，不能借助另一个矩阵

  示例：
  [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]

  旋转后为：
  [
    [7,4,1],
    [8,5,2],
    [9,6,3]
  ]
*/

function rotate(matrix, start=0, end=matrix.length-1) {
  const cache = matrix[start].slice(start, end+1)

  for(let colI = end; colI >= start; colI--) {
    matrix[start][colI] = matrix[end-colI+start][start]
  }
  // console.log('1\n', matrix);

  for(let rowI = start; rowI <= end; rowI++) {
    matrix[rowI][start] = matrix[end][rowI]
  }
  // console.log('2\n', matrix);

  for(let colI = start; colI <= end; colI++) {
    matrix[end][colI] = matrix[end-colI+start][end]
  }
  // console.log('3\n', matrix);

  for(let rowI = end; rowI >= start; rowI--) {
    matrix[rowI][end] = cache[rowI-start]
  }
  // console.log('4\n', matrix);

  if (end - start > 2) {
    rotate(matrix, start + 1, end - 1)
  }

  return matrix
}

module.exports = rotate