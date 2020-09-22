

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
function transform(blockSelector, targetSelector, start=0, end=100, unit='%', callback){
    for (block of document.querySelectorAll(blockSelector)){

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
            callback(target, progress, start, end)
        }
    }
}

//TODO: what if the user wants to specify a pixel start / end?
function slideInLeft(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, start, end, '%', (target, progress) => {
        target.style.marginLeft = `${100-progress}vw`
    })
}
function slideInRight(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, start, end, '%', (target, progress) => {
        target.style.marginRight = `${100-progress}vw`
    })
}
function slideOutLeft(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, start, end, '%', (target, progress) => {
        target.style.marginLeft = `${progress}vw`
    })
}
function slideOutRight(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, start, end, '%', (target, progress) => {
        target.style.marginLeft = `${progress}vw`
    })
}
function  fadeIn(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, start, end, '%', (target, progress) => {
        target.style.opacity = `${progress/100}`
    })
}
function  fadeOut(blockSelector, targetSelector, start=0, end=100){
    transform(blockSelector, targetSelector, start, end, '%', (target, progress) => {
        target.style.opacity = `${1-progress/100}`
    })
}


//function fadeIn()
//function fadeOut()
//function expand()
//function contract()

//function slideInBottom()
//function slideOutBottom()
//function slideInTop(block, target, start=0, end=100, unit='%')
//function slideOutTop(block, target, start=0, end=100, unit='%')


function scrollOut(blockSelector, targetSelector){

    for (block of document.querySelectorAll(blockSelector)){
        const end = block.offsetHeight*100 / window.innerHeight
        const start = end - 100

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
            target.style.position = 'fixed'
            target.style.marginTop = `-${progress}vh`    
        }
    }
}



function onScroll(callback){
    window.addEventListener('scroll', callback)
}

function setUp(){
    setUpBlocks()
    setUpTargets()
}
