import { ZodHelper } from '@/infra/validators/helper/zod-helper-infra';
import type { ValidationContract } from '@/presentation/contracts';
import type { Either } from '@/shared/either';
import { z } from 'zod';

export class RegisterCustomerValidator implements ValidationContract {
  validate(input: any): Either<Error, void> {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*=])[a-zA-Z\d!@#$%&*=]{6,}$/;
    const messageErrorRegexPassword =
      'deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial, um número e ter no mínimo 6 caracteres';

    const schema = z
      .object({
        name: z
          .string({ required_error: 'O nome é obrigatório' })
          .min(3, 'O nome deve conter pelo menos 3 letras')
          .max(60, 'O nome deve conter no máximo 60 letras')
          .regex(/^[a-zA-ZÀ-ÿ\s~]+$/, 'O nome deve conter apenas letras'),

        email: z
          .string({ required_error: 'O email é obrigatório' })
          .email('O email deve ser válido'),

        password: z
          .string({ required_error: 'A senha é obrigatória' })
          .min(6, `A senha deve ter pelo menos 6 caracteres`)
          .max(60, `A senha deve ter no máximo 60 caracteres`)
          .regex(regexPassword, `A senha ${messageErrorRegexPassword}`),

        confirmPassword: z
          .string({ required_error: 'A confirmação da senha é obrigatória' })
          .min(6, `A confirmação da senha deve ter pelo menos 6 caracteres`)
          .max(60, `A confirmação da senha deve ter no máximo 60 caracteres`)
          .regex(regexPassword, `A confirmação da senha ${messageErrorRegexPassword}`),

        acceptedTerms: z.boolean({
          required_error: 'O aceite dos termos e condições é obrigatório',
        }),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: 'As senhas precisam ser iguais',
        path: ['confirmPassword', 'password'],
      })
      .refine(data => data.acceptedTerms === true, {
        message: 'O aceite dos termos e condições é obrigatório',
        path: ['acceptedTerms'],
      });

    return ZodHelper.check({ schema, value: input });
  }
}
