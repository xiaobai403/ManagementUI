export default async function () {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })

    return {
        code: 200,
        msg: "请求成功",
        data: null
    }
}
