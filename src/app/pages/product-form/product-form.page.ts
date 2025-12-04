import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss']   // <- garante carregar o SCSS
})
export class ProductFormPage implements OnInit {

  id: string | null = null;

  product = {
    name: "",
    brand: "",
    price: 0,
    stock: 0,
    description: ""
  };

  constructor(
    private route: ActivatedRoute,
    private api: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== "new") {
      this.api.get(this.id!).subscribe((res: any) => {
        this.product = res;
      });
    }
  }

  save() {
    if (this.id === "new") {
      this.api.create(this.product).subscribe(() => {
        this.router.navigate(['/product-list']);
      });
    } else {
      this.api.update(this.id!, this.product).subscribe(() => {
        this.router.navigate(['/product-list']);
      });
    }
  }
}
