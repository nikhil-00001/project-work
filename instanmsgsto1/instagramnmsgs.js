let puppeteer=require("puppeteer")
let cFile=process.argv[2];
let fs=require("fs")
let messageFile=process.argv[3];  
let idtosendmsgFile=process.argv[4];

(async function(){
    try{
        let browser=await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized","--disable-notifications"]
        })
        let pages = await browser.pages();
        let page = pages[0];
        let data = await fs.promises.readFile(cFile)
        let { url, password, username } = JSON.parse(data);
        //login
        await page.goto(url, { waitUntil: "networkidle2" })
        await page.waitForSelector("._9GP1n");
        await page.type("input[type=text]",username,{delay:120})
        await page.type("input[type=password]",password,{delay:120});
        await Promise.all([page.click("button[type=submit]"),page.waitForNavigation({waitUntil:"networkidle2"})])

        // await page.waitForSelector("._7UhW9.PIoXz.qyrsm.KV-D4.uL8Hv")
        // await page.click("._7UhW9.PIoXz.qyrsm.KV-D4.uL8Hv")     

        // await page.waitFor(1000)


        //direct dm tab
        await page.waitForSelector("a[class=xWeGp]");
        await Promise.all([page.click("a[class=xWeGp]"),page.waitForNavigation({waitUntil:"networkidle2"})])
        await page.waitForSelector(".wpO6b.ZQScA");
        await page.click(".wpO6b.ZQScA")

        
            // n number of users to add in group 
            let id=require(idtosendmsgFile) 
            await page.waitForSelector(".j_2Hd.uMkC7.M5V28")         
            await page.type(".j_2Hd.uMkC7.M5V28",id,{delay:120})
            await page.waitForSelector(".dCJp8")
            
            let btn=await page.$$(".dCJp8")
            await btn[0].click()
            
            // next button to create group
            await page.waitForSelector(".sqdOP.yWX7d.y3zKF.cB_4K")
            await page.click(".sqdOP.yWX7d.y3zKF.cB_4K")
            
            // to get message from file and send 

            for(let i=0;i<10;i++){
            let msg=require(messageFile)
            await page.waitForSelector(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi textarea")                
            await page.type(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi textarea",msg,{delay:400})
            await page.waitFor(300)
            await page.keyboard.press("Enter")
            await page.waitFor(1000) 
       
        }
}
    catch(err)
    {
        console.log(err);
    }
})();
