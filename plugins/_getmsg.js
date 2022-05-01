export async function before(m, { isAdmin, isBotAdmin }) {
 let chat = db.data.chats[m.chat]
 if (m.isBaileys && m.fromMe)
        return !0
 if (chat.isBanned) return !0
 if (!chat.getmsg) return !1
 if (!m.isGroup) return !1
    let msgs = db.data.msgs
    if (!(m.text in msgs)) return
    let _m = this.serializeM(JSON.parse(JSON.stringify(msgs[m.text]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)) {
            return Buffer.from(v.data)
        }
        return v
    }))
    await _m.copyNForward(m.chat, true)
}
