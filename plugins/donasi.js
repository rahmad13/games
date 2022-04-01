let handler =  m => m.reply(`
╭─「 Donasi • Pulsa 」
│ • Telkomsel [082328303332]
╰────

╭─「 Donasi • Non Pulsa 」
│ • Ovo [082328303332]
│ • Paypal []
│ • Dana [082328303332]
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
