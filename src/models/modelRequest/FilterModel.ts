export interface filterPagination {
  page?: number;
  pageSize?: number;
}
export interface filterSort {
  orderBy?: string;
  sort?: TypeSort;
}
export interface FilterModel extends filterPagination, filterSort {}
export interface Auth {
  userId?: number;
}
export interface CategoryFilter extends FilterModel {
  name?: string;
}
export interface IngredientFilter extends FilterModel {
  name?: string;
}
export interface FavouriteFilterRequest extends FilterModel {
  name?: string;
}
export interface FavouriteFilter extends FavouriteFilterRequest, Auth {}
export interface HintIngredientFilterRequest extends FilterModel {
  ingredientIds: string;
}
export interface RatingFilter extends FilterModel {
  recipeId?: string;
  star?: number;
  userId?: string;
}
export interface recipeFilterModel extends FilterModel {
  ingredientIds: string;
  categoryIds: string;
}
export interface userFilterModel extends FilterModel {
  username?: string;
}
export interface HintIngredient extends HintIngredientFilterRequest, Auth {}
export interface filterHintRecipe extends Auth, filterPagination {}
export enum TypeSort {
  "DESC",
  "ASC",
}
