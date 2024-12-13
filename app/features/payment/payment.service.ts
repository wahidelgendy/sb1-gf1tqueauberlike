import { Injectable } from '@nativescript/core';
import { PaymentMethod, PaymentIntent, PaymentError } from './payment.model';
import { StripeService } from './stripe.service';
import { PaymentValidator } from './payment.validator';
import { SecurityUtil } from '../../utils/security.util';

@Injectable()
export class PaymentService {
  private stripe: StripeService;
  private validator: PaymentValidator;

  constructor() {
    this.stripe = new StripeService();
    this.validator = new PaymentValidator();
  }

  async addPaymentMethod(params: {
    number: string;
    expMonth: number;
    expYear: number;
    cvc: string;
  }): Promise<PaymentMethod> {
    try {
      // Validate card details
      this.validator.validateCardDetails(params);

      // Create payment method with Stripe
      const paymentMethod = await this.stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: SecurityUtil.sanitizeCardNumber(params.number),
          exp_month: params.expMonth,
          exp_year: params.expYear,
          cvc: params.cvc
        }
      });

      return {
        id: paymentMethod.id,
        type: 'card',
        last4: paymentMethod.card.last4,
        brand: paymentMethod.card.brand,
        expiryMonth: params.expMonth,
        expiryYear: params.expYear,
        isDefault: false
      };
    } catch (error) {
      throw this.handlePaymentError(error);
    }
  }

  async processPayment(params: {
    amount: number;
    currency: string;
    paymentMethodId: string;
    description?: string;
  }): Promise<PaymentIntent> {
    try {
      // Validate payment parameters
      this.validator.validatePaymentParams(params);

      // Create payment intent
      const paymentIntent = await this.stripe.createPaymentIntent({
        amount: params.amount,
        currency: params.currency,
        payment_method: params.paymentMethodId,
        description: params.description,
        confirm: true
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        paymentMethodId: params.paymentMethodId
      };
    } catch (error) {
      throw this.handlePaymentError(error);
    }
  }

  private handlePaymentError(error: any): PaymentError {
    return {
      code: error.code || 'PAYMENT_ERROR',
      message: error.message || 'An error occurred during payment processing'
    };
  }
}