const axios = require("axios")
const cheerio = require("cheerio")
const { uriLocal } = require('../db/connect')
const esprima = require('esprima')

const mongoose = require('mongoose');
// Replace with your details
// const removeFunctions = (code) => {
//     try {
//         const ast = esprima.parse(code, { range: true })

//         const visitor = {
//             FunctionDeclaration: function(node) {
//                 const start = node.range[0];
//                 const end = node.range[1];
//                 code = code.slice(0, start) + code.slice(end)
//             },
//             FunctionExpression: function(node) {
//                 const start = node.range[0];
//                 const end = node.range[1];
//                 code = code.slice(0, start) + node.slice(end)
//             },
//         }
//         esprima.walk(ast, visitor)
//         return code
//     } catch (error) {
//         console.error('Error parsing Javascript:', error)
//         return code;
//     }
// }
const removeDuplicateSentences = (sentenceList) => {
    const uniqueSentences = new Set()
    const stringSentences = sentenceList.filter(element => typeof element === 'string')
    for (const sentence of stringSentences) {
        const lowerCaseSentence = sentence.toLowerCase()
        if (!uniqueSentences.has(lowerCaseSentence)) {
            uniqueSentences.add(lowerCaseSentence)
        }
    }
    return Array.from(uniqueSentences)
}
const check = (data, checkedList) => {

    if (!checkedList.includes(data)) {
        checkedList.push(data)
        return true
    } else {
        return false
    }
}
const queue = []
const checkedData = []
const urlPassed = []

const addToQueue = (url) => {
    if (!queue.includes(url) && url.startsWith('http') || url.startsWith('https')) {
        if (check(url, checkedData)) {
            queue.push(url)
        }
    }
}
const crawlPage = async(url) => {
    try {
        const response = await axios.get(url)
        const data = response.data
        if (!data) {
            throw new Error("Empty response")
        }
        let htmlString
        if (typeof response.data === 'string') {
            htmlString = data;
        } else {
            throw new Error('Unexpected response format (not string)');
        }

        const $ = cheerio.load(htmlString)

        //title
        const title = $("title").text().trim()

        const body = []
        let newBody
        for (let i; i < body; i++) {
            const words = body[i].split(/\s+/)
            const uniqueWords = newSet(words.map(word => word))
            newBody = newBody
        }
        // filtered$('th').map((_, element) => {
        //     const newDate = $(element).text().trim()
        //     if (check(newDate, body) === true) {
        //         body.push(newDate)
        //     }
        // })
        // filtered$('td').map((_, element) => {
        //     const newDate = $(element).text().trim()
        //     if (check(newDate, body) === true) {
        //         body.push(newDate)
        //     }
        // })
        // filtered$('span').map((_, element) => {
        //     const newDate = $(element).text().trim()
        //     if (check(newDate, body) === true) {
        //         body.push(newDate)
        //     }
        // })
        $('h3').map((_, element) => {
            const newDate = $(element).text().trim()
            if (check(newDate, body) === true) {
                body.push(newDate)
            }
        })
        $('h2').map((_, element) => {
            const newDate = $(element).text().trim()
            if (check(newDate, body) === true) {
                body.push(newDate)
            }
        })
        $('h1').map((_, element) => {
            const newDate = $(element).text().trim()
            if (check(newDate, body) === true) {
                body.push(newDate)
            }
        })
        $('p').map((_, element) => {
                const newDate = $(element).text().trim()
                if (check(newDate, body) === true) {
                    body.push(newDate)
                }
            })
            // Date
        const date = []
        const dateText = $('.date').text().trim()
            // date.push(dateText)

        $('time').map((_, element) => {
                const newDate = $(element).attr("datetime")
                if (check(newDate, date) === true) {
                    date.push(newDate)
                }
            })
            //Image
        const images = []
        $("img").each((_, element) => {
                const newImage = $(element).attr('src')
                if (newImage && newImage.startsWith("http") && newImage.startsWith("https")) {
                    if (check(newImage, images) === true) {
                        images.push(newImage)
                    }
                }
            })
            //Links
        const links = []

        $("a").each((_, element) => {
                const newUrl = $(element).attr('href')

                if (newUrl && newUrl.startsWith("http") && newUrl.startsWith("https")) {
                    if (check(newUrl, links) === true) {
                        links.push(newUrl)
                    }
                }
            })
            // console.log(`Crawled : ${url}`)
            // const bodySplitted = removeDuplicateSentences(body)
            // console.log(` Body : ${bodySplitted} Number: ${body.length}`)
        for (const newUrl of links) {
            addToQueue(newUrl)
        }
    } catch (error) {
        console.error(`Err crawling ${url}:`, error.message)
    }
}

const run = () => {
    mongoose.connect(uriLocal)
        .then(async() => {
            console.log("Connected to MongoDB")
            const baseUrl = "https://www.google.com/webhp?hl=fr&sa=X&ved=0ahUKEwidr5Oq3ISEAxULUqQEHaaDA8EQPAgJ"
            urlPassed.push(baseUrl)
            addToQueue(baseUrl)

            while (queue.length > 0) {
                console.log("Queue: ", queue)
                const nextUrl = queue.shift()
                urlPassed.push(nextUrl)
                while (queue.length < queue.length) {
                    console.log("inside" + queue.length)
                    await crawlPage(nextUrl)
                }
                await crawlPage(nextUrl)
                console.log("Web page Checked : " + checkedData.length + " --- " + "Queue : " + queue.length + " --- " + "Web page Passed : " + urlPassed.length)
            }
        })
        .catch(err => console.error("Error connecting to MongoDB:", err));
}
console.log(queue)
run()