const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const { By, Key, Builder } = require("selenium-webdriver");
const fs = require("fs");
require("chromedriver");
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`sever running on port ${PORT}`);
});
//1以上都是express的基本用法

const url = "https://www.youtube.com/@UkiVioleta/streams";

//app.METHOD(PATH,HANDLER)
app.get("/", function (req, response) {
  response.json("this my web scriper"); //在/的网址打上"this my web scriper"
}); //example

//////////////////////selem
const article = [];
async function scrape(url) {
  //2make selenium webdriver for chrome
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(url);

  //3找要的那个element 找所有有a的element
  //let links = await driver.findElements(By.className("yt-simple-endpoint inline-block style-scope ytd-thumbnail")); //classname
  //let links = await driver.findElements(By.tagName("a")); //css=classname
  let objects = await driver.findElements(By.id("video-title-link")); //id

  //4把每個element用for loop print 出来
  for (let object of objects) {
    let href = await object.getAttribute("href");
    if (href != null) {
      //如果有video連結
     // console.log(href);
      //console.log(await object.getText());
      const title = await object.getText(); //get title
      const url = href; //get a内的href

      article.push({
        title,
        url,
      });
      
  //   res.json(article);
    }
  }
 // console.log(article)
  driver.quit();
}

scrape("https://www.youtube.com/@UkiVioleta/streams") /////////


app.get("/results", function (req, res) {

    console.log(article);
    res.json(article);

  //2 以上web scriping
  // response.json('this my web scriper2')//在/的网址打上"this my web scriper"
});

//get data
// app.post()// add
// app.put()//edit
// app.delete()//delete data
//3routing :把web scriping的资料放到网站

//npm run start
