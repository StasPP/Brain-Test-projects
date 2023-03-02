from win32gui import GetForegroundWindow
from win32process import GetWindowThreadProcessId

from pywinauto.application import Application



window = GetForegroundWindow()
tid, pid = GetWindowThreadProcessId(window)
app = Application().connect(process=pid)
dlg = app.top_window()
title = "Address and search bar"

wnd = dlg.child_window(title=title, control_type="Edit")
if wnd is not None:
    url = wnd.get_value()
print(wnd)