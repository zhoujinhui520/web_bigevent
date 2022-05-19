$(function () {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $('#link_reg').click(() => {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录让 注册框隐藏，登录框显示
    $('#link_login').click(() => {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //! 获取 form
    const form = layui.form
    //! 获取 layui 弹窗
    const layer = layui.layer;

    //定义表单验证规则
    form.verify({
        //!定义一个叫pwd 的密码校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

        //!校验两次密码是否一致
        repwd: (val) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $(".reg-box [name=password").val();
            if (val !== pwd) return "两次密码不一致"
        },
    })

    //! 设置请求根路径,已经有请求拦截器了，所有这边就不需要了
    // const baseUrl = "http://www.liulongbin.top:3007";

    //! 监听注册表单，发送注册请求
    $('#form_reg').on('submit', function (e) {
        // 阻止form表单默认提交行为
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg('注册失败')
                layer.msg("注册成功")
                //注册成功后跳转到登入界面
                $('#link_login').click();
            }

        })
    })

    //! 监听登入表单，发送登入请求
    $('#form_login').on('submit', function (e) {
        // 阻止form表单默认提交行为
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url:"/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('登入失败')
                layer.msg("登入成功")

                //! 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token", res.token);
                //! 跳转到主页
                location.href = "/index.html";
            }

        })
    })
})