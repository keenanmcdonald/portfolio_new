
function handleScroll(){
    fadeIn('#hero', '.bio-brief', 0, 20)
    fadeOut('#hero', '.bio-brief', 20, 40)
    fadeIn('#hero', '.exp', 30, 50)

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

    const scrollPercent = window.pageYOffset/window.innerHeight
    document.getElementById('scroll-indicator').style.top = `${scrollPercent}%`
}

function background(){
    const hero = document.getElementById('hero')
    //const title = document.getElementById('name')
    const gradients = [
        [[247,225,126], [247,192,103], [208,129,0]],
        [[199,58,37], [162,106,98], [40,32,31]],
        [[91,157,138], [116,192,67], [56,130,8]], 
        [[101,235,164], [52,187,116], [15,37,26]],
    ]
    let currentGradient = [[...gradients[0][0]], [...gradients[0][1]], [...gradients[0][2]]]
    let currentTargetIndex = 1
    let middleColorLoc = 50

    let shiftColor = setInterval(function() {
        const targetGradient = gradients[currentTargetIndex]
        let match = true

        for (let i = 0; i < currentGradient.length; i++){
            let currentColor = currentGradient[i]
            let targetColor = targetGradient[i]

            for (let j = 0; j < currentColor.length; j++){
                if (currentColor[j] !== targetColor[j]){
                    match = false
                    if (currentColor[j] > targetColor[j]){
                        currentColor[j] -=  1
                    }
                    else{
                        currentColor[j] += 1
                    }
                }
            }
        }

        if (match){
            currentTargetIndex = (currentTargetIndex+1) % gradients.length
        }

        middleColorLoc = middleColorLoc + (Math.random() - 0.5)
        if (middleColorLoc > 70){
            middleColorLoc = 70
        }
        else if (middleColorLoc < 30){
            middleColorLoc = 30
        }

        //title.style.background = `linear-gradient(90deg, rgb(${currentGradient[0][0]},${currentGradient[0][1]},${currentGradient[0][2]}) 0%, rgb(${currentGradient[1][0]},${currentGradient[1][1]},${currentGradient[1][2]}) 50%, rgb(${currentGradient[2][0]},${currentGradient[2][1]},${currentGradient[2][2]}) 100%)`
        hero.style.background = `linear-gradient(90deg, rgba(${currentGradient[0][0]},${currentGradient[0][1]},${currentGradient[0][2]}, 0.5) 0%, rgba(${currentGradient[1][0]},${currentGradient[1][1]},${currentGradient[1][2]}, 0.5) ${middleColorLoc}%, rgba(${currentGradient[2][0]},${currentGradient[2][1]},${currentGradient[2][2]}, 0.5) 100%)`
        
    },800)
}


function handlePage(){
    setUp()
    handleScroll()
    background()
    
    window.scroll(0, 1)
    window.scroll(0,0)
}

handlePage()