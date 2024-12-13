import { Observable } from '@nativescript/core';
import { PaymentService } from './payment.service';
import { PaymentMethod, PaymentIntent } from './payment.model';

export class PaymentViewModel extends Observable {
  private paymentService: PaymentService;
  private _paymentMethods: PaymentMethod[] = [];
  private _isProcessing: boolean = false;
  private _error: string | null = null;

  constructor() {
    super();
    this.paymentService = new PaymentService();
  }

  get paymentMethods(): PaymentMethod[] {
    return this._paymentMethods;
  }

  get isProcessing(): boolean {
    return this._isProcessing;
  }

  get error(): string | null {
    return this._error;
  }

  async addCard(params: {
    number: string;
    expMonth: number;
    expYear: number;
    cvc: string;
  }): Promise<void> {
    try {
      this._isProcessing = true;
      this.notifyPropertyChange('isProcessing', true);

      const paymentMethod = await this.paymentService.addPaymentMethod(params);
      this._paymentMethods.push(paymentMethod);
      
      this._error = null;
      this.notifyPropertyChange('paymentMethods', this._paymentMethods);
    } catch (error) {
      this._error = error.message;
      this.notifyPropertyChange('error', this._error);
    } finally {
      this._isProcessing = false;
      this.notifyPropertyChange('isProcessing', false);
    }
  }

  async processPayment(params: {
    amount: number;
    currency: string;
    paymentMethodId: string;
  }): Promise<PaymentIntent> {
    try {
      this._isProcessing = true;
      this.notifyPropertyChange('isProcessing', true);

      const paymentIntent = await this.paymentService.processPayment(params);
      
      this._error = null;
      return paymentIntent;
    } catch (error) {
      this._error = error.message;
      this.notifyPropertyChange('error', this._error);
      throw error;
    } finally {
      this._isProcessing = false;
      this.notifyPropertyChange('isProcessing', false);
    }
  }
}