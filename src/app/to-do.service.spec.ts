import { TestBed,inject } from "@angular/core/testing";
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { ToDoService } from "./to-do.service";
import { ToDos } from "./to-dos";
describe('ToDoService',()=>{
    let service: ToDoService;
    let httpMock: HttpTestingController;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[ToDoService],
        });
        service = TestBed.inject(ToDoService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(()=>{
        httpMock.verify();
    });
    it('should be created',()=>{
        expect(service).toBeTruthy();
    });
    it('should retrieve todos from the API via GET',()=>{
        const mockTodos = [{id:1,title:'Test Todo'}];
        service.getToDoData().subscribe((todos)=>{
            expect(todos).toEqual(mockTodos);
        });
        const req = httpMock.expectOne('http://localhost:3000/todos');
        expect(req.request.method).toBe('GET');
        req.flush(mockTodos);
    });
    it('should delete todos via DELETE',()=>{
        const todoId = 1;
        service.deleteToDoData(todoId).subscribe();
        const req = httpMock.expectOne(`http://localhost:3000/todos/${todoId}`);
        expect(req.request.method).toBe('DELETE');
    });
    it('should add a new todos via POST',()=>{
        const newTodo:ToDos = {id:2,title:'NEW Todo'};                                              
        service.pushToDoData(newTodo).subscribe((todo)=>{
            expect(todo).toEqual(newTodo);
        });
        const req = httpMock.expectOne('http://localhost:3000/todos');
        expect(req.request.method).toBe('POST');
        req.flush(newTodo);
    });
    it('should update an existing todo via PUT',()=>{
        const updatedTodo:ToDos = {id:2,title:'Update Todo'};
        service.updateToDoData(updatedTodo).subscribe((todo)=>{
            expect(todo).toEqual(updatedTodo);
        });
        const req = httpMock.expectOne(`http://localhost:3000/todos/${updatedTodo.id}`);
        expect(req.request.method).toEqual('PUT');
        req.flush(updatedTodo);
    });
});