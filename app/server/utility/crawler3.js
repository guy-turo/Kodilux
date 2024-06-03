const axios = require("axios")
const cheerio = require("cheerio")
const { uriLocal } = require('../db/connect')
const { pageModel } = require("../models/pageModel")

const mongoose = require('mongoose');

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
    if (!queue.includes(url) && !url.includes('robots.tx') && url.startsWith('http') || url.startsWith('https')) {
        if (check(url, checkedData)) {
            queue.push(url)
        }
    }
}
const crawlPage = async(url) => {
    try {
        const confirmedLinks = await pageModel.find()
        const checkLinks = []
        for (let i = 0; i < confirmedLinks.length; i++) {
            checkLinks.push(confirmedLinks[i].url)
        }
        if (checkLinks.includes(url) !== true) {
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
            const bodySplitted = removeDuplicateSentences(body)
            $("a").each((_, element) => {
                const newUrl = $(element).attr('href')

                if (newUrl && newUrl.startsWith("http") && newUrl.startsWith("https")) {
                    if (check(newUrl, links) === true) {
                        links.push(newUrl)
                            // createDbCrawler(title, url, images, bodySplitted, newUrl, true)
                    }
                }
            })



            const page = new pageModel({
                title: title,
                url: url,
                images: images,
                content: bodySplitted,
                links: links,
                status: true
            })
            await page.save()
                // console.log(`Crawled : ${url}`)
            console.log(`Title: ${title} images: ${images.length}  Body : ${bodySplitted.length} links: ${links.length} status: true`)
            for (const newUrl of links) {
                addToQueue(newUrl)
            }
        }

    } catch (error) {
        console.error(`Err crawling ${url}:`, error.message)
    }
}

const run = () => {
    mongoose.connect(uriLocal)
        .then(async() => {
            console.log("Connected to MongoDB")
            const baseUrl = "https://www.xnxx.com/"
            urlPassed.push(baseUrl)
            addToQueue(baseUrl)

            while (queue.length > 0) {
                const nextUrl = queue.shift()
                urlPassed.push(nextUrl)
                await crawlPage(nextUrl)
                console.log("Web page Checked : " + checkedData.length + " --- " + "Queue : " + queue.length + " --- " + "Web page Passed : " + urlPassed.length)
            }
        })
        .catch(err => console.error("Error connecting to MongoDB:", err));
}

run()