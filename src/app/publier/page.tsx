import PublishForm from "@/components/PublishForm";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "نشر إعلان | سوق دي زاد" };

export default function PublishPage() {
  return (
    <div className="bg-gray-50">
      <div className="border-b border-gray-100 bg-white">
        <div className="container-page py-4">
          <Breadcrumb
            items={[{ label: "الرئيسية", href: "/" }, { label: "نشر إعلان" }]}
          />
          <h1 className="mt-2 text-2xl font-extrabold text-ink">
            انشر إعلانك مجاناً
          </h1>
          <p className="text-sm text-ink-light">
            املأ التفاصيل وسيصل إعلانك لآلاف المشترين
          </p>
        </div>
      </div>
      <div className="container-page py-8">
        <PublishForm />
      </div>
    </div>
  );
}
