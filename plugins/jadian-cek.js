let handler = async (m, { conn, usedPrefix, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        pasangan: '',
      }
     }
   if pacar = who.pasangan
  if (pacar == "") throw `belum punya pasangan\n\nKetik ${usedPrefix}tembak @tag`
    let cpt = `*${conn.getName(who)}* (${who.split('@'[0]}) Berpacaran dengan ${pacar.split("@")[0]}\n\nIngin putus Ketik ${usedPrefix}putus @tag`
m.reply(cpt)
}
handler.help = ['cekpacar']
handler.tags = ['jadian']
handler.command = /^(cek(pacar)?)$/i
handler.fail = null
export default handler
