import { LoginForm } from '../features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="text-8xl animate-bounce">🎒</div>
        <h1 className="text-4xl font-black text-white italic">HELLO KID!</h1>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
