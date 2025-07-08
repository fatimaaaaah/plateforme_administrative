import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import {
  Users,
  FileText,
  Shield,
  Settings,
  BarChart3,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import AgentManagement from "../components/AgentManagement";
import ChefQuartierManagement from "../components/ChefQuartierManagement";

const DashboardAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Administrateur</h1>
            <p className="text-gray-600">Gestion et supervision du système</p>
          </div>
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Administrateur
          </Badge>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs Total</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+20.1% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demandes Total</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
              <p className="text-xs text-muted-foreground">+15.3% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agents Actifs</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+2 nouveaux</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Résolution</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+1.2% ce mois</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-lg shadow">
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Agents
            </TabsTrigger>
            <TabsTrigger
              value="chefs"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Chefs Quartier
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Système
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Rapports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Utilisateurs</CardTitle>
                <CardDescription>
                  Gérer les comptes citoyens et leurs permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <UserCheck className="h-8 w-8 text-green-600" />
                      <div>
                        <h3 className="font-medium">Comptes Citoyens</h3>
                        <p className="text-sm text-gray-600">1,189 comptes actifs</p>
                      </div>
                    </div>
                    <Button variant="outline">Gérer</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="h-8 w-8 text-orange-600" />
                      <div>
                        <h3 className="font-medium">Comptes Suspendus</h3>
                        <p className="text-sm text-gray-600">23 comptes nécessitent attention</p>
                      </div>
                    </div>
                    <Button variant="outline">Examiner</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentManagement />
          </TabsContent>

          <TabsContent value="chefs" className="space-y-6">
            <ChefQuartierManagement />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Système</CardTitle>
                <CardDescription>
                  Paramètres et configuration du système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Settings className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium">Types de Documents</h3>
                        <p className="text-sm text-gray-600">
                          Gérer les types de documents disponibles
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Configurer</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Shield className="h-8 w-8 text-red-600" />
                      <div>
                        <h3 className="font-medium">Sécurité</h3>
                        <p className="text-sm text-gray-600">Paramètres de sécurité et accès</p>
                      </div>
                    </div>
                    <Button variant="outline">Sécurité</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rapports et Statistiques</CardTitle>
                <CardDescription>Analyses et rapports du système</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Rapport Mensuel</h3>
                      <p className="text-sm text-gray-600">Statistiques de performance du mois</p>
                    </div>
                    <Button>Générer</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Analyse des Demandes</h3>
                      <p className="text-sm text-gray-600">Tendances et patterns des demandes</p>
                    </div>
                    <Button variant="outline">Analyser</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardAdmin;
