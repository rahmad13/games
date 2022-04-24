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

if (!args[0]) throw 'List tersedia
pRomantic
pSmoke
pNaruto
'


const {result} = await args[0](args[1] + args[2])
conn.sendFile(m.chat, result.url, 'potooxy.jpg', `*📎Url:* ${result.url}`, m)

}

handler.help = ['photooxy'].map(v => v + ' <text | text>')
handler.tags = ['photooxy']
handler.command = /^(p(hotooxy)?)$/i
export default handler
