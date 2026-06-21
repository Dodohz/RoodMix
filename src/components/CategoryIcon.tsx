import {
  Car,
  Home,
  Smartphone,
  Laptop,
  Sofa,
  Shirt,
  Briefcase,
  Wrench,
  Gamepad2,
  PawPrint,
  Factory,
  Package,
  LucideProps,
} from "lucide-react";

const map: Record<string, React.ComponentType<LucideProps>> = {
  Car,
  Home,
  Smartphone,
  Laptop,
  Sofa,
  Shirt,
  Briefcase,
  Wrench,
  Gamepad2,
  PawPrint,
  Factory,
  Package,
};

export default function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] || Package;
  return <Icon className={className} />;
}
