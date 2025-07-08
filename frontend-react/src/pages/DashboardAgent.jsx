import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Input } from "../components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { FileText, Clock, CheckCircle, AlertCircle, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const DashboardAgent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const pendingRequests = [
    {
      id: "REQ-001",
      citizen: "Amadou Diallo",
      type: "Extrait de naissance",
      status: "pending",
      date: "2024-01-20",
      priority: "normal"
    },
    {
      id: "REQ-002",
      citizen: "Fatou Sow",
      type: "Casier judiciaire",
      status: "processing",
      date: "2024-01-21",
      priority: "urgent"
    },
    {
      id: "REQ-003",
      citizen: "Moussa Kane",
      type: "Certificat de nationalité",
      status: "review",
      date: "2024-01-22",
      priority: "normal"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">En attente</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">En cours</Badge>;
      case "review":
        return <Badge className="bg-blue-100 text-blue-800">À réviser</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Prioritaire</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord agent</h1>
            <p className="text-gray-600">Bienvenue dans votre espace de gestion administrative.</p>
          </div>
          {/* <Button variant="outline" onClick={handleLogout}>Déconnexion</Button> */}
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-white p-1 rounded-lg shadow">
            <TabsTrigger
              value="requests"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Demandes
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Statistiques
            </TabsTrigger>
            <TabsTrigger
              value="citizens"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Citoyens
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 hover:text-black transition rounded-lg py-2"
            >
              Rapports
            </TabsTrigger>
          </TabsList>

          {/* Demandes */}
          <TabsContent value="requests">
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">En attente</p><p className="text-2xl font-bold text-gray-900">12</p></div><AlertCircle className="w-8 h-8 text-gray-600" /></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">En cours</p><p className="text-2xl font-bold text-yellow-600">8</p></div><Clock className="w-8 h-8 text-yellow-600" /></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Terminées</p><p className="text-2xl font-bold text-green-600">45</p></div><CheckCircle className="w-8 h-8 text-green-600" /></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Aujourd'hui</p><p className="text-2xl font-bold text-blue-600">5</p></div><FileText className="w-8 h-8 text-blue-600" /></div></CardContent></Card>
            </div>

            <Card className="mb-6">
              <CardHeader><CardTitle className="flex items-center space-x-2"><Filter className="w-5 h-5" /><span>Filtres</span></CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Input placeholder="Recherche par nom ou numéro..." className="w-full md:w-1/3" />
                  <Select><SelectTrigger className="w-48"><SelectValue placeholder="Type de document" /></SelectTrigger><SelectContent><SelectItem value="birth">Extrait</SelectItem><SelectItem value="criminal">Casier</SelectItem><SelectItem value="nationality">Nationalité</SelectItem></SelectContent></Select>
                  <Select><SelectTrigger className="w-32"><SelectValue placeholder="Statut" /></SelectTrigger><SelectContent><SelectItem value="pending">En attente</SelectItem><SelectItem value="processing">En cours</SelectItem></SelectContent></Select>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <Card key={req.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{req.type}</h3>
                        <p className="text-sm text-gray-600">#{req.id} - {req.citizen}</p>
                        <div className="flex gap-2 mt-2">{getStatusBadge(req.status)} {getPriorityBadge(req.priority)}</div>
                        <p className="text-sm text-gray-500 mt-1">Demandé le {req.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Voir</Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Traiter</Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600">Rejeter</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistiques */}
          <TabsContent value="statistics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card><CardHeader><CardTitle>Mensuel</CardTitle></CardHeader><CardContent><div className="space-y-2"><p>Traitées: <strong>156</strong></p><p>Moyenne: <strong>2.3 jours</strong></p><p>Satisfaction: <strong>98%</strong></p></div></CardContent></Card>
              <Card><CardHeader><CardTitle>Par type</CardTitle></CardHeader><CardContent><div className="space-y-2"><p>Extrait: <strong>45%</strong></p><p>Casier: <strong>35%</strong></p><p>Nationalité: <strong>20%</strong></p></div></CardContent></Card>
            </div>
          </TabsContent>

          {/* Citoyens */}
          <TabsContent value="citizens">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des citoyens</CardTitle>
                <CardDescription>Rechercher un citoyen</CardDescription>
              </CardHeader>
              <CardContent>
                <Input placeholder="Nom, email ou NIN..." />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rapports */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Exports & Rapports</CardTitle>
                <CardDescription>Générez vos rapports</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">Rapport PDF</Button>
                  <Button variant="outline" className="w-full">Export CSV</Button>
                  <Button variant="outline" className="w-full">Statistiques Excel</Button>
                </div>
                <div>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Période" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Mois en cours</SelectItem>
                      <SelectItem value="last-month">Mois dernier</SelectItem>
                      <SelectItem value="quarter">Trimestre</SelectItem>
                      <SelectItem value="year">Année</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardAgent;
