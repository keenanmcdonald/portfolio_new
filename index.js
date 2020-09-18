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

function handleScroll(){
    const windowTop = $(window).scrollTop()

    for (project of projects){
        scrollInProject(project.id, windowTop)
    }
}

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
}

function handleListeners(){
    window.addEventListener('scroll', handleScroll);}

function handlePortfolio(){
    handleListeners()
}

$(handlePortfolio)
