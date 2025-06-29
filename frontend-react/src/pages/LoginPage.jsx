import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';// Importez axios
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { FileText, User, Shield, Crown, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("UTILISATEUR");
  const [email, setEmail] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const username = role === "UTILISATEUR" ? email : identifiant;

  try {
    const response = await axios.post("http://localhost:8081/api/connexion", {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userRole", response.data.role.toLowerCase());
    localStorage.setItem("userEmail", response.data.email);
    localStorage.setItem("userName", response.data.nom);

    setMessage("✅ Connexion réussie !");
    navigate(`/dashboard-${response.data.role.toLowerCase()}`);
    
  } catch (error) {
    console.error("Erreur de connexion:", error);
    setMessage(`❌ ${error.response?.data?.message || "Erreur lors de la connexion"}`);
  }
};

  const tabIcons = {
    citoyen: <User className="w-3 h-3" />,
    agent: <Shield className="w-3 h-3" />,
    admin: <Crown className="w-3 h-3" />,
    chef: <MapPin className="w-3 h-3" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
            <p className="text-gray-600">Accédez à votre espace personnel</p>
          </div>

          <Tabs defaultValue="citoyen" className="w-full" onValueChange={setRole}>
            <TabsList className="grid w-full grid-cols-4">
              {Object.keys(tabIcons).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={`flex items-center space-x-1 justify-center px-2 py-1 rounded-md transition-colors 
                    ${role === key ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                >
                  {tabIcons[key]}
                  <span className="text-xs capitalize">{key}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(tabIcons).map((key) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle>Espace {key.charAt(0).toUpperCase() + key.slice(1)}</CardTitle>
                    <CardDescription>
                      {key === "citoyen"
                        ? "Connectez-vous pour accéder à vos demandes"
                        : `Accès réservé aux ${key === "agent" ? "agents" : key + 's'}`}
                    </CardDescription>
                  </CardHeader>

                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      {key === "citoyen" ? (
                        <div className="space-y-2">
                          <Label htmlFor={`${key}-email`}>Email</Label>
                          <Input
                            id={`${key}-email`}
                            type="email"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor={`${key}-id`}>Identifiant {key}</Label>
                          <Input
                            id={`${key}-id`}
                            placeholder={`ID-${key.toUpperCase()}`}
                            value={identifiant}
                            onChange={(e) => setIdentifiant(e.target.value)}
                            required
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor={`${key}-password`}>Mot de passe</Label>
                        <Input
                          id={`${key}-password`}
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                        Se connecter
                      </Button>

                      {message && (
                        <p
                          className={`text-center font-medium text-sm mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}
                        >
                          {message}
                        </p>
                      )}

                      <div className="text-center text-sm">
                        <Link to="/forgot-password" className="text-green-600 hover:underline">
                          Mot de passe oublié ?
                        </Link>
                      </div>

                      {key === "citoyen" && (
                        <div className="text-center text-sm">
                          Pas encore de compte ?{' '}
                          <Link to="/register" className="text-green-600 hover:underline">
                            S'inscrire
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </form>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}