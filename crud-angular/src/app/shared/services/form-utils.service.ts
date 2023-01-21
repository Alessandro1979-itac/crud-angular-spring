import { Injectable } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl)
        control.markAsTouched({ onlySelf: true });
      else if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  getFieldErrorMessage(formGroup: UntypedFormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  getFieldFormArrayErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;

    return this.getErrorMessageFromField(
      formArray.controls[index].get(fieldName) as UntypedFormControl
    );
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) return 'Campo é obrigatório.';

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;

      return `O campo não pode ter mais do que ${requiredLength} caracteres.`;
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;

      return `O campo não pode ter menos de ${requiredLength} caracteres.`;
    }

    return 'Error';
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;

    return !field.valid && field.hasError('required') && field.touched;
  }
}
