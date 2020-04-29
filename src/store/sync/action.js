import * as type from './action-type';

// 增加计数
export const addCount = () => ({
    type: type.AddCount,
});

// 增加额外参数计数
export const addExact = parmas => ({
    type: type.AddExact,
    parmas,
});

// 减少参数
export const delCount = () => ({
    type: type.DelCount,
});

// 减少参数
export const delExact = parmas => ({
    type: type.DelExact,
    parmas
});


// 添加Item
export const addItem = text => ({
    type: type.AddItem,
    text
});


// 展示Item
export const showTrue = () => ({
    type: type.ShowTrue,
});
