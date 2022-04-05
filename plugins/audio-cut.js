import fs from 'fs'
import { exec } from 'child_process'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply('detik?')
    if (!args[1]) return m.reply('detik?')

try {
     let q = m.quoted ? m.quoted : m
     let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/audio/.test(mime)) {
     let media = await q.download?.()
     if (!media) throw 'Can\'t download media'
     let ran = getRandom('.mp3')
     exec(`ffmpeg -ss ${args[0]} -i ${media} -t ${args[1]} -c copy ${ran}`, (err, stderr, stdout) => {
     fs.unlinkSync(media)
     if (err) m.reply(`_*Error!*_`)
     let buff = fs.readFileSync(ran)
     conn.sendFile(m.chat, buff, ran, null, m, true, { quoted: m, mimetype: 'audio/mp4' })
     fs.unlinkSync(ran)
         })
      } else m.reply(`Reply Audio!!!`)
    } catch (e) {
      m.reply(e)
         }
       }
handler.help = ['cut (reply|second|to second)']
handler.tags = ['audio']

handler.command = /^cut$/i

export default handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
