let handler = async (m, { conn, usedPrefix }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
let pp = await conn.profilepictureurl(who).catch(_ => './src/avatar_contact.png')
   } catch (e) {
} finally {
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
        role: 'Warrior V',
        autolevelup: false,
      }
}
let { name, limit, exp, lastclaim, registered, regTime, age, level, role, banned } = global.db.data.users[who]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    
    let math = max - xp
    let str = `
🏷️Nama: ${username} ${registered ? '(' + name + ') ' : ''}(@${who.replace(/@.+/, '')})${about != 401 ? '\nInfo: ' + about : ''}
📎Link: https://wa.me/${who.split`@`[0]}${registered ? '\nUmur: ' + age : ''}
🎉XP: TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Siap untuk *${usedPrefix}levelup*` : `${math} XP lagi untuk levelup`}]
🧬Level: ${level}
🎋Role: *${role}*
🎟️Limit: ${limit}
👤Terdaftar: ${registered ? 'Ya (' + new Date(regTime).toLocaleString() + ')' : 'Tidak'}${lastclaim > 0 ? '\nTerakhir Klaim: ' + new Date(lastclaim).toLocaleString() : ''}
`.trim()
    let mentionedJid = [who]
    conn.sendHydrated(m.chat, banned ? 'jiakh ke banned' : str, author, pp, "https://chat.whatsapp.com/KamZimB6d8R3c2C4PepN6Q", "GC WHATSAPP", [["claim",".claim"]] , m)
  }
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^profile?$/i
export default handler
