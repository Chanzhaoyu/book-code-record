// const VNode = {
//   tag: "div",
//   props: {
//     onClick: () => alert("hello"),
//   },
//   children: [{ tag: "span", children: "hello world" }],
// };

const MyComponent = {
  render() {
    return {
      tag: "button",
      props: {
        onClick: () => alert("hello"),
      },
      children: "click me",
    };
  },
};

const VNode = {
  tag: MyComponent,
};

function renderer(VNode, container) {
  if (typeof VNode.tag === "string") {
    // 说明 VNode 是一个原生标签
    mountElement(VNode, container);
  } else if(typeof VNode.tag === 'object') { // 如果是对象，说明 VNode 描述的是组件
    // 说明 VNode 是一个组件
    mountComponent(VNode, container);
  }
}

function mountElement(VNode, container) {
  // 使用 tag 作为标签名称创建元素 DOM 元素
  const el = document.createElement(VNode.tag);
  // 遍历 props 将属性、事件添加到 DOM 元素上
  for (const key in VNode.props) {
    if (/^on/.test(key)) {
      // 如果 key 以 on 开头，说明它是事件
      el.addEventListener(
        key.slice(2).toLowerCase(), // 事件名 onClick ---> click
        VNode.props[key] // 事件处理函数
      );
    }
  }

  // 处理 children
  if (typeof VNode.children === "string") {
    // 如果 children 是字符串，说明它是元素的文本子节点
    el.appendChild(document.createTextNode(VNode.children));
  } else if (Array.isArray(VNode.children)) {
    // 递归地调用 renderer 函数渲染子节点，使用当前元素 el 作为挂载点
    VNode.children.forEach((child) => renderer(child, el));
  }

  // 将元素添加到挂载点下
  container.appendChild(el);
}

function mountComponent(VNode, container) {
  // 调用组件函数，获取组件要渲染的内容 （虚拟 DOM）
  const subtree = VNode.tag.render();
  // 递归调用 renderer 函数渲染组件内容
  renderer(subtree, container);
}

renderer(VNode, document.getElementById("app"));
