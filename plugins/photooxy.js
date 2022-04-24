import {
pShadow,
  pRomantic,
  pSmoke,
  pBurnPapper,
  pNaruto,
  pLoveMsg,
  pMsgGrass,
  pGlitch,
  pDoubleHeart,
  pCoffeCup,
  pLoveText,
  pButterfly
} from '../lib/photooxy.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {

if (!args[0]) throw 'textnya coy'

try {
const {result} = await command(args[0])

conn.sendFile(m.chat, result.url, 'potooxy.jpg', `*📎Url:* ${result.url}`, m)
} catch (e) {
m.reply(`Eror`)
}

}

handler.help = ['pRomantic', 'pSmoke','pNaruto','pBurnPapper'].map(v => v + ' <text>')
handler.tags = ['photooxy']
handler.command = /^(p(Smoke)?(Romantic)?(Naruto)?(BurnPapper)?)$/i
export default handler
