declare module '*.png';
declare module '*.jpg';

interface Menu {
  id: number;
  title: string;
  route: string;
  imageUrl?: string;
}

interface Mushroom {
  id: number;
  name: string;
  scientificName?: string;
  imageUrl: string;
  description?: string;
  nutritionalValue?: TableRow[]; // For NutritionalValue screen
}

interface MushroomList {
  id: number;
  imageUrl: string;
  title: string;
  data: Mushroom[];
}

interface RequiredMaterial {
  material: string;
  materialUri: string;
}

interface CultivationStep {
  name: string;
  desc?: string[];
  imageUri?: string[];
  types?: CultivationStep[];
}

interface ProductionTech {
  name: string;
  introduction: string[];
  imageUri: string;
  requiredMaterials?: RequiredMaterial[];
  cultivationTech?: CultivationStep[];
  problems?: string[];
  flowChart?: string[];
}

interface ProductionTechList {
  id: number;
  title: string;
  imageUrl: string;
  data: ProductionTech;
}

interface Disease {
  id: number;
  name: string;
  imageUrl: string;
  description?: string;
}

interface TableRow {
  name: string;
  value: string;
}

interface Scheme {
  name: string;
  sector: string;
  eligibility: string;
  about: string[];
  benefit: string[];
  link: string;
  ministry: string;
}

interface GovernmentScheme {
  title: string;
  schemes: Scheme[];
}

interface RecipeItems {
  id: number;
  title: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
}

interface FAQs {
  question: string;
  answer: string;
}

interface ContactUs {
  name: string;
  designation: string;
  contact?: string;
  email: string;
}

interface Glossary {
  term: string;
  explanation: string;
}
