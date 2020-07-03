const currentPage = location.pathname
const menuLinks = document.querySelectorAll("header .links a")

for (link of menuLinks) {
    if(currentPage.includes(link.getAttribute('href'))) {
        link.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
    oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPages = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2 
    
        if (firstAndLastPages || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }
    
            if (currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
    
            pages.push(currentPage)
    
            oldPage = currentPage
        }
    }

    return pages
}

function activePaginationElement(pagination, selectedPage) {
    let paginationElements = pagination.querySelectorAll('a')
    
    for (element of paginationElements) {
        if (element.innerHTML.includes(selectedPage)) {
            element.classList.add('active')
        }
    }
}

function createPagination(pagination) {
    const selectedPage = +pagination.dataset.page
    const totalPages = +pagination.dataset.total
    const filter = pagination.dataset.filter

    const pages = paginate(selectedPage, totalPages)
    let elements = ""

    for (let page of pages) {

        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements

    activePaginationElement(pagination, selectedPage)
}

const pagination = document.querySelector('.pagination')

if (pagination) {
    createPagination(pagination)
}





