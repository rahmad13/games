import { promises } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn, args, usedPrefix, command }) => {

try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!/audio/.test(mime)) throw `Balas vn/audio yang ingin diubah dengan caption *${usedPrefix + command}*`
        let audio = await q.download?.()
        if (!audio) throw 'Can\'t download audio!'
        if (!args[0]) throw 'angkanya mana contoh: reply .bass 1 10'
        if (!args[1]) throw 'angka nya mana'
      
       exec(`ffmpeg -ss ${args[0]} -i ${media} -t ${args[1]} -c copy ${filename}`, async (err) => {
        let ran = (new Date * 1) + '.mp3'
        let media = '../tmp/' + ran
        let filename = media + '.mp3'
        await promises.writeFile(media, audio)
          await promises.unlink(media)
            if (err) return Promise.reject( `_*Error!*_`)
            let buff = await promises.readFile(filename)
            m.reply(wait)
            conn.sendFile(m.chat, buff, ran, null, m, /vn/.test(args[0]), { quoted: m, mimetype: 'audio/mp4' })
            await promises.unlink(filename)
        })
} catch (e) {
        throw e
    }
}
handler.help = ['cut']
handler.tags = ['audio']
handler.command = /^(cut)$/i

export default handler
