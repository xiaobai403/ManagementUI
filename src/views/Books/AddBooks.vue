<template>
    <div class="container">
        <el-form
            ref="formRef"
            :model="book"
            label-width="80px"
            class="bookInfoForm"
        >
            <el-form-item label="ISBN">
                <el-input v-model="book.isbn"/>
                <el-button
                    :disabled="saveButtonStatus.author"
                    type="text"
                    :loading="loading.author"
                    @click="saveAuthor(book.isbn, book.author)">
                    识别
                </el-button>

            </el-form-item>
            <el-form-item label="书名">
                <el-input v-model="book.name"/>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="book.author"/>
            </el-form-item>
            <el-form-item label="出版社">
                <el-input v-model="book.publisher"/>
            </el-form-item>
            <el-form-item label="关键字">
                <el-input v-model="book.keywords"/>
            </el-form-item>
            <el-form-item label="类别">
                <el-input v-model="book.category"/>
            </el-form-item>
            <el-form-item label="数量">
                <el-input-number
                    v-model.number="book.number"
                    :min="0"
                    controls-position="right"
                />
            </el-form-item>
            <el-form-item label="是否可借">
                <el-switch
                    v-model="book.borrowStatus"
                    inline-prompt
                    active-color="#13ce66"
                    inactive-color="#E6A23C"
                    active-text="是"
                    inactive-text="否"
                />
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea"
                          autosize
                          show-word-limit
                          maxlength="300"
                          v-model="book.briefIntroduction"/>
            </el-form-item>
        </el-form>

    </div>
</template>

<script setup>
import {reactive} from "vue";

const book = reactive({
    isbn: "",
    name: "",
    author: "",
    publisher: "",
    keywords: "",
    category: "",
    number: 0,
    borrowStatus: false,
    briefIntroduction: ""
})

</script>

<style scoped lang="less">
.container {
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
