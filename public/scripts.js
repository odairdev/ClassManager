const currentPage = location.pathname
const menuLinks = document.querySelectorAll("header .links a")

for (link of menuLinks) {
    if(currentPage.includes(link.getAttribute('href'))) {
        link.classList.add("active")
    }
}