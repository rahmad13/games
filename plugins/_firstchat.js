export async function all(m) {
if (m.isBaileys && m.fromMe && m.isGroup)
        return !0
let user = global.db.data.users[m.sender]
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    await this.sendButton(m.chat, `
Hai, ${this.ucapan()}
${user.banned ? 'kamu dibanned' : `Ada yang bisa ${this.user.name} bantu?`}
`.trim(), author, [[user.banned ? 'Pemilik Bot' : 'Menu', user.banned ? ',owner' : ',?']], m)
    user.pc = +new Date * 1
}