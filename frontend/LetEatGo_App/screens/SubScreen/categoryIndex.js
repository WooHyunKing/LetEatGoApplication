import ProcessDairy from './ingredients/DairyIcon';
import Crops from './ingredients/CropsIcon';
import Fruits from './ingredients/FruitsIcon';
import Grains from './ingredients/GrainsIcon';
import Meat from './ingredients/MeatIcon';
import Noodle from './ingredients/NoodleIcon';
import RiBreads from './ingredients/RiBreadIcon';
import HamSausage from './ingredients/SausageIcon';
import Seafoods from './ingredients/SeafoodIcon';
import Seasonings from './ingredients/SeasoningIcon';
import Vegetables from './ingredients/VegetableIcon';

const Category = [
  {
    id: 0,
    name: '가공/유제품',
    array: ProcessDairy,
  },
  {
    id: 1,
    name: '고기류',
    array: Meat,
  },
  {
    id: 2,
    name: '작물',
    array: Crops,
  },
  {
    id: 3,
    name: '과일',
    array: Fruits,
  },
  {
    id: 4,
    name: '면',
    array: Noodle,
  },
  {
    id: 5,
    name: '빵/떡',
    array: RiBreads,
  },
  {
    id: 6,
    name: '채소',
    array: Vegetables,
  },
  {
    id: 7,
    name: '곡물',
    array: Grains,
  },
  {
    id: 8,
    name: '해산물',
    array: Seafoods,
  },
  {
    id: 9,
    name: '햄/소시지',
    array: HamSausage,
  },
  {
    id: 10,
    name: '조미료/양념',
    array: Seasonings,
  },
];

export default Category;
