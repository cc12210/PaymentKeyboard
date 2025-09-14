class Arrange {
  taskId: string;
  tasks: { type: string; action?: string; seconds?: number }[];
  constructor(taskId: string) {
    this.taskId = taskId;
    this.tasks = [];
    this.tasks.push({ type: 'notify' });
  }

  do(action: string) {
    this.tasks.push({ type: 'do', action });
    return this;
  }

  wait(seconds: number) {
    this.tasks.push({ type: 'wait', seconds });
    return this;
  }

  waitFirst(seconds: number) {
    this.tasks.unshift({ type: 'wait', seconds });
    return this;
  }

  execute() {
    const runTasks = async () => {
      for (const task of this.tasks) {
        if (task.type === 'wait') {
          // 等待返回
          await new Promise(resolve => setTimeout(resolve, (task.seconds || 0) * 1000));
        } else if (task.type === 'notify') {
          console.log(`${this.taskId} is notified`);
        } else if (task.type === 'do') {
          console.log(`${this.taskId} is doing ${task.action}`);
        }
      }
    };
    runTasks();
  }
}

export default Arrange;