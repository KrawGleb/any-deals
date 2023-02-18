import { Category } from "../../../../../models/api/category";
import { AreaProps } from "../AreaProps";

export interface AdvertBasicsFormAreaProps extends AreaProps {
  category?: Category;
  onCategoryChanged: (category: Category) => void;
}
