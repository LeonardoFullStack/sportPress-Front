

document.body.addEventListener('click', (ev)=> {
    const burguerOpen = document.querySelector('.burguerOpen');

    if (ev.target.matches('.material-symbols-outlined') || ev.target.matches('.navLink')) {
        
        burguerOpen.classList.toggle('displayNone')
    }

    
    
})