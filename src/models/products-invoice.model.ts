import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductsInvoice extends Entity {
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
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  unit_price: number;

  @property({
    type: 'string',
  })
  invoiceId?: string;

  @property({
    type: 'string',
  })
  productId?: string;

  constructor(data?: Partial<ProductsInvoice>) {
    super(data);
  }
}

export interface ProductsInvoiceRelations {
  // describe navigational properties here
}

export type ProductsInvoiceWithRelations = ProductsInvoice & ProductsInvoiceRelations;
