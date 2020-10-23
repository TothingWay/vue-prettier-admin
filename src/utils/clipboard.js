import Clipboard from 'clipboard'
import { message } from 'ant-design-vue'

function clipboardSuccess(msg) {
  message.success(msg || 'Copy successfully', 1.5)
}

function clipboardError(msg) {
  message.error(msg || 'Copy failed')
}

export default function handleClipboard(text, event, msg) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess(msg)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(msg)
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
