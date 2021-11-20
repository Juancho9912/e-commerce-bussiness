import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {ProductsInvoice} from './products-invoice.model';
import {Customer} from './customer.model';

@model()
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  invoice_number: number;

  @property({
    type: 'date',
    required: true,
  })
  invoice_date: string;

  @property({
    type: 'string',
    default: '',
  })
  invoice_time?: string;

  @hasMany(() => Product, {through: {model: () => ProductsInvoice}})
  products: Product[];

  @belongsTo(() => Customer)
  customerId: string;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
