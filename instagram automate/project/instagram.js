let puppeteer=require("puppeteer")
let cFile=process.argv[2];
let fs=require("fs")
let messageFile=process.argv[3];  

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

            
        await page.waitForSelector("._7UhW9.PIoXz.qyrsm.KV-D4.uL8Hv")
        await page.click("._7UhW9.PIoXz.qyrsm.KV-D4.uL8Hv")     

        await page.waitForNavigation({waitUntil:"networkidle2"})
        let ur=await page.evaluate( function(){
            let f1=document.querySelectorAll("._7UhW9.xLCgt.MMzan.KV-D4.fDxYl a")
            let arr=[]
            for(let i=0;i<5;i++)
            {
                let ur=f1[i].getAttribute("title")
                arr.push(ur)
            }

            return arr

        })
        for(i=0;i<ur.length;i++){
            console.log(ur[i])
        }

        await page.waitFor(1000)


        //direct dm tab
        await page.waitForSelector("a[class=xWeGp]");
        await Promise.all([page.click("a[class=xWeGp]"),page.waitForNavigation({waitUntil:"networkidle2"})])
        await page.waitForSelector(".wpO6b.ZQScA");
        await page.click(".wpO6b.ZQScA")
        // n number of users to add in group  
        for(let i=0;i<ur.length;i++){
            await page.waitForSelector(".j_2Hd.uMkC7.M5V28")         
        await page.type(".j_2Hd.uMkC7.M5V28",ur[i],{delay:60})
        await page.waitForSelector(".dCJp8")
        let btn=await page.$$(".dCJp8")
        await btn[0].click()
        }
        // next button to create group
        await page.waitForSelector(".sqdOP.yWX7d.y3zKF.cB_4K")
        await page.click(".sqdOP.yWX7d.y3zKF.cB_4K")

        // to get message from file and send in group
        let msg=require(messageFile)
        await page.waitForSelector(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi textarea")
        
        await page.type(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi textarea",msg,{delay:400})
        
        await page.keyboard.press("Enter")
        await page.waitFor(2000) 
        
        // search username 
        
        for(let i=0;i<ur.length;i++){

        await page.waitForSelector(".XTCLo.x3qfX")
        await page.type(".XTCLo.x3qfX",ur[i],{delay:120}) 

        // open profile 
        await page.waitForSelector(".yCE8d  ")
        await page.click(".yCE8d  ")

        //follow 
        await page.waitForSelector("._5f5mN.jIbKX._6VtSN.yZn4P")
        await page.click("._5f5mN.jIbKX._6VtSN.yZn4P")
        await page.waitFor(5000)
        await page.screenshot({path: 'profile' + i + '.png'})

        
    }
    
}
    catch(err)
    {
        console.log(err);
    }
})();
