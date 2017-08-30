import { DebugElement }    from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { By }              from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Contact, ContactService, 
  FavoriteIconDirective, InvalidPhoneNumberModalComponent, InvalidEmailModalComponent } from '../shared';
import { ContactEditComponent } from './contact-edit.component';

import '../../../material-app-theme.scss';

describe('ContactEditComponent tests', () => {
  let contactEditComponentFixture: ComponentFixture<ContactEditComponent>;
  let contactEditComponent: ContactEditComponent;
  let contactServiceStub: Contact[];
  let contactService: ContactService;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async() => {
    contactServiceStub = [{
        id: 1,
        name: 'hi',
        email: 'hi@example.com'
      }
    ];

    TestBed.configureTestingModule({
      declarations: [ContactEditComponent, FavoriteIconDirective, InvalidEmailModalComponent,
        InvalidPhoneNumberModalComponent],
      imports: [
        FormsModule,
        HttpModule,
        MaterialModule, 
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [{provide: ContactService, useValue: contactServiceStub}]
    }).compileComponents();
    
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
      }
    });

    contactService = TestBed.get(ContactService);
  });

  beforeEach(() => {
    contactEditComponentFixture = TestBed.createComponent(ContactEditComponent);
    contactEditComponent = contactEditComponentFixture.componentInstance;
    debugElement = contactEditComponentFixture.debugElement.query(By.all());
    htmlElement = debugElement.nativeElement;
  });

  describe('getKeys() tests', () => {
    it('should return values from object', () => {
      const testObject = {
        name: 'liz',
        school: 'usc'
      };
      const expectedResult = ['name', 'school'];
      const result = contactEditComponent.getKeys(testObject);
      expect(result).toEqual(expectedResult);
    });
  });

  xdescribe('saveContact() tests', () => {
    contactEditComponentFixture.detectChanges();
    const content = htmlElement.textContent;
    expect(content).toContain('liz');
    const testObject = {
      name: 'london',
      school: 'harvard'
    };
  });

  describe('loadContact() tests', () => {
    
  });

  describe('displayEditSnackBar() tests', () => {

  });

  describe('updateContact() tests', () => {

  });

  describe('isEmailValid() tests', () => {
    it('should be true', () => {
      expect(contactEditComponent.isEmailValid('janet@example.com')).toBeTruthy();
    });

    it('should be false', () => {
      expect(contactEditComponent.isEmailValid('jesse')).toBeFalsy();
    });
  });

  describe('isPhoneNumberValid() tests', () => {
    it('should be false', () => {
      expect(contactEditComponent.isPhoneNumberValid('12343243')).toBeFalsy();
      expect(contactEditComponent.isPhoneNumberValid('123432s3')).toBeFalsy();
    });

    it('should be true', () => {
      expect(contactEditComponent.isPhoneNumberValid('1234567890')).toBeTruthy();
    });
  });

  describe('isContactValid() tests', () => {
    
  });
});
