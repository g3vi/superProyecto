window.onload = () => {
    if (sessionStorage.user) {
        user = JSON.parse(sessionStorage.user)
        if (user.email) {
            location.replace('/')
        }
    }
}
let formBtn = document.querySelector('.submit-btn')
let loader = document.querySelector('.loader')
formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name') || null
    let email =  document.querySelector('#email') || null
    let password =  document.querySelector('#password') || null
    let number =  document.querySelector('#number') || null
    let tac =  document.querySelector('#tac') || null
    if (fullname !== null) {
        // Pagina de Registro
    } else {
        if ( !email.ariaValueMax.length || !password.ariaValueMax.length) {
            showFormError('fill all inputs')
        } else {
            loader.style.display = 'block'
            sendData('/login', {
                email: email.value,
                password: password.value
            }) 
        }
    }
})