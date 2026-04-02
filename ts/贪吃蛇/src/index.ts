import './style/index.less';

class Food{
    element: HTMLElement;
    constructor(){
        // 获取页面中的food元素，并赋值给element，加!是为了不报错，告诉他我知道这个错误
        this.element = document.getElementById("food")!;
    }
}
