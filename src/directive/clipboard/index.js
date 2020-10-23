import Clipboard from './clipboard'

const install = function(app) {
  app.directive('Clipboard', Clipboard)
}

window.clipboard = Clipboard

Clipboard.install = install
export default Clipboard
