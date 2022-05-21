$(function () {
    const form = layui.form;
    //! 自定义昵称校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });


    const layer = layui.layer;
    //! 获取用户信息
    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: (res) => {
                if (res.status !== 0) return layer.msg("获取用户信息失败！");
                layer.msg("获取用户信息成功！")
                console.log(res);
                // 调用 form.val() 方法为表单赋值
                form.val("formUserInfo", res.data);
            },
        });
    };

    //!别忘记调用函数
    initUserInfo();


    //用户点击了重置按钮后，表单里面的内容应该被重置
    //阻止表单的默认重置行为
    //重新调用 initUserInfo() 函数，重新获取用户信息
    // 重置表单数据
    $("#btnReset").click((e) => {
        e.preventDefault();
        initUserInfo()
    });


    //! 更新提交用户数据
    $(".layui-form").on("submit", (e) => {
        //阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(), //!利用 $(this).serialize() 获取表单数据
            success: (res) => {
                if (res.status !== 0) return layer.msg("更新用户信息失败！");
                layer.msg("更新用户信息成功！");
                // 调用父页(上一级页面的函数)面渲染函数
                window.parent.getUserInfo();
            },
        });
    });
})