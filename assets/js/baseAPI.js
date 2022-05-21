// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// 请求拦截器
$.ajaxPrefilter((option) => {
    //! 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    option.url = `http://www.liulongbin.top:3007` + option.url;

    //! 统一为有权限的接口，设置 headers 请求头
    if (option.url.includes("/my/")) { // includes 返回是ture和flase
        option.headers = {
            Authorization: localStorage.getItem("token"),
        };
    }

    //目前有一个问题，每一个权限的请求难道都需要去判断一次 complete的逻辑代码吗？借助统一设置请求根路径和请求头的思路，我们也可以统一来设置 complete 函数
    //将权限控制的代码，从每个请求中，抽离到 ajaxPrefilter 中
    //利用 options 来挂在统一的 complete 函数

    option.complete = (res) => {
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //  强制清空 token
            localStorage.removeItem("token");
            // 强制跳转到登录页面
            location.href = "/login.html"
        }
    }
});