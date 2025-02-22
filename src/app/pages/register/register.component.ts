import { LogoComponent } from '@/app/components/logo/logo.component';
import { PlansService } from '@/app/services/plans/plans.service';
import { PrimeModule } from '@/app/shared/prime/prime.module';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type SubscriptionTypeValue = 'MONTHLY' | 'QUARTERLY' | 'BIANNUAL' | 'YEARLY';
type DocumentType = 'CPF' | 'CNPJ';

interface SubscriptionType {
  label: string;
  value: 'MONTHLY' | 'QUARTERLY' | 'BIANNUAL' | 'YEARLY';
  discountPercentage: number;
  monthQuantity: number;
}

@Component({
  selector: 'app-register',
  imports: [
    LogoComponent,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
    CommonModule,
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
  selectedPlanValue: number | null = null;

  documentTypes = ['CPF', 'CNPJ'];

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

  subscriptionForm = this.formBuilder.group({
    planId: new FormControl<number | null>(null, Validators.required),
    subscriptionType: new FormControl<SubscriptionTypeValue | null>(
      null,
      Validators.required
    ),
    installments: new FormControl<number | null>(null, Validators.required),
    planDiscount: new FormControl<number | null>(null, Validators.required),
  });

  userForm = this.formBuilder.group({
    companyName: [null],
    firstName: [null],
    lastName: [null],
    email: [null, [Validators.required, Validators.email]],
    documentNumber: [null],
    documentType: new FormControl<DocumentType | null>(
      'CPF',
      Validators.required
    ),
    phone: [null],
    password: [null],
    confirmPassword: [null],
  });

  constructor() {
    this.subscriptionForm.get('planId')!.valueChanges.subscribe((id) => {
      this.plans$.subscribe((plans) => {
        this.selectedPlanValue =
          plans.find((plan) => plan.id === id)?.price ?? null;
      });
    });
  }

  handleSelectSubscriptionType(subscriptionType: SubscriptionType) {
    this.subscriptionForm.patchValue({
      subscriptionType: subscriptionType.value,
      planDiscount: subscriptionType.discountPercentage,
      installments: subscriptionType.monthQuantity,
    });
  }

  getPlanValueWithDiscount(value: number) {
    const { installments, planDiscount } = this.subscriptionForm.value;

    const discountValue =
      (value * (installments ?? 1) * (planDiscount ?? 0)) / 100;

    return value * (installments ?? 1) - discountValue;
  }
}
