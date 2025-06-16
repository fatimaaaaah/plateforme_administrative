import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";





const Home = () => {
  const services = [
    {
      title: "Extrait de naissance",
      description: "Demandez votre extrait de naissance en ligne",
      icon: FiFileText,
      color: "text-green-600"
    },
    {
      title: "Certificat de domicille",
      description: "Obtenez votre Certificat de domicille",
      icon: FiFileText,
      color: "text-yellow-600"
    },
    {
      title: "Certificat de nationalité",
      description: "Demandez votre certificat de nationalité sénégalaise",
      icon: FiFileText,
      color: "text-red-600"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Inscription",
      description: "Créez votre compte citoyen sécurisé"
    },
    {
      step: "2", 
      title: "Demande",
      description: "Remplissez le formulaire en ligne"
    },
    {
      step: "3",
      title: "Paiement",
      description: "Effectuez le paiement sécurisé"
    },
    {
      step: "4",
      title: "Téléchargement",
      description: "Récupérez votre document"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      <Navbar />

      {/* Hero Section */}
        <section
  className="relative container mx-auto px-4 py-16 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/mon-image.jpg')" }}
>
  {/* Couche blanche semi-transparente en overlay */}
  <div className="absolute inset-0 bg-white bg-opacity-70"></div>

  {/* Contenu placé au-dessus de l'overlay */}
  <div className="relative text-center max-w-4xl mx-auto py-16">
    <h1 className="text-5xl font-bold text-gray-900 mb-6">
      Services Administratifs
      <span className="block text-green-600">République du Sénégal</span>
    </h1>
    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
      Simplifiez vos démarches administratives. Demandez vos documents officiels
      en ligne, 24h/24 et 7j/7, depuis le confort de votre domicile.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
        <Link to="/signup">Créer un compte</Link>
      </Button>
      <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
        <Link to="/login">Se connecter</Link>
      </Button>
    </div>
  </div>
</section>



      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Documents disponibles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <service.icon className={`w-12 h-12 mx-auto mb-4 ${service.color}`} />
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                    <Link to="/login">Faire une demande</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
            <div className="text-gray-600">Documents délivrés</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">48h</div>
            <div className="text-gray-600">Délai moyen</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-600 mb-2">99%</div>
            <div className="text-gray-600">Satisfaction client</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
