export function addRoute(data, router) {
    const routes = []
    data.forEach(it => {
        const result = createRoute(it)
        if (Array.isArray(result)) {
            routes.push(...result)
        } else {
            routes.push(result)
        }
    })

    routes.forEach(i => {
        router.addRoute('main', i)
    })
}

function createRoute(it) {
    const routeItem = {}

    if (it.path === null || it.path === undefined || it.path === "") {
        if (it.children !== undefined) {
            const routeArray = []

            it.children.forEach(it => {
                const result = createRoute(it)
                if (Array.isArray(result)) {
                    routeArray.push(...result)
                } else {
                    routeArray.push(result)
                }
            })

            return routeArray
        }
    }

    routeItem["path"] = it.url
    routeItem["name"] = it.name
    routeItem["component"] = () => import(`@/${it.path}`)
    if (it.meta !== undefined && it.meta !== null && it.meta.redirect !== undefined) {
        routeItem["redirect"] = it.meta.redirect
    }
    if (it.children !== undefined && it.children !== null) {
        routeItem["children"] = []
        it.children.forEach(it => {
            routeItem["children"].push(createRoute(it))
        })
    }

    return routeItem
}

