import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{DebugElement} from '@angular/core';

import {compute} from './compute';

xdescribe('compute',()=>{

    it('should return zero if inpute is negative', ()=>{
        const  result = compute(-1);

        expect(result).toBe(0);
    });
    it('should increment the input if poositive', ()=>{
        const  result = compute(1);

        expect(result).toBe(2);
    });
});