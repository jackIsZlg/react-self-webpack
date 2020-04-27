import * as type from './action-type';

// 增加计数
export const addCount = () => {
  return {
    type: type.AddCount,
  }
}

// 增加额外参数计数
export const addExact = parmas => {
  return {
    type: type.AddExact,
    parmas,
  }
}

// 减少参数
export const delCount = () => {
  return {
    type: type.DelCount,
  }
}

// 减少参数
export const delExact = parmas => {
    return {
        type: type.DelExact,
        parmas
    }
}


// 添加Item
export const addItem = text => {
    return {
        type: type.AddItem,
        text
    }
}


// 展示Item
export const showTrue = () => {
    return {
        type: type.ShowTrue,
    }
}



