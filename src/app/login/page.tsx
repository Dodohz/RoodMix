import AuthForm from "@/components/AuthForm";

export const metadata = { title: "تسجيل الدخول | سوق دي زاد" };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
