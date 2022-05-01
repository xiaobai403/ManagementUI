export function getMenu() {
    return {
        code: 200,
        msg: "请求成功",
        data: [
            {
                "name": "accountsContainer",
                "label": null,
                "url": "/accountsContainer",
                "path": "views/Accounts/Container",
                "icon": null,
                "disable": false,
                "category": 2,
                "meta": {
                    "redirect": "/accounts.html"
                },
                "children": [
                    {
                        "name": "accountDetails",
                        "label": null,
                        "url": "/accounts/details.html/:username",
                        "path": "views/Accounts/AccountDetails",
                        "icon": null,
                        "disable": false,
                        "category": 3,
                        "meta": null,
                        "children": null
                    },
                    {
                        "name": "accounts",
                        "label": "账户管理",
                        "url": "/accounts.html",
                        "path": "views/Accounts/Account",
                        "icon": "icon-wxbzhanghu",
                        "disable": false,
                        "category": 1,
                        "meta": null,
                        "children": null
                    }
                ]
            },
            {
                "name": "bookGroup",
                "label": "图书管理",
                "url": "/books/container",
                "path": "views/Books/",
                "icon": "icon-book-fill",
                "disable": false,
                "category": 0,
                "meta": null,
                "children": [
                    {
                        "name": "addBooks",
                        "label": "图书添加",
                        "url": "/books/add.html",
                        "path": "views/Books/AddBooks",
                        "icon": "icon-add1",
                        "disable": false,
                        "category": 1,
                        "meta": null,
                        "children": null
                    },
                    {
                        "name": "books",
                        "label": "图书管理",
                        "url": "/books.html",
                        "path": "views/Books/Books",
                        "icon": "icon-book1",
                        "disable": false,
                        "category": 1,
                        "meta": null,
                        "children": null
                    }
                ]
            },
            {
                "name": "home",
                "label": "首页",
                "url": "/home.html",
                "path": "views/Home/Home",
                "icon": "icon-home",
                "disable": false,
                "category": 1,
                "meta": null,
                "children": null
            },
            {
                "name": "recordsContainer",
                "label": null,
                "url": "/records/container",
                "path": "views/Records/Container",
                "icon": null,
                "disable": false,
                "category": 2,
                "meta": {
                    "redirect": "/Records.html"
                },
                "children": [
                    {
                        "name": "recordDetails",
                        "label": null,
                        "url": "/records/details.html/:borrowId",
                        "path": "views/Records/RecordDetails",
                        "icon": null,
                        "disable": false,
                        "category": 3,
                        "meta": null,
                        "children": null
                    },
                    {
                        "name": "records",
                        "label": "借阅记录",
                        "url": "/records.html",
                        "path": "views/Records/Records",
                        "icon": "icon-record",
                        "disable": false,
                        "category": 1,
                        "meta": null,
                        "children": null
                    }
                ]
            }
        ]

    }
}
