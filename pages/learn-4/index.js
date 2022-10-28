// 储存副作用函数的桶
const bucket = new Set();

// 原始数据
const data = { text: "hello world" };
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 effect 添加到桶中
    bucket.add(effect);
    return target[key];
  },
  // 拦截设置作用
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal;
    // 将副作用函数从桶里取出来并执行
    bucket.forEach((fn) => fn());
    // 返回 true 代表设置成功
    return true;
  },
});

// 副作用函数
function effect() {
  document.body.innerHTML = obj.text;
}

// 执行副作用函数，触发读取
effect();

// 1 秒后修改响应式数据
setTimeout(() => {
  obj.text = "hello vue3";
}, 1000);
