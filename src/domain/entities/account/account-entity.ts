import { Entity } from '@/domain/entities';
import { InvalidPasswordError } from '@/domain/entities/account/errors';
import type { AccountEntityModel, AccountModel } from '@/domain/entities/account/models';
import { EmailValueObject } from '@/domain/entities/account/value-objects';
import { InvalidFieldError } from '@/domain/errors';
import { DatetimeValueObject } from '@/domain/value-objects';
import { CustomError } from '@/shared';

export class AccountEntity extends Entity<AccountEntityModel> {
  protected constructor(protected props: AccountEntityModel) {
    super(props);
  }

  get email(): string {
    return this.props.email.value;
  }

  get password(): string {
    return this.props.password;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get acceptedAt(): Date | null {
    return this.props.acceptedAt?.value || null;
  }

  static create(data: AccountModel): AccountEntity {
    const result = this.validate(data);

    return new AccountEntity(result);
  }

  private static validate(data: AccountModel): AccountEntityModel {
    this.clearErrors();
    const { id, email, password, isVerified, acceptedAt } = data;

    const idOrError = this.validateId(id);
    const emailOrError = EmailValueObject.create(email);

    const responses = [idOrError, emailOrError];

    const acceptedAtOrError = acceptedAt && DatetimeValueObject.create(acceptedAt);
    acceptedAtOrError && responses.push(acceptedAtOrError);

    this.validatePassword(password);
    isVerified && this.validateIsVerified(isVerified);

    for (const response of responses) {
      if (!response.isvalid) {
        this.addError(response.result.errors);
      }
    }

    const errors = this.errors();

    if (errors) {
      throw new CustomError(errors);
    }

    return {
      id: idOrError.result as string,
      email: emailOrError.result as EmailValueObject,
      password,
      isVerified: isVerified ?? false,
      acceptedAt: (acceptedAtOrError?.result as DatetimeValueObject) || null,
    };
  }

  private static validatePassword(password: string): void {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*=])[a-zA-Z\d!@#$%&*=]{6,}$/;
    if (!regexPassword.test(password)) {
      this.addError(new InvalidPasswordError());
    }
  }

  private static validateIsVerified(isVerified: boolean): void {
    if (typeof isVerified !== 'boolean') {
      this.addError(new InvalidFieldError('isVerified'));
    }
  }
}
