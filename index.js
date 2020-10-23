
function test(){
    slideInLeft('.project', '.text-container', 0, 50)
    fadeIn('.project', '.text-container', 0, 50)
    fadeIn('.project', '.dark-pane', 0, 50)
    scrollOut('.project', '.text-container')
    scrollOut('.project', '.dark-pane')
    transform('.project', '.down-arrow', 50, 100, '%', (target, progress) => {
        target.style.bottom = `${20+progress/2}px`
    })
    transform('.project', '.background-image', 25,50, '%', (target, progress) => {
        target.style.filter = `blur(${progress*6/100}px)`
    })
    slideInRight('.project', '.diagonal-container', 0, 50)
    scrollOut('.project', '.diagonal-container')
    fadeIn('.project', '.diagonal-container', 0, 25)

}


function handlePage(){
    setUp()
    onScroll(test)
}

handlePage()