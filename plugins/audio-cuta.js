import fs from 'fs'
import { exec } from 'child_process'


let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('detik?')
if (!args[1]) return m.reply('detik?')
        let q = m.quoted ? m.quoted : m
        let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
        if (/audio/.test(mime)) {
            let media = await q.download?.()
            let ran = getRandom('.mp3')
            exec(`ffmpeg -ss ${args[0]} -i ${media} -t ${args[1]} -c copy ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) m.reply(`_*Error!*_`)
                let buff = fs.readFileSync(ran)
                conn.sendFile(m.chat, buff, ran, null, m, null, { asDocument: chat.useDocument})
                fs.unlinkSync(ran)
            })
        } else m.reply(`Balas vn/audio yang ingin diubah dengan caption *${usedPrefix}cut*`)
    } catch (e) {
        throw e
    }
}
handler.help = ['cut (reply)']
handler.tags = ['audio']

handler.command = /^cut(potong|ct)$/i

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
