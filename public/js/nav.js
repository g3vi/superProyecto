const navbar=document.querySelector('.navbar')
window.addEventListener('scroll',()=>{
    if(scrollY=>180){
        navbar.classList.add('bg')
    }else{
        navbar.classList.remove('bg')
    }
})
const createNavbar=()=>{
    navbar.innerHTML+=
    `
    <ul class="links-container">
        <li class="link-item">
            <a href="#" class="link active">Home</a>
        </li>
    </ul>
    <ul class="links-container">
        <li class="link-item">
            <a href="#" class="link">Product</a>
        </li>
    </ul>
    <ul class="links-container">
        <li class="link-item">
            <a href="#" class="link">About</a>
        </li>
    </ul>
    <ul class="links-container">
        <li class="link-item">
            <a href="#" class="link">Contact</a>
        </li>
    </ul>
    `
}
createNavbar()