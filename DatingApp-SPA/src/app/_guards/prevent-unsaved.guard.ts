import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-list/member-edit/member-edit.component';
@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent){
        if(component.editForm.dirty){
            return confirm('Are You Sure You want to continue? Any Saved Changes will be lost');

        }
        return true;
    }
}