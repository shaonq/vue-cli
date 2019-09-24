var gantt = this.owner;
var targetTasks = gantt.getSelecteds();
var index = 0;
function copy(targetTask, parent) {
    console.log(++index, targetTask);

    var task = gantt.newTask();
    for (var key in targetTask) {
        var value = targetTask[key];
        switch (key) {
            case 'UID':
                break;
            default:
                task[key] = value;
                break;
        }
    }

    // 父元素信息
    if (typeof parent === "object") {
        for (var key in parent) task[key] = parent[key];
    }
    // 子元素信息
    if (targetTask.children) {
        return targetTask.children.map(function (item) {
            return copy(item, {
                ParentTaskUID: item.UID
            })
        })
    }
    return task

}
gantt.addTask(targetTasks.map(copy), "after", gantt.getSelected());