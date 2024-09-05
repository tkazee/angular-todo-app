import { ToDoFilterPipe } from "./to-do-filter.pipe"
describe('toDoFilterPipe', () => {
    it('should create an instance', () => {
        let pipe = new ToDoFilterPipe();
        expect(pipe).toBeTruthy();
    });
    it('should return an empty array when value is undefined',()=>{
        let pipe = new ToDoFilterPipe();
        const result = pipe.transform(undefined,'test');
        expect(result).toEqual([]);
    });
    it('should return value is 0',()=>{
        let pipe = new ToDoFilterPipe();
        const todos = [
            { title: 'Task 1' },
            { title: 'Task 2' },
            { title: 'Task 3' }
        ];
        const filteredTodos = pipe.transform(todos,'');
        expect(filteredTodos).toEqual(todos);
    })
    it('should perform a lower case filter', () => {
        let pipe = new ToDoFilterPipe();
        const todos = [
            { title: 'Task 1' },
            { title: 'Task 2' },
            { title: 'Task 3' }
        ];
        const filterString = 'task';
        const filteredTodos = pipe.transform(todos, filterString);
        expect(filteredTodos).toEqual(todos);
    });
})