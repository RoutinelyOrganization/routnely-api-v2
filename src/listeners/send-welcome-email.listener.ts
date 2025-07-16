import { DomainEventBus } from '@/shared/events/domain-event-bus';
import { EmailService } from '@/domain/services/email-service';

const emailService = new EmailService();

DomainEventBus.on('customer_registered', async (email: string) => {
  await emailService.sendWelcomeEmail(email);
});
