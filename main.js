const { app, BrowserWindow, Menu } = require('electron')
const electronReload = require('electron-reload')

// 设置热重载的目录，例如项目根目录
electronReload(__dirname);

const createWindow = () => {
  const win = new BrowserWindow({
    // frame: false,
    width: 800,
    height: 600
  })

  // 去除菜单栏中的 "File" 菜单
  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu)

  win.loadFile('AI.html')
}

app.whenReady().then(() => {
  createWindow()
})

// 关闭所有窗口时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })