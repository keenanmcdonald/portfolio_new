const projects = [
    {
        title: 'Lost Art Records', 
        id: 'lostart', 
        colors: {
            primary: '#F7C067', 
            secondary: '#EEECE1'
        },
    },
    {
        title: 'Terra',
        id: 'terra',
    },
    {
        title: 'Why Not Me',
        id: 'whynotme',
    }
]

function setUpBlocks(){
    for (const elem of document.querySelectorAll("[class*=block]")){
        const classList = elem.className.split(' ')
        for (const className of classList){
            if (className.startsWith('block-')){
                const height = parseInt(className.slice(6))
                if (Number.isInteger(height)){
                    elem.style.height = height + 'vh'
                    elem.style.position = 'relative'
                    elem.style.top = 0
                    elem.style.zIndex = -1
                }
            }
        }
    }
}
function setUpTargets(){
    for (const elem of document.querySelectorAll("[class*=target]")){
        elem.style.height = '100vh'
        elem.style.position = 'fixed'
        elem.style.top = 0
    }
}

//TODO: consider changing progress to 0 to 1 rather than 0 to 100?? or should it output pixel count if that's what the user specifies??
//TODO: blockSelector rather than blockId
function transform(blockSelector, targetSelector, callback, start=0, end=100, unit='%'){
    console.log(document.querySelectorAll(blockSelector))
    for (block of document.querySelectorAll(blockSelector)){
        console.log(block)

        const windowTop = window.pageYOffset
        const blockTop = block.offsetTop
        const blockHeight = block.offsetHeight
    
        let progress
        if (unit === '%'){
            absoluteProgress = (windowTop - blockTop)*100 / (blockHeight-window.innerHeight)
            if (absoluteProgress < start){
                progress = 0
            }
            else if (absoluteProgress >= start && absoluteProgress <= end){
                progress = 100 * (absoluteProgress - start) / (end-start)
            }
            else{
                progress = 100
            }
        }
        else if (unit === 'vh'){
            absoluteProgress = ((windowTop-blockTop)*100 / window.innerHeight)
    
            if (absoluteProgress < start){
                progress = 0
            }
            else if (absoluteProgress >= start && absoluteProgress <= end){
                progress = absoluteProgress - start
            }
            else{
                progress = end - start
            }
        
        }
        else if (unit === 'px'){
            //TODO: need to handle start/end
            absoluteProgress = (windowTop-blockTop)
            progress = absoluteProgress
        }
        else{
            throw Error(`unit must be '%', 'vh', or 'px'`)
        }
    
        for (target of block.querySelectorAll(targetSelector)){
            //console.log(target)
            callback(target, progress, start, end)
        }
    }
}

//TODO: what if the user wants to specify a pixel start / end?
function slideInLeft(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, (target, progress, start, end) => {
        console.log(target)
        target.style.marginLeft = `${100-progress}vw`
    },
        start, end, '%')
}
function slideInRight(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, (target, progress, start, end) => {
        target.style.marginRight = `${100-progress}vw`
    },
        start, end, '%')
}
function slideOutLeft(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, (target, progress, start, end) => {
        target.style.marginLeft = `${progress}vw`
    },
        start, end, '%')
}


function scrollOut(blockSelector, targetSelector){

    for (block of document.querySelectorAll(blockSelector)){
        const end = block.offsetHeight*100 / window.innerHeight
        const start = end - 100
        console.log('scroll start', start)
        console.log('scroll end', end)

        const windowTop = window.pageYOffset
        const blockTop = block.offsetTop
    
        absoluteProgress = ((windowTop-blockTop)*100 / window.innerHeight)

        if (absoluteProgress < start){
            progress = 0
        }
        else if (absoluteProgress >= start && absoluteProgress <= end){
            progress = absoluteProgress - start
        }
        else{
            progress = end - start
        }
            
        for (target of block.querySelectorAll(targetSelector)){
            //console.log(target)
            target.style.position = 'fixed'
            target.style.marginTop = `-${progress}vh`    
        }
    }
    /*
    const end = document.getElementById(blockId).offsetHeight*100 / window.innerHeight
    const start = end - 100

    transform(blockId, targetSelector, (target, progress) => {
    
        target.style.position = 'fixed'
        target.style.marginTop = `-${progress}vh`
    },
    start, end, 'vh')
    */
}
//function slideOutLeft(block, target, start=0, end=100, unit='%')
//function slideInRight(block, target, start=0, end=100, unit='%')
//function slideOutRight(block, target, start=0, end=100, unit='%')
//function slideInTop(block, target, start=0, end=100, unit='%')
//function slideOutTop(block, target, start=0, end=100, unit='%')
//function slideInBottom(block, target, start=0, end=100, unit='%')
//function slideOutBottom(block, target, start=0, end=100, unit='%')
//function fadeIn(block, target, startOpacity, endOpacity, start=0, end=100, unit='%')
//function fadeOut(block, target, startOpacity, endOpacity, start=0, end=100, unit='%')
//function expand(block, target, startSize, endSize, start=0, end=100, unit='%')
//function contract(block, target, startSize, endSize, start=0, end=100, unit='%')


function test(){
    slideInLeft('.project', '.text-container', 0, 50)
    scrollOut('.project', '.text-container')

    //transform('lostart', '.text-container', undefined, undefined, undefined, '%')
    //transform('lostart', '.text-container', undefined, undefined, undefined, 'vh')
    //transform('lostart', '.text-container', undefined, undefined, undefined, 'px')
}

function handleScroll(){
    const windowTop = $(window).scrollTop()

    test()
}
/*
function scrollInProject(id, windowTop){
    const progress = 3*(windowTop - $(`#${id}`).position().top) / $(`#${id}`).height()
    console.log(id, progress)

    //fade in
    $(`#${id} .text-container`).css('opacity', progress)
    
    //move left
    if (progress <= 1){
        $(`#${id} .text-container`).css('margin-left', ((1-progress)*100) + 'vw')
    }
    else{
        $(`#${id} .text-container`).css('margin-left', 0)
    }

    if (progress >= 2){
        //$(`#${id} .text-container`).css('top', -(progress-2) * $(window).height())
    }
    else{
        //$(`#${id} .text-container`).css('top', 0)
    }
}*/

function handleListeners(){
    window.addEventListener('scroll', handleScroll);}

function handlePortfolio(){
    handleListeners()
    setUpBlocks()
    setUpTargets()
}

$(handlePortfolio)
