$(function () {
    // 调用 getUserInfo 函数获取用户基本信息
    getUserInfo();


    //! 获取 layui 弹窗
    const layer = layui.layer;


    //! 退出登录
    $("#btnLogout").click(() => {
        layui.layer.confirm(
            "确定退出登录？", {
                icon: 3,
                title: ""
            },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = "/login.html";
            }
        );
    });
})


//! 把getUserInfo函数写到立刻执行函数外面，方便下面的页面调用，写在立即执行函数里面，调用不到，它没挂载在window全局

//! 获取 layui 弹窗
const layer = layui.layer;

//! 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token"), //!获取本地存储的token，因为再baseAPI里面已经设置了请求拦截器，这里就不用了
        // },
        success: (res) => {
            if (res.status !== 0) return layer.msg("数据获取失败！");
            console.log(res);
            layer.msg("数据获取成功！")
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },

        //控制用户的访问权限
        //用户如果没有登录，是否能够允许用户访问后台主页？肯定是不能的，所以我们需要进行权限的校验，可以利用请求后服务器返回的状态来决定
        //在调用有权限接口的时候，指定 complete 回调函数，这个回调函数不管成功还是失败都会调用
        //在回调里面判断 服务器返回的的状态是否等于 1，并且错误的信息是  "身份认证失败"，如果成立，那么就强制用户跳转到登录页
        //! 不论成功还是失败，最终都会调用 complete 回调函数,将权限控制的代码，从每个请求中，抽离到 ajaxPrefilter 中,利用 options 来挂在统一的 complete 函数
        // complete: (res) => {
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //  强制清空 token
        //         localStorage.removeItem("token");
        // 强制跳转到登录页面
        //         location.href = "/login.html"
        //     }
        // },
    });
};

//! 渲染用户头像
const renderAvatar = (user) => {
    // 获取用户名字
    let name = user.nickname || user.username; //有昵称优先使用昵称
    // 设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show(); //有图像就渲染图像，user_pic是用户头像
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase(); //没有头像就渲染名字首字母，并且大写
        $(".text-avatar").html(firstName);
    }
};