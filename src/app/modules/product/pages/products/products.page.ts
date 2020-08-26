import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../business/product.service';

@Component({
  selector: 'ag-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
}
