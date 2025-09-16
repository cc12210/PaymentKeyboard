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