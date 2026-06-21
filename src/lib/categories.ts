import { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "vehicules",
    name: "سيارات ومركبات",
    icon: "Car",
    color: "#e81111",
    count: 48230,
    subcategories: [
      { slug: "voitures", name: "سيارات" },
      { slug: "motos", name: "دراجات نارية" },
      { slug: "camions", name: "شاحنات" },
      { slug: "pieces-auto", name: "قطع غيار" },
      { slug: "location-vehicules", name: "كراء السيارات" },
    ],
  },
  {
    slug: "immobilier",
    name: "عقارات",
    icon: "Home",
    color: "#0e9f6e",
    count: 36120,
    subcategories: [
      { slug: "vente-appartement", name: "شقق للبيع" },
      { slug: "location-appartement", name: "شقق للكراء" },
      { slug: "vente-villa", name: "فيلات للبيع" },
      { slug: "terrain", name: "أراضي" },
      { slug: "local-commercial", name: "محلات تجارية" },
    ],
  },
  {
    slug: "telephones",
    name: "هواتف وأجهزة لوحية",
    icon: "Smartphone",
    color: "#3f83f8",
    count: 27840,
    subcategories: [
      { slug: "smartphones", name: "هواتف ذكية" },
      { slug: "tablettes", name: "أجهزة لوحية" },
      { slug: "accessoires-tel", name: "ملحقات الهاتف" },
    ],
  },
  {
    slug: "informatique",
    name: "إعلام آلي",
    icon: "Laptop",
    color: "#9061f9",
    count: 19450,
    subcategories: [
      { slug: "ordinateurs-portables", name: "حواسيب محمولة" },
      { slug: "ordinateurs-bureau", name: "حواسيب مكتبية" },
      { slug: "composants", name: "مكونات" },
      { slug: "peripheriques", name: "ملحقات" },
    ],
  },
  {
    slug: "maison-meubles",
    name: "أثاث وتجهيزات منزلية",
    icon: "Sofa",
    color: "#ff8a4c",
    count: 15230,
    subcategories: [
      { slug: "meubles", name: "أثاث" },
      { slug: "electromenager", name: "أجهزة كهرومنزلية" },
      { slug: "decoration", name: "ديكور" },
    ],
  },
  {
    slug: "mode",
    name: "ملابس وأناقة",
    icon: "Shirt",
    color: "#e74694",
    count: 12870,
    subcategories: [
      { slug: "vetements-homme", name: "ملابس رجالية" },
      { slug: "vetements-femme", name: "ملابس نسائية" },
      { slug: "chaussures", name: "أحذية" },
      { slug: "montres-bijoux", name: "ساعات ومجوهرات" },
    ],
  },
  {
    slug: "emploi",
    name: "وظائف وأعمال",
    icon: "Briefcase",
    color: "#0694a2",
    count: 9340,
    subcategories: [
      { slug: "offres-emploi", name: "عروض عمل" },
      { slug: "demandes-emploi", name: "طلبات عمل" },
      { slug: "formations", name: "تكوين" },
    ],
  },
  {
    slug: "services",
    name: "خدمات",
    icon: "Wrench",
    color: "#ff5a1f",
    count: 8120,
    subcategories: [
      { slug: "reparation", name: "تصليح وصيانة" },
      { slug: "transport", name: "نقل" },
      { slug: "evenements", name: "مناسبات" },
    ],
  },
  {
    slug: "loisirs",
    name: "هوايات وترفيه",
    icon: "Gamepad2",
    color: "#7e3af2",
    count: 6540,
    subcategories: [
      { slug: "jeux-video", name: "ألعاب فيديو" },
      { slug: "sport", name: "رياضة" },
      { slug: "musique", name: "آلات موسيقية" },
      { slug: "livres", name: "كتب" },
    ],
  },
  {
    slug: "animaux",
    name: "حيوانات",
    icon: "PawPrint",
    color: "#057a55",
    count: 4210,
    subcategories: [
      { slug: "chiens", name: "كلاب" },
      { slug: "chats", name: "قطط" },
      { slug: "oiseaux", name: "طيور" },
      { slug: "accessoires-animaux", name: "مستلزمات الحيوانات" },
    ],
  },
  {
    slug: "materiel-pro",
    name: "معدات مهنية",
    icon: "Factory",
    color: "#5850ec",
    count: 3870,
    subcategories: [
      { slug: "agricole", name: "معدات فلاحية" },
      { slug: "btp", name: "معدات البناء" },
      { slug: "industrie", name: "معدات صناعية" },
    ],
  },
  {
    slug: "autres",
    name: "أخرى",
    icon: "Package",
    color: "#6b7280",
    count: 5410,
    subcategories: [
      { slug: "divers", name: "متنوعات" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const wilayas = [
  "أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة",
  "تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة",
  "سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة",
  "وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة",
  "سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان",
];
