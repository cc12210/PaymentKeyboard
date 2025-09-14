/**
 * 将数字金额转换为带中文单位的字符串（支持到千万）
 * @param {number} amount - 需要转换的金额数字
 * @param {number} [decimalPlaces=2] - 保留的小数位数，默认为2位
 * @returns {string} 带中文单位的金额字符串
 */
export function formatCurrencyWithUnit(inputNumber: string, decimalPlaces = 2) {
  if (typeof inputNumber !== 'string' || isNaN(Number(inputNumber))) {
    return '';
  }
  const amount = Number(inputNumber);
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  let result = '';
  const units = [
    { threshold: 10000000, unit: '千万' },
    { threshold: 1000000, unit: '百万' },
    { threshold: 100000, unit: '十万' },
    { threshold: 10000, unit: '万' },
    { threshold: 1000, unit: '千' },
    // { threshold: 100, unit: '百' },
    // { threshold: 10, unit: '十' }
  ];
  let selectedUnit = '';
  let divisor = 1;

  for (const unitInfo of units) {
    if (absAmount >= unitInfo.threshold) {
      selectedUnit = unitInfo.unit;
      divisor = unitInfo.threshold;
      break;
    }
  }
  result = `${selectedUnit}`;
  if (isNegative) {
    result = `-${result}`;
  }

  return result;
}

interface IArrayToTree {
  id: number;
  name: string;
  parentId?: number;
}

export function arrayToTree(arr: IArrayToTree[]) {
  if (!arr.length) {
    return [];
  }
  const nodeMap = new Map();
  const roots = [];

  // 初始化节点
  for (const item of arr) {
    const newNode = {
      ...item,
      children: []
    };
    nodeMap.set(item.id, newNode);
  }
  for (const item of arr) {
    const currentNode = nodeMap.get(item.id);
    if (item.parentId !== null) {
      const parentNode = nodeMap.get(item.parentId);
      if (parentNode) {
        parentNode.children.push(currentNode);
      } else {
        roots.push(currentNode);
      }
    } else {
      roots.push(currentNode);
    }
  }
  return roots;
}

const arrTest: IArrayToTree[] = [
  { id: 1, name: "i1" },
  { id: 2, name: "i2", parentId: 1 },
  { id: 3, name: "i3", parentId: 2 },
  { id: 4, name: "i4", parentId: 3 },
  { id: 8, name: "i8", parentId: 7 },
  { id: 7, name: "i7" }
];
// 这个地方需要注意下，parentId为null的是根节点，根节点的parentId为undefined
// 语雀上的测试数据少了一个根节点，导致处理结果有问题，最后返回的时候也可以过滤一遍，或者不处理直接返回
const tree = arrayToTree(arrTest);
console.log("tree处理结果", tree);