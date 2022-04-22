/**export async function before(m, { isAdmin, isBotAdmin }) {

if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup || db.data.settings[this.user.jid].group) return
    let user = global.db.data.users[m.sender]
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    await this.sendHydrated(m.chat, `
Hai, ${this.getName(m.sender)}

${user.banned ? 'kamu dibanned' : `Ada yang bisa ${this.user.name} bantu?`}
`.trim(), author, null, webpriv, "Website", null, null, [[user.banned ? 'Pemilik Bot' : 'Menu', user.banned ? ',owner' : ',?']], m)
    user.pc = new Date * 1

}**/
