function handler(m) {
  const data = global.owner.filter(([id, isCreator]) => id && isCreator)
  this.sendMessage(m.chat, {text : 'wa.me/6283197563509' }, { quoted : m })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler
