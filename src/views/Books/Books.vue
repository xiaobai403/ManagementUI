<template>
    <div class="books-header">
        <div class="search">
            <el-input
                v-model="search.searchInfo"
                placeholder="请输入查询条件"
                class="input-with-select"
                size="large"
                style="width: 500px"
            >
                <template #prepend>
                    <el-select v-model="search.condition"
                               style="width: 110px">
                        <el-option label="ISBN" value="ISBN"/>
                        <el-option label="书名" value="bookName"/>
                        <el-option label="作者" value="author"/>
                        <el-option label="出版社" value="publisher"/>
                    </el-select>
                </template>
                <template #append>
                    <el-button size="large" @click="searchBooks">
                        <span class="iconfont icon-search"/>
                    </el-button>
                </template>

            </el-input>

        </div>

    </div>
    <div class="books-table">
        <el-table :data="books"
                  stripe
                  border
                  v-loading="searchLoading"
                  style="width: 100%">
            <el-table-column type="expand">
                <template #default="props">
                    <div class="details-container">
                        <div class="details-info">
                            <div>
                                <span>ISBN: </span>
                                <span>{{ props.row.isbn }}</span>
                            </div>
                            <div>
                                <span>书名: </span>
                                <span>{{ props.row.name }}</span>
                            </div>
                            <div>
                                <span>作者: </span>
                                <span>{{ props.row.author }}</span>
                            </div>
                            <div>
                                <span>出版社: </span>
                                <span>{{ props.row.publisher }}</span>
                            </div>
                            <div>
                                <span>关键字: </span>
                                <span>{{ props.row.keywords }}</span>
                            </div>
                            <div>
                                <span>类别: </span>
                                <span>{{ props.row.category }}</span>
                            </div>
                            <div>
                                <span>数量: </span>
                                <span>{{ props.row.number }}</span>
                            </div>
                            <div>
                                <span>是否可借: </span>
                                <span>{{ props.row.borrowStatus }}</span>
                            </div>
                        </div>
                    </div>

                </template>
            </el-table-column>
            <el-table-column label="ISBN" prop="isbn"/>
            <el-table-column label="书名" prop="name"/>
            <el-table-column label="作者" prop="author"/>
            <el-table-column label="数量" prop="number"/>
            <el-table-column label="是否可借" prop="borrowStatus"/>
            <el-table-column fixed="right" label="操作" prop="status">
                <template #default="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button
                        type="danger"
                        plain
                        size="small"
                        :loading="scope.row.deleteLoading"
                        @click="deleteBooks(scope.row.isbn, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, reactive, ref, toRaw} from "vue";
import {
    reqDeleteBooks,
    reqSearchBooksByAuthor,
    reqSearchBooksByBookName,
    reqSearchBooksByISBN,
    reqSearchBooksByPublisher
} from "@/api";
import {
    handleErrorReactive,
    handleErrorRef,
    handleRequestOneAttributeFun,
    handleRequestRefFun
} from "@/hook/message/handleResponseMessage";
import {useRouter} from "vue-router";
import {useBook} from "@/store/useBook";
import PubSub from "pubsub-js";
import {REFRESH_BOOKS_INFO} from "@/pattern/eventTypes";

// 搜索
const books = ref([])

const search = reactive({
    condition: "ISBN",
    searchInfo: ""
})

const handleSearchResponse = (books, response) => {
    // 向数组中的每一个对象身上添加loading标志位
    const data = response.data.map(i => {
        i['deleteLoading'] = false
        return i
    })

    books.value = data
}

const searchLoading = ref(false)

const searchBooks = () => {
    searchLoading.value = true
    switch (search.condition) {
        case 'ISBN':
            reqSearchBooksByISBN(search.searchInfo)
                .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [books, response]),
                    error => handleErrorRef(error, searchLoading))
            break
        case 'bookName':
            reqSearchBooksByBookName(search.searchInfo)
                .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [books, response]),
                    error => handleErrorRef(error, searchLoading))
            break
        case 'author':
            reqSearchBooksByAuthor(search.searchInfo)
                .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [books, response]),
                    error => handleErrorRef(error, searchLoading))
            break
        case 'publisher':
            reqSearchBooksByPublisher(search.searchInfo)
                .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [books, response]),
                    error => handleErrorRef(error, searchLoading))
            break
    }
}


// 删除id部分
const deleteBookFromTable = (books, isbn) => {
    books.value = toRaw(books.value).filter(i => i.isbn !== isbn)
}

const deleteBooks = (isbn, currentBook) => {
    currentBook.deleteLoading = true
    reqDeleteBooks(isbn).then(response =>
            handleRequestOneAttributeFun(response, currentBook, "deleteLoading", deleteBookFromTable, [books, isbn]),
            error => handleErrorReactive(error, currentBook, "deleteLoading"))
}

// 跳转到详情页面
const store = useBook()
const router = useRouter()

const handleEdit = (row) => {
    Object.assign(store.book, row)
    router.push({
        name: 'bookDetails',
        params: {
            isbn: row.isbn
        }
    })
}

// 生命周期钩子函数
let refreshInfoToken = ""
onMounted(() => {
    refreshInfoToken = PubSub.subscribe(REFRESH_BOOKS_INFO, searchBooks)
})

onBeforeUnmount(() => {
    PubSub.unsubscribe(refreshInfoToken)
})


</script>

<style scoped lang="less">
.books-header {
    display: flex;

    .search {
        margin-left: auto;
    }
}

.books-table {
    margin-top: 30px;

    .details-container {
        padding: 20px 0;
        margin-left: 60px;

        .details-info {
            display: grid;
            grid-template-columns: 350px 350px;
            grid-template-rows: repeat(20px 4);
            row-gap: 10px;
            margin-top: 20px;
            margin-left: 10px;

            div {
                display: flex;
                gap: 20px;

                span {
                    color: rgb(0, 0, 0);
                    font-family: Noto Sans SC;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 21px;
                    letter-spacing: 0;
                    text-align: left;
                }
            }
        }
    }
}
</style>
