<template>
    <el-page-header content="用户信息" @back="goBack"/>
    <div class="bookInfoContainer">
        <el-form
            ref="formRef"
            :model="book"
            label-width="80px"
            class="bookInfoForm"
        >
            <el-form-item label="ISBN">
                <el-input disabled v-model="book.isbn"/>
            </el-form-item>
            <el-form-item label="书名">
                <el-input disabled v-model="book.name"/>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="book.author"/>
                <el-button
                    :disabled="saveButtonStatus.author"
                    type="text"
                    :loading="loading.author"
                    @click="saveAuthor(book.isbn, book.author)">保存
                </el-button>
            </el-form-item>
            <el-form-item label="出版社">
                <el-input v-model="book.publisher"/>
                <el-button
                    :disabled="saveButtonStatus.publisher"
                    type="text"
                    :loading="loading.publisher"
                    @click="savePublisher(book.isbn, book.publisher)">保存
                </el-button>
            </el-form-item>
            <el-form-item label="关键字">
                <el-input v-model="book.keywords"/>
                <el-button
                    :disabled="saveButtonStatus.keywords"
                    type="text"
                    :loading="loading.keywords"
                    @click="saveKeywords(book.isbn, book.keywords)">保存
                </el-button>
            </el-form-item>
            <el-form-item label="类别">
                <el-input v-model="book.category"/>
                <el-button
                    :disabled="saveButtonStatus.category"
                    type="text"
                    :loading="loading.category"
                    @click="saveCategory(book.isbn, book.category)">保存
                </el-button>
            </el-form-item>
            <el-form-item label="数量">
                <el-input-number
                    v-model.number="book.number"
                    :min="0"
                    controls-position="right"
                />
                <el-button
                    :disabled="saveButtonStatus.number"
                    type="text"
                    :loading="loading.number"
                    @click="saveNumber(book.isbn, book.number)">保存
                </el-button>
            </el-form-item>
            <el-form-item label="是否可借">
                <el-switch
                    v-model="book.borrowStatus"
                    :loading="loading.borrowStatus"
                    inline-prompt
                    active-color="#13ce66"
                    inactive-color="#E6A23C"
                    active-text="是"
                    inactive-text="否"
                    :beforeChange="saveBorrowStatus"
                />
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea"
                          autosize
                          show-word-limit
                          maxlength="300"
                          v-model="book.briefIntroduction"/>
                <el-button
                    :disabled="saveButtonStatus.briefIntroduction"
                    type="text"
                    :loading="loading.briefIntroduction"
                    @click="saveIntroduction(book.isbn, book.briefIntroduction)">保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>


</template>

<script setup>
import {useRouter} from "vue-router";
import {useBook} from "@/store/useBook";
import {reactive, watch} from "vue";
import PubSub from "pubsub-js";
import {REFRESH_BOOKS_INFO} from "@/pattern/eventTypes";
import {
    reqChangeAuthor, reqChangeBorrowStatus,
    reqChangeBriefIntroduction,
    reqChangeCategory,
    reqChangeKeywords,
    reqChangeNumber,
    reqChangePublisher
} from "@/api";
import {
    handleErrorReactive,
    handleErrorReactiveSwitch,
    handleRequestReactive,
    handleRequestReactiveSwitch
} from "@/hook/message/handleResponseMessage";

const router = useRouter()
const store = useBook()

const book = reactive(store.book)


// 是否启用保存按钮
const saveButtonStatus = reactive({
    author: true,
    publisher: true,
    keywords: true,
    category: true,
    number: true,
    briefIntroduction: true,
})

const loading = reactive({
    author: false,
    publisher: false,
    keywords: false,
    category: false,
    number: false,
    briefIntroduction: false,
    borrowStatus: false
})

watch(() => book.author, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        saveButtonStatus.author = false
    }
})

watch(() => book.publisher, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        saveButtonStatus.publisher = false
    }
})

watch(() => book.keywords, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        saveButtonStatus.keywords = false
    }
})

watch(() => book.category, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        saveButtonStatus.category = false
    }
})

watch(() => book.number, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        saveButtonStatus.number = false
    }
})

watch(() => book.briefIntroduction, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        saveButtonStatus.briefIntroduction = false
    }
})

const saveAuthor = (isbn, author) => {
    loading.author = true
    reqChangeAuthor(isbn, author)
        .then(response => handleRequestReactive(response, loading, "author", saveButtonStatus, "author"),
            error => handleErrorReactive(error, loading, "author"))
}

const savePublisher = (isbn, publisher) => {
    loading.publisher = true
    reqChangePublisher(isbn, publisher)
        .then(response => handleRequestReactive(response, loading, "publisher", saveButtonStatus, "publisher"),
            error => handleErrorReactive(error, loading, "publisher"))
}

const saveKeywords = (isbn, keywords) => {
    loading.keywords = true
    reqChangeKeywords(isbn, keywords)
        .then(response => handleRequestReactive(response, loading, "keywords", saveButtonStatus, "keywords"),
            error => handleErrorReactive(error, loading, "keywords"))
}

const saveCategory = (isbn, category) => {
    loading.category = true
    reqChangeCategory(isbn, category)
        .then(response => handleRequestReactive(response, loading, "category", saveButtonStatus, "category"),
            error => handleErrorReactive(error, loading, "category"))
}

const saveNumber = (isbn, number) => {
    loading.number = true
    reqChangeNumber(isbn, number)
        .then(response => handleRequestReactive(response, loading, "number", saveButtonStatus, "number"),
            error => handleErrorReactive(error, loading, "number"))
}

const saveIntroduction = (isbn, briefIntroduction) => {
    loading.briefIntroduction = true
    reqChangeBriefIntroduction(isbn, briefIntroduction)
        .then(response => handleRequestReactive(response, loading, "briefIntroduction", saveButtonStatus, "briefIntroduction"),
            error => handleErrorReactive(error, loading, "briefIntroduction"))
}

const saveBorrowStatus = () => {
    loading.borrowStatus = true

    return new Promise((resolve, reject) => {
        reqChangeBorrowStatus(book.isbn, book.borrowStatus)
            .then(response => handleRequestReactiveSwitch(response, loading, "borrowStatus", resolve, reject),
                error => handleErrorReactiveSwitch(error, loading, "borrowStatus", reject))
    })
}


// 返回函数
const goBack = () => {
    router.replace({name: "books"})
    store.$reset()
    // 发送通知，刷新表格
    PubSub.publish(REFRESH_BOOKS_INFO)
}

</script>

<style scoped lang="less">
.bookInfoContainer {
    display: flex;
    justify-content: center;

    .bookInfoForm {
        margin-top: 50px;
        padding: 0 150px 0 20px;
        width: 480px;

        .el-input {
            width: 300px;
        }

        .el-select {
            width: 300px;
        }

        .el-button {
            margin-left: 20px;
        }

        .el-textarea {
            width: 300px;
        }

    }
}


</style>
