
import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service : TodoService;
  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the item return from the server', () => {
    spyOn(service,'getTodos').and.callFake(()=>{
      return Observable.from([[
        {id:1, title:'a'},
        {id:2, title:'b'},
        {id:3, title:'c'},
      ]]);
      
    })
    component.ngOnInit();

     expect(component.todos.length).toBeGreaterThan(0);
    expect(component.todos.length).toBe(3);
  });

  it('should call the server to save the changes when a new to do is added',()=>{
    let spy = spyOn(service,'add').and.callFake(t =>{
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server',()=>{
    let todo = {id:1}
    let spy = spyOn(service,'add').and.callFake(t =>{
      return Observable.from([todo])
    });
    //Another way to implement this
    //let spy1 = spyOn(service,'add').and.returnValue(Observable.from([todo]))

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returns an error when adding a new todo',()=>{
    let err = 'error from the server'
    let spy = spyOn(service,'add').and.callFake(t =>{
      return Observable.throw(err);
    });
    //Another way to implement this
    //let spy1 = spyOn(service,'add').and.returnValue(Observable.throw(err));

    component.add();

   expect(component.message).toBe(err);
  });
  it('should call the server to delete a todo item if the user confirms',()=>{
    spyOn(window,'confirm').and.returnValue(true);
    let spy = spyOn(service,'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels',()=>{
    spyOn(window,'confirm').and.returnValue(false);
    let spy = spyOn(service,'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
    
  });
});