import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Checkbox } from "../components/ui/Checkbox";
import { FiFileText, FiUpload, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-hot-toast"; // ou ta propre lib de toast
import useDocumentTypes from "../hooks/useDocumentTypes"; // adapte le chemin
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "../components/ui/Select";


const DocumentRequest = () => {
  const { documentTypes, loading } = useDocumentTypes();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedType = searchParams.get('type');

  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    dateNaissance: "",
    lieuNaissance: "",
    adresse: "",
    telephone: "",
    email: "",
    motif: "",
    urgence: false
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Pré-sélectionner le type de document si passé en paramètre
  useEffect(() => {
    if (preSelectedType && documentTypes.length > 0) {
      const documentExists = documentTypes.find(doc => doc.id === preSelectedType);
      if (documentExists) {
        setSelectedDocumentType(preSelectedType);
      }
    }
  }, [preSelectedType, documentTypes]);

  const selectedDocument = documentTypes.find(doc => doc.id === selectedDocumentType);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDocumentType) {
      toast.error("Veuillez sélectionner un type de document");
      return;
    }

    // Vérifier que tous les champs requis sont remplis
    const requiredFields = ["prenom", "nom", "dateNaissance", "lieuNaissance", "adresse", "telephone", "email"];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Simuler l'envoi de la demande
    toast.success("Votre demande a été soumise avec succès !");
    console.log("Demande soumise:", { selectedDocumentType, formData, uploadedFiles });

    // Rediriger vers le dashboard après soumission
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nouvelle demande</h1>
              <p className="text-gray-600">Remplissez le formulaire pour faire votre demande</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sélection du type de document */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiFileText className="w-5 h-5" />
                  <span>Type de document</span>
                </CardTitle>
                <CardDescription>Sélectionnez le document que vous souhaitez demander</CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                value={selectedDocumentType}
                onValueChange={(value) => {
                    console.log("Selected type:", value);
                    setSelectedDocumentType(value);
                }}
                >

                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez un type de document" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        <div className="flex flex-col">
                          <span>{doc.nom}</span>
                          <span className="text-sm text-gray-500">{doc.prix.toLocaleString()} FCFA - {doc.delaiTraitement} jours</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedDocument && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Documents requis :</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {selectedDocument.documentsRequis.map((doc, index) => (
                        <li key={index}>• {doc}</li>
                      ))}
                    </ul>
                    <div className="mt-2 text-sm text-blue-700">
                      <strong>Prix :</strong> {selectedDocument.prix.toLocaleString()} FCFA | 
                      <strong> Délai :</strong> {selectedDocument.delaiTraitement} jours
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Renseignez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => handleInputChange("prenom", e.target.value)}
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => handleInputChange("nom", e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateNaissance">Date de naissance *</Label>
                    <Input
                      id="dateNaissance"
                      type="date"
                      value={formData.dateNaissance}
                      onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lieuNaissance">Lieu de naissance *</Label>
                    <Input
                      id="lieuNaissance"
                      value={formData.lieuNaissance}
                      onChange={(e) => handleInputChange("lieuNaissance", e.target.value)}
                      placeholder="Votre lieu de naissance"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange("telephone", e.target.value)}
                      placeholder="+221 XX XXX XX XX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse complète *</Label>
                  <Textarea
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) => handleInputChange("adresse", e.target.value)}
                    placeholder="Votre adresse complète"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motif">Motif de la demande</Label>
                  <Textarea
                    id="motif"
                    value={formData.motif}
                    onChange={(e) => handleInputChange("motif", e.target.value)}
                    placeholder="Précisez le motif de votre demande (optionnel)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload de documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FiUpload className="w-5 h-5" />
                  <span>Documents justificatifs</span>
                </CardTitle>
                <CardDescription>
                  Téléchargez les documents requis (formats acceptés : PDF, JPG, PNG)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="mb-4"
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Fichiers téléchargés :</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle>Options de traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgence"
                    checked={formData.urgence}
                    onCheckedChange={(checked) => handleInputChange("urgence", checked)}
                  />
                  <Label htmlFor="urgence">
                    Traitement en urgence (+50% du tarif normal)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Résumé et soumission */}
            {selectedDocument && (
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de la demande</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Document :</strong> {selectedDocument.nom}</p>
                    <p><strong>Prix :</strong> {(selectedDocument.prix * (formData.urgence ? 1.5 : 1)).toLocaleString()} FCFA</p>
                    <p><strong>Délai :</strong> {formData.urgence ? Math.ceil(selectedDocument.delaiTraitement / 2) : selectedDocument.delaiTraitement} jours</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Soumettre la demande
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentRequest;
