var asciify = require('asciify-image');
const fs = require("fs")
var options = {
  fit: 'box',
  width: 115,
  height: 90,
  color: false
}
async function main() {
  await fs.readdir("frames/", {}, async (err, out) => {
    await out.forEach(async (img) => {
      asciify(`frames/${img}`, options, function (err, asciified) {
        if (err) throw err;

        // Print to console
        // console.log(asciified);
        console.log(img)
        if (img.length == 7) {
          fs.writeFileSync(`out/0${img}.txt`, asciified, { encoding: "ascii" })
          console.log(img)
        }
        else {
          fs.writeFileSync(`out/${img}.txt`, asciified, { encoding: "ascii" })
        }
      });
      //await sleep(50)
    })
  })
  await fs.readdirSync("out/", {}, async (err, out) => {
    await out.forEach(async(async img => {
      //all.push(await fs.readFileSync(`out/${img}`))
      console.log(img.length)
      if (img.length == 11) {
        await fs.renameSync(`out/${img}`, `out/0${img}`)
        console.log(img)
      }


      // /fs.rename(`img`)
      //await sleep(50)
    }))
    fs.writeFileSync("frames.json", JSON.stringify(all), { encoding: "ascii" })
  })
}
main()