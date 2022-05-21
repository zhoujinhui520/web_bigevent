//导入 form 模块
//利用 form.verify()  来定义规则
//长度必须是6到12位
//不能与旧密码一致
//两次密码是否相同
//在对应的表单元素中，利用 lay-verify 来设置自定义校验规则

$(function () {
    const form = layui.form;

    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: (val) => {
            if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
        },
        rePwd: (val) => {
            if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
        },
    });



    //给form表单绑定 submit 事件，在事件处理函数里面取消默认行为
    //查阅接口文档，利用 $.ajax() 来发送 post 请求
    //利用 $(this).serialize() 来设置提交的数据
    //如果 服务器返回的 status 不等于0，说明失败，利用 layui.layer.msg 来进行提示
    //如果更新成功，重置一下表单内容
    const layer = layui.layer;

    // 发送请求，重置密码
    $(".layui-form").on("submit", (e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(".layui-form").serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("更新密码失败！");
                layer.msg("更新密码成功！");
                //退出到登入界面
                localStorage.removeItem('token')
                window.parent.location.href = "/login.html"
            },
        });
    });

})