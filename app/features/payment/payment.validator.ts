export class PaymentValidator {
  validateCardDetails(params: {
    number: string;
    expMonth: number;
    expYear: number;
    cvc: string;
  }): void {
    if (!this.isValidCardNumber(params.number)) {
      throw new Error('Invalid card number');
    }

    if (!this.isValidExpiryDate(params.expMonth, params.expYear)) {
      throw new Error('Invalid expiry date');
    }

    if (!this.isValidCVC(params.cvc)) {
      throw new Error('Invalid CVC');
    }
  }

  validatePaymentParams(params: {
    amount: number;
    currency: string;
    paymentMethodId: string;
  }): void {
    if (!params.amount || params.amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (!params.currency || params.currency.length !== 3) {
      throw new Error('Invalid currency code');
    }

    if (!params.paymentMethodId) {
      throw new Error('Payment method is required');
    }
  }

  private isValidCardNumber(number: string): boolean {
    return /^\d{16}$/.test(number.replace(/\s/g, ''));
  }

  private isValidExpiryDate(month: number, year: number): boolean {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    return (
      month >= 1 &&
      month <= 12 &&
      year >= currentYear &&
      (year > currentYear || month >= currentMonth)
    );
  }

  private isValidCVC(cvc: string): boolean {
    return /^\d{3,4}$/.test(cvc);
  }
}