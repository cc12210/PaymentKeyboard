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