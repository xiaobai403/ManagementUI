export default function () {
    const data = []

    for (let i = 0; i < 10; i++) {
        const book = {}
        book.isbn = i
        book.name = i
        book.author = i
        book.publisher = i
        book.keywords = i
        book.category = i
        book.number = i
        book.borrowStatus = true

        data.push(book)

    }

    console.log(data)

    return {
        code: 200,
        msg: "请求成功",
        data
    }
}
