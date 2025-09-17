var url = "https: //zhidao.baidu.com/question/1768422895052400180.html?fr=iks&word=slice&ie=gbk"

const getUrl = (url: string) => {
  if (!url) return
  const urlSplit = url.split('?')[1]
  const paramsList = urlSplit.split('&')
  const paramsObj: any = {}
  paramsList.forEach(item => {
    const itemSplit = item.split('=')
    paramsObj[itemSplit[0]] = itemSplit[1]
  })
  return paramsObj
}

console.log(getUrl(url))




const debounce = (fn: Function, delay: number) => {
  let timer: number;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}

const throttle = (fn: Function, seconds: number) => {
  let startTime = 0;
  return function () {
    const nowTime = new Date().getTime();
    const waitTime = seconds - (nowTime - startTime);
    if (waitTime <= 0) {
      fn()
      startTime = nowTime
    }
  }
}


const flatArr = (arr: any) => {
  let flatList: any = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatList = flatList.concat(flatArr(arr[i]))
    } else {
      flatList.push(arr[i])
    }
  }
  return flatArr
}


const copyDebounce = (fn, delay) => {
  let timer;
  return function () {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn();
    }, delay);
  }
}

const copyThrottle = (fn, seconds) => {
  let startTime = 0;
  return function () {
    let nowTime = new Date().getTime();
    let waitTime = seconds - nowTime - startTime;
    if (waitTime <= 0) {
      fn()
      startTime = nowTime
    }
  }
}

const arrCopy = [1, 1, 2, 3, 3, 4]
const setArr = (arr) => {
  return [...new Set(arr)]
}

console.log(setArr(arrCopy))


//假设一个数组已经排好序了，现在要在数组里找一个数flag的位置。
//首先先找到长度中间位置，通过与中间位置的数比较，比中间值大在右边找，
//比中间值小在左边找。然后再在两边各自寻找中间值，持续进行，直到找到全部位置。

var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  //[left,right]，相等时能取到，有意义
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;

};
console.log(search([-1, 0, 3, 5, 9, 12], 2))//-1
console.log(search([-1, 0, 3, 5, 9, 12], 3))//4


function bubbleSort(arr: any[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j + 1];
        arr[j + 1] = arr[j]
        arr[j] = tmp
      }
    }
  }
  return arr
}

const flatArrList = (arr) => {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = [...newArr, ...flatArrList(arr[i])]
    } else {
      newArr = newArr.push(arr[i])
    }
  }
  return newArr;
}

//插入排序的思路：从第一个元素开始，该元素可认为已经被排序，取出下一个元素
//在已经排序的元素序列中从后向前扫描，如果该元素（已排序）大于新元素，将该元素移到
//下一位置，重复上一个步骤，直到找到已排序的元素小于或者等于新元素的位置，将新元
//素插入到该位置后，重复上面的步骤
function insertSort(arr) {
  //外层循环：从第1个位置开始获取数据，向前面局部有序进行插入
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i];
    var j = i;
    //内层循环：获取i位置的元素，和前面的数据依次进行比较
    while (arr[j - 1] > temp && j > 0) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = temp;
  }
}
//平均时间复杂度：O(n^2)
//空间复杂度：O(1)


//相当于冒泡排序的升级版
//快速排序可以在一次循环中，找出某个元素的正确位置，并且该元素之后不需要任何移动
//快速排序最重要的思想是分而治之
//利用二分查找对冒泡排序的改进，选一个元素作为基准，把数字分为两部分，
//一部分全部比它小，一部分全部比它大，然后递归调用，在两部分都进行快排。
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  //取出中间位置的元素
  let middle = Math.floor(arr.length / 2);
  let flag = arr.splice(middle, 1)[0]//删除中间这个元素，返回的是一个数组
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < flag) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([flag], quickSort(right));
}
