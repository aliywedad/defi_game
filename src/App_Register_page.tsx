import React, { useState } from 'react';

function AppRegisterPage() {
  const [users, setUsers] = useState<{ username: string; password: string }[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleRegister = (username: string, password: string) => {
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setAlert({
        type: 'error',
        message: 'Ce nom d’utilisateur existe déjà. Veuillez en choisir un autre.',
      });
    } else {
      setUsers([...users, { username, password }]);
      setShowRegister(false);
      setAlert({
        type: 'success',
        message: 'Compte créé avec succès. Connectez-vous.',
      });
    }
  };

  const handleLogin = (username: string, password: string) => {
    const userExists = users.some(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      setIsLoggedIn(true);
    } else {
      setAlert({
        type: 'error',
        message: "Nom d'utilisateur ou mot de passe incorrect.",
      });
    }
  };

  if (isLoggedIn) {
    return <WelcomePage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 w-full">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl shadow-lg transition-all hover:shadow-2xl">
        {alert && (
          <div
            className={`mb-4 p-4 rounded-lg shadow-md ${
              alert.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            } flex justify-between items-center`}
          >
            <p>{alert.message}</p>
            <button
              className="text-white hover:text-gray-300 transition focus:outline-none"
              onClick={() => setAlert(null)}
            >
              &times;
            </button>
          </div>
        )}

        {showRegister ? (
          <RegisterForm onRegister={handleRegister} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}

        <div className="text-center mt-6">
          <button
            className="text-sm font-medium text-gray-400 hover:text-white transition"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister
              ? 'Vous avez déjà un compte ? Connectez-vous'
              : "Pas de compte ? Inscrivez-vous"}
          </button>
        </div>
      </div>
    </div>
  );
}

function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B4376] via-[#605EA1] to-[#3E3865] flex items-center justify-center">
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-10 rounded-2xl shadow-2xl text-center transform transition hover:scale-105">
        <h1 className="text-4xl font-bold text-white mb-6">Bienvenue !</h1>
        <p className="text-gray-300 text-lg">
          Vous êtes connecté avec succès. 🎉
        </p>
      </div>
    </div>
  );
}


function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-medium text-white text-center mb-6">Connexion</h2>
      <InputField
        label="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <InputField
        label="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        type="submit"
className="w-full py-2 rounded-lg bg-[#4B4376] text-white font-semibold hover:bg-[#3E3865] transition transform hover:scale-105"
      >
        Se connecter
      </button>
    </form>
  );
}

function RegisterForm({
  onRegister,
}: {
  onRegister: (username: string, password: string) => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-medium text-white text-center mb-6">Inscription</h2>
      <InputField
        label="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <InputField
        label="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-[#605EA1] text-white font-semibold hover:bg-[#504e91] transition transform hover:scale-105"
        >
        S’inscrire
      </button>
    </form>
  );
}

function InputField({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}) {
  return (
    <div>
      <label className="block text-gray-300 font-medium mb-2">{label}</label>
      <input
        type={type}
        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-800 text-gray-300"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default AppRegisterPage;
