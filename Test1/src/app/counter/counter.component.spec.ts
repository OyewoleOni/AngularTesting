import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{DebugElement} from '@angular/core';
import{By} from '@angular/platform-browser'
import { CounterComponent } from './counter.component';

xdescribe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement : DebugElement;
  let htmlElement : HTMLElement;
  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations:[CounterComponent]
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(CounterComponent);
    component=fixture.componentInstance;
    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('p'));
    htmlElement=debugElement.nativeElement;
  });

  it('should increment the counter number by 1',()=>{
    //Arrange
    const initialValue = component.counter;

    //Act
    component.increment();
    fixture.detectChanges();

    const newValue = component.counter;

    //Assert
    expect(newValue).toBeGreaterThan(initialValue);
  })

  it('should decrement the counter number by 1',()=>{
    //Arrange
    const initialValue = component.counter;

    //Act
    component.decrement();
    fixture.detectChanges();
    
    const newValue = component.counter;

    //Assert
    expect(newValue).toBeLessThan(initialValue);
  })

  it('should display the counter number of the counter', ()=>{
    //Assert that the text onScreen is of Number: 1
    expect(htmlElement.textContent).toEqual('Number: 1');
  })

  it('should display the counter number on screen, after being incremented by one',()=>{
    //Arrange

    //Act
    component.increment();
    fixture.detectChanges()
    

    //Assert
    expect(htmlElement.textContent).toEqual('Number: 2');
  })


  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ CounterComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CounterComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
