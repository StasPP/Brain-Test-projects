from time import sleep
import uiautomation as automation

if __name__ == '__main__':
    sleep(3)
    control = automation.GetFocusedControl()
    controlList = []
    while control:
        controlList.insert(0, control)
        control = control.GetParentControl()
    if len(controlList) == 1:
        control = controlList[0]
    else:
        control = controlList[1]
    address_control = automation.FindControl(control, lambda c, d: isinstance(c, automation.EditControl) and "Address and search bar" in c.Name)
    print address_control.CurrentValue()