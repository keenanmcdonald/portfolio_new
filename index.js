
function test(){
    slideInLeft('.project', '.text-container', 0, 50)
    fadeIn('.project', '.text-container', 0, 50)
    scrollOut('.project', '.text-container')
    transform('.project', '.down-arrow', 50, 100, '%', (target, progress) => {
        target.style.bottom = `${20+progress/2}px`
    })
}


function handlePage(){
    setUp()
    onScroll(test)
}

handlePage()