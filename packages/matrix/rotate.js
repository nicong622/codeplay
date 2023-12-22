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

  思路：
  从矩阵的最外一圈开始，把一圈元素旋转 90 度。之后向内收缩一圈继续旋转，直到变成一阶矩阵。
  旋转过程：
  1. 先把第一行元素复制出来作为备份；
  2. 把第一列元素逐个移动到第一行，即把第一列第一个元素，移动到第一行最后一个，然后第一列第二个元素，移动到第一行倒数第二个，以此类推；
  3. 把最后一行元素移动到第一列；
  4. 把最后一列元素移动到最后一行。
  5. 把步骤 1 复制出来的第一行元素再移动到最后一列。
*/

function rotate(matrix, start=0, end=matrix.length-1) {
  if (matrix.length < 2) return matrix

  // 步骤 1
  const cache = matrix[start].slice(start, end+1)

  // 步骤 2
  for(let colI = end; colI >= start; colI--) {
    matrix[start][colI] = matrix[end-colI+start][start]
  }

  // 步骤 3
  for(let rowI = start; rowI <= end; rowI++) {
    matrix[rowI][start] = matrix[end][rowI]
  }

  // 步骤 4
  for(let colI = start; colI <= end; colI++) {
    matrix[end][colI] = matrix[end-colI+start][end]
  }

  // 步骤 5
  for(let rowI = end; rowI >= start; rowI--) {
    matrix[rowI][end] = cache[rowI-start]
  }

  if (end - start > 2) {
    rotate(matrix, start + 1, end - 1)
  }

  return matrix
}

module.exports = rotate