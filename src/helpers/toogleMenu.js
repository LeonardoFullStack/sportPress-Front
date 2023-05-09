

document.body.addEventListener('click', (ev)=> {

    if (ev.target.matches('.material-symbols-outlined')) {
        const burguerOpen = document.querySelector('.burguerOpen')
        burguerOpen.classList.toggle('displayNone')
    }
    
})