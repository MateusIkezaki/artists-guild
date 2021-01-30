// const Display = async show => {
//     const data = await fetch('/images')
//     const source = await data.json()
//     const sourceNumber = Math.floor(Math.random() * source.length)

//     document.getElementById('output').src = source[sourceNumber].srcData
// }

// async function Sort(){
//     const response = await fetch('/images')
//     const data = await response.json()
//     console.log("DATA: ", data)
//     const date = new Date()

    

//     console.log(order)
//     console.log("Length: ", order.length)

// }
// Sort()


console.log(window.innerWidth, window.innerHeight)
var previousScroll = window.pageYOffset
window.onscroll = () => {
    var currentScroll = window.pageYOffset
    if(previousScroll > currentScroll){
        document.querySelector('.navbar').style.top = '0px'
    }
    else{
        document.querySelector('.navbar').style.top = '-90px'
    }
    previousScroll = currentScroll
}

async function DisplayData(){
    const response = await fetch('/images')
    const data = await response.json()
    let target = {}

    const order = []

    for(item of data)
    {
        order.push(parseInt(item.order))
    }

    order.sort(function(a, b){
        return b - a
    })

    for(var i = 0; i < order.length; i++){
        for(item of data){
            if(parseInt(item.order) == order[i]){
                target = item
                let submissionContainer = document.createElement('div')
                var submissionHolder = document.getElementById('sub-holder')
                submissionContainer.classList.add('submission-container')
                submissionHolder.appendChild(submissionContainer)
                var submissionImg = document.createElement('img')
                submissionImg.setAttribute('src', item.base64)
                submissionContainer.appendChild(submissionImg)
        
                submissionContainer.id = item._id
                
            }
        }
    }
    
    // for(item of data){
        
    //     let submissionContainer = document.createElement('div')
    //     submissionContainer.classList.add('submission-container')
    //     document.body.appendChild(submissionContainer)
    //     var submissionImg = document.createElement('img')
    //     submissionImg.setAttribute('src', item.base64)
    //     submissionContainer.appendChild(submissionImg)

    //     submissionContainer.id = item._id
    // }
}

DisplayData()

const submissions = document.getElementsByClassName('submission-container')
console.log(submissions)

window.onclick = async function(e) {
    if(e.target.className == 'submission-container' || e.target.parentElement.className == 'submission-container'){
        const subject = e.target.parentElement.className == 'submission-container' ? e.target.parentElement : e.target
        const response = await fetch('/images')
        const data = await response.json()

        document.querySelector('.submission-display').style.pointerEvents = 'initial'

        for(item of data){
            if(item._id == subject.id) {
                document.getElementById('image_display').src = item.base64
                document.getElementById('title').innerHTML = item.title
                document.getElementById('author').innerHTML = item.author
                document.getElementById('description').innerHTML = item.description
            }
        }

        const imageDisplay = document.getElementById('image_display')

        var imageDisplayHeight = imageDisplay.naturalHeight
        var imageDisplayWidth = imageDisplay.naturalWidth

        const exception = (imageDisplayWidth/imageDisplayHeight > 4) && window.innerWidth > 850

        if(imageDisplayWidth > imageDisplayHeight){
            imageDisplay.style.width = Exception(imageDisplayWidth, imageDisplayHeight).width
            imageDisplay.style.height = Exception(imageDisplayWidth, imageDisplayHeight).height
        }
        else if(imageDisplayWidth == imageDisplayHeight){
            imageDisplay.style.width = window.innerWidth < 460 ? '95%': 'auto'
            imageDisplay.style.height = window.innerWidth < 460 ? 'auto': '95%'
        }
        else{
            imageDisplay.style.height = '95%'
            imageDisplay.style.width = 'auto'   
        }

        document.querySelector('.submission-display').style.opacity = 1
        document.querySelector('.submission-display').style.transform = 'translateY(0%)'
        document.querySelector('.screen').style.opacity = .7
    }
        
}

function Exception(w, h){
    const limit = (w/h) > 4
    const screenLimit = window.innerWidth > 850
    var width, height = ''

    if((limit && screenLimit) || !screenLimit){
        width = '95%'
        height = 'auto'
    }
    if(!limit && screenLimit){
        width = 'auto'
        height = '95%'
    }
    return {width, height}
} 

function CloseDisplay(){
    document.querySelector('.screen').style.opacity = 0
    document.querySelector('.submission-display').style.opacity = 0
    document.querySelector('.submission-display').style.pointerEvents = 'none'
    document.querySelector('.submission-display').style.transform = 'translateY(15%)'
}

// function Test(){
//     var testimage = document.getElementById('upload').files
//     var data = document.getElementById('data')
//     if(testimage.length > 0) {
//         var fileToLoad = testimage[0]
//         var fileReader = new FileReader()
//         fileReader.onload = async function(fileLoadEvent){
//             var srcData = fileLoadEvent.target.result
//             data.innerHTML = srcData

//             const processeddata = {srcData}
//             const options = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(processeddata)
//             }
//             const message = await fetch('/images', options)
//             //const response = await message.json()
//             console.log("Image Saved Successfully") 
//         }
//         fileReader.readAsDataURL(fileToLoad)

       
//     }
// }

// var inputField = document.getElementById('upload')
// inputField.addEventListener("change", function(){
//     Test()
// })
// testimage.crossOrigin = 'Anonymous'
// testimage.onload = function() {
//     console.log('teste')
//     var canvas = document.createElement('canvas')
//     var ctx = canvas.getContext('2d')
//     canvas.height = this.naturalHeight
//     canvas.width = this.naturalWidth
//     ctx.drawImage(this, 0, 0)
//     var data = canvas.toDataURL('image/jpeg')
//     console.log(data)
// }

