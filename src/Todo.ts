export interface ITodoItem {
    id: number,
    task: string,
    finished: boolean
}

let idCount = 0;

export class TodoItem implements ITodoItem {

    public id: number;
    public task: string = "";
    public finished: boolean = false;
 
    constructor(task: string) {
        this.task = task;
        this.id = idCount++;
    }

}