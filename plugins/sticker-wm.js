import { addExif, sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'


let handler = async (m, { conn, text }) => {
  if (!m.quoted) throw 'Quoted the sticker!'
  let stiker = false
  try {
    let [packname, ...author] = text.split`|`
    author = (author || []).join(`|`)
    let q = m.quoted ? m.quoted : m
    let mime = m.quoted.mimetype || ''
    if (/webp/.test(mime)) {
      let img = await q.download()
      let out = await uploadFile(img)
      stiker = await sticker(0, out, packname || '', author || '')
    } else if (/image/.test(mime)) {
      let img = await q.download()
      let out = await uploadImage(img)
      stiker = await sticker(0, out, packname || '', author || '')
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('maks 10 detik!')
      let img = await q.download()
      let out = await uploadImage(img)
      stiker = await sticker(0, out, packname || '', author || '')
    }
  } finally {
    if (stiker) await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
    else throw `Balas stiker dengan perintah *${usedPrefix + command} <teks>|<teks>*`
  }
}
handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^s(wm)$/i

export default handler
