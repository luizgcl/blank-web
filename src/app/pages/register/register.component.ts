import { LogoComponent } from '@/app/components/logo/logo.component';
import { PlansService } from '@/app/services/plans/plans.service';
import { PrimeModule } from '@/app/shared/prime/prime.module';
import { Plan } from '@/core/models/plan';
import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface SubscriptionType {
  label: string;
  value: 'MONTHLY' | 'QUARTERLY' | 'BIANNUAL' | 'YEARLY';
  discountPercentage: number;
  monthQuantity: number;
}

interface InstallmentOption {
  label: string;
  value: number;
  installmentValue: number;
  quantity: number;
}

@Component({
  selector: 'app-register',
  imports: [
    LogoComponent,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  providers: [CurrencyPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  plansService = inject(PlansService);
  formBuilder = inject(FormBuilder);
  currencyPipe = inject(CurrencyPipe);

  plans$ = this.plansService.fetchPlans();

  selectedPlan!: Plan;

  subscriptionTypes: SubscriptionType[] = [
    {
      label: 'Mensal',
      value: 'MONTHLY',
      discountPercentage: 0,
      monthQuantity: 1,
    },
    {
      label: 'Trimestral',
      value: 'QUARTERLY',
      discountPercentage: 5,
      monthQuantity: 3,
    },
    {
      label: 'Semestral',
      value: 'BIANNUAL',
      discountPercentage: 10,
      monthQuantity: 6,
    },
    {
      label: 'Anual',
      value: 'YEARLY',
      discountPercentage: 20,
      monthQuantity: 12,
    },
  ];

  selectedSubscriptionType!: SubscriptionType;

  subscriptionValue = 0;

  installmentOption!: InstallmentOption;

  subscriptionOptions: InstallmentOption[] = [];

  totalValue = 0;

  documentTypes = ['CPF', 'CNPJ'];

  selectedDocumentType!: 'CPF' | 'CNPJ';

  subscriptionForm = this.formBuilder.group({
    planId: [null, Validators.required],
    subscriptionType: [null, Validators.required],
    installments: [null, Validators.required],
    installmentValue: [null, Validators.required],
    installmentTotalValue: [null, Validators.required],
    planDiscount: [null, Validators.required],
  });
}
