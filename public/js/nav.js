const navbar=document.querySelector('.navbar')
window.addEventListener('scroll', () => {
    if(scrollY >= 180){
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
        <li class="link-item">
            <a href="#" class="link">Product</a>
        </li>
        <li class="link-item">
            <a href="#" class="link">About</a>
        </li>
        <li class="link-item">
            <a href="#" class="link">Contact</a>
        </li>
    </ul>
    <div class="user-interactions">
        <div class="search-box">
        <input type="text" class="search" placeholder="search item">
        <button class="search-btn">
            <img src="./img/search.png" alt="" class="cart-icon">
        </button>
    </div>
        <div class="cart" onclick="location.href = '/cart'">
            <img src="./img/cart.png" class="cart-icon">
            <span class="cart-item-count">00</span>
        </div>
        <div class="user">
            <img src="./img/user.png" class="user-icon">
        <div class="user-icon-popup">
            <p>Login to your acount</p>
            <a href="/login">Login</a>
        </div>
        </div>
    </div>
    `
}
createNavbar()
//user icon popup
let userIccon=document.querySelector('.user-icon')
let userPopupIcon=document.querySelector('.user-icon-popup')
userIccon.addEventListener('click',()=>{
    useUserIcon.classList.toggle('active')
})
let text=userPopupIcon.querySelector('p')
let actionBtn=userPopupIcon.querySelector('a')
let user=JSON.parse(sessionStorage.user || null)
if(user!=null){
    text.innerHTML=`log in as, ${user.name}`
    actionBtn.innerHTML='logout'
    actionBtn.addEventListener('click',()=>{
        logout()
    })
}else{
    text.innerHTML='log in to your account'
    actionBtn.innerHTML='login'
    actionBtn.addEventListener('click',()=>{
        location.href('/login')
    })
}
const logout=()=>{
    sessionStorage.clear()
    location.reload()
}