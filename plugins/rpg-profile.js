import { join } from 'path'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let { exp, limit, level, role, money, lastclaim, lastweekly, registered, regTime, age, banned } = global.db.data.users[who]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(who)
    let pp = await this.profilePictureUrl(who).catch(_ => './src/avatar_contact.png')
    if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        lastweekly: 0,
        role: 'Warrior V',
        autolevelup: false,
        money: 0,
      }
     let math = max - xp
    let dbr = `
*🏷️ Nama:* *(${name})* ${registered ? '(' + name + ') ' : ''} (@${who.replace(/@.+/, '')})
*💲Money:* *RP* ${money}
*🏆Level* ${level}
*🎋Role:* ${role}
*🧬XP:* TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Siap untuk *${usedPrefix}levelup*` : `${math} XP lagi untuk levelup`}]
*📨Terdaftar:* ${registered ? 'Ya (' + new Date(regTime).toLocaleString() + ')' : 'Tidak'} ${lastclaim > 0 ? '\n*⏱️Terakhir Klaim:* ' + new Date(lastclaim).toLocaleString() : ''}

${global.author}`

conn.sendFile(m.chat, pp, 'propil.jpg', dbr, m , { mentions: conn.parseMention(caption) })

}

handler.help = ['profile'].map(v => v + ' <url>')
handler.tags = ['rpg']

handler.command = /^(pro(fil)?(file)?)$/i

export default handler
