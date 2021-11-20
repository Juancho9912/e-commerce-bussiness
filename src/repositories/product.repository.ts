import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Product, ProductRelations, Category, ProductCategory, Image, Brand} from '../models';
import {ProductCategoryRepository} from './product-category.repository';
import {CategoryRepository} from './category.repository';
import {ImageRepository} from './image.repository';
import {BrandRepository} from './brand.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype._id,
  ProductRelations
> {

  public readonly categories: HasManyThroughRepositoryFactory<Category, typeof Category.prototype._id,
          ProductCategory,
          typeof Product.prototype._id
        >;

  public readonly images: HasManyRepositoryFactory<Image, typeof Product.prototype._id>;

  public readonly brand: BelongsToAccessor<Brand, typeof Product.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('ImageRepository') protected imageRepositoryGetter: Getter<ImageRepository>, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>,
  ) {
    super(Product, dataSource);
    this.brand = this.createBelongsToAccessorFor('brand', brandRepositoryGetter,);
    this.registerInclusionResolver('brand', this.brand.inclusionResolver);
    this.images = this.createHasManyRepositoryFactoryFor('images', imageRepositoryGetter,);
    this.registerInclusionResolver('images', this.images.inclusionResolver);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoryRepositoryGetter, productCategoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
