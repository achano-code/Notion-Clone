import { authRepository } from '@/modules/auth/auth.repository';
import { useCurrentUserStore } from '@/modules/auth/current-user.state';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const currentUserStore = useCurrentUserStore();

  const signIn = async () => {
    const user = await authRepository.signIn(email, password);
    currentUserStore.set(user);
  };

  if (currentUserStore.currentUser != null) return <Navigate replace to="/" />;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Notionクローン</h2>
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  メールアドレス
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring--500 focus:border--500 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  パスワード
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    placeholder="パスワード"
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:ring--500 focus:border--500 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  disabled={email == '' || password == ''}
                  onClick={signIn}
                  className="focus:ring--500 flex w-full justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  ログイン
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                登録は
                <Link className="underline" to={'/signup'}>
                  こちら
                </Link>
                から
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
