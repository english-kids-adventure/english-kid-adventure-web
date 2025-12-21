import { RegisterForm } from '../features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-pink-400 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="text-8xl animate-bounce">🍭</div>
        <h1 className="text-4xl font-black text-white italic">JOIN THE FUN!</h1>
        <RegisterForm />
      </div>
    </div>
  );
};
export default RegisterPage;
