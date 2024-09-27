import type { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import type { Either } from '@/shared/either';

export type ResponseCustomerEntityType = Either<Error, CustomerEntity>;
