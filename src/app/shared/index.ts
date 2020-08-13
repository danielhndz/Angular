import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { ExponentialPipe } from './pipes/exponential/exponential.pipe';
import { CartPipe } from './pipes/cart/cart.pipe';

export const elements: any[] = [
    FooterComponent,
    NavComponent,
    HighlightDirective,
    ExponentialPipe,
    CartPipe,
];

export * from './components/footer/footer.component';
export * from './components/nav/nav.component';
export * from './directives/highlight/highlight.directive';
export * from './pipes/exponential/exponential.pipe';
export * from  './pipes/cart/cart.pipe';
