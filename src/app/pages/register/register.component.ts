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

  constructor() {
    this.subscriptionForm.get('planId')?.statusChanges.subscribe(() => {
      console.log(this.subscriptionForm.value);
      this.updateTotalValue();
    });
  }

  // TODO: verificar como pegar os dados dos itens selecionados para poder atualizar o valor

  updateTotalValue() {
    if (
      !this.subscriptionForm.value.planId ||
      !this.subscriptionForm.value.subscriptionType
    )
      return;

    this.subscriptionValue =
      this.selectedPlan.price * this.selectedSubscriptionType.monthQuantity;

    const discount = 1 - this.selectedSubscriptionType.discountPercentage / 100;

    this.subscriptionValue = this.subscriptionValue * discount;
  }

  updateSubscriptionOptions() {
    this.subscriptionOptions = [];

    let tax = 0;
    for (let i = 1; i < this.selectedSubscriptionType.monthQuantity + 1; i++) {
      const valueWithTax = this.subscriptionValue * (1 + tax / 100);
      const value = (valueWithTax * 1000) / (i * 1000);

      this.subscriptionOptions.push({
        label: `${i}x de ${this.currencyPipe.transform(
          value,
          'BRL',
          'symbol'
        )}${i > 4 ? '' : ' (Sem juros)'}`,
        value: valueWithTax,
        installmentValue: value,
        quantity: i,
      });

      if (i === 4) tax = 0.15;

      if (i >= 5) tax += tax;
    }

    this.installmentOption = this.subscriptionOptions[0];
  }
}
