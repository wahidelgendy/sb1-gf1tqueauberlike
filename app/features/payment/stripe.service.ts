import { Injectable } from '@nativescript/core';
import { HttpClient } from '../../services/http.service';
import { Environment } from '../../config/environment';

@Injectable()
export class StripeService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private http: HttpClient;

  constructor() {
    this.apiKey = Environment.STRIPE_API_KEY;
    this.apiUrl = Environment.STRIPE_API_URL;
    this.http = new HttpClient();
  }

  async createPaymentMethod(params: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/payment_methods`, params, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async createPaymentIntent(params: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/payment_intents`, params, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async confirmPaymentIntent(paymentIntentId: string, params: any): Promise<any> {
    return this.http.post(
      `${this.apiUrl}/payment_intents/${paymentIntentId}/confirm`,
      params,
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}