export default function () {
    return {
        code: 200,
        msg: "请求成功",
        data:  [
            {
                icon: "icon-book",
                title: "图书总数",
                number: 0,
                color: "#0AF1A6"
            },
            {
                icon: "icon-person",
                title: "用户数量",
                number: 0,
                color: "#0AF132"
            },
            {
                icon: "icon-shiwujieyue",
                title: "借阅数量",
                number: 0,
                color: "#0BEAF3"
            },
            {
                icon: "icon-weiyue",
                title: "违约数量",
                number: 0,
                color: "#CBF309"
            },
            {
                icon: "icon-error",
                title: "异常图书",
                number: 0,
                color: "#F3A609"
            },
            {
                icon: "icon-fengjin",
                title: "封禁用户",
                number: 0,
                color: "#FF5733"
            },
        ]
    }
}
