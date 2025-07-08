# Guide de Test de l'API Plateforme Administrative

## Prérequis
- Application Spring Boot démarrée sur `http://localhost:8080`
- Postman installé
- Import de la collection `documentation_postman.json`

## Variables d'environnement Postman

Configurez ces variables dans Postman :
- `base_url`: `http://localhost:8080`
- `token_utilisateur`: (sera rempli automatiquement après connexion)
- `token_agent`: (sera rempli automatiquement après connexion)

## Étapes de test

### 1. Création et activation des comptes

#### 1.1 Créer un utilisateur
```http
POST {{base_url}}/inscription
Content-Type: application/json

{
    "nom": "John Doe",
    "email": "john.doe@example.com",
    "mdp": "motdepasse123"
}
```

#### 1.2 Créer un agent
```http
POST {{base_url}}/agents/inscription
Content-Type: application/json

{
    "nom": "Agent Admin",
    "email": "agent.admin@example.com",
    "mdp": "motdepasse123",
    "matricule": "AGENT123"
}
```

#### 1.3 Activer les comptes
```http
POST {{base_url}}/activation
Content-Type: application/json

{
    "code": "123456"
}
```
**Note**: Le code d'activation est généré automatiquement. Vérifiez les logs de l'application ou la base de données.

### 2. Authentification

#### 2.1 Connexion utilisateur
```http
POST {{base_url}}/connexion
Content-Type: application/json

{
    "username": "john.doe@example.com",
    "password": "motdepasse123"
}
```

**Réponse attendue**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Action**: Copiez le token et mettez à jour la variable `token_utilisateur` dans Postman.

#### 2.2 Connexion agent
```http
POST {{base_url}}/connexion
Content-Type: application/json

{
    "username": "agent.admin@example.com",
    "password": "motdepasse123"
}
```

**Action**: Copiez le token et mettez à jour la variable `token_agent` dans Postman.

### 3. Gestion des demandes

#### 3.1 Créer une demande (utilisateur)
```http
POST {{base_url}}/demandes
Authorization: Bearer {{token_utilisateur}}
Content-Type: application/json

{
    "typeDocument": "EXTRACT_NAISSANCE",
    "motifDemande": "Demande d'extrait de naissance pour renouvellement de passeport",
    "informationsSupplementaires": "Né le 15/03/1990 à Dakar, parents: Papa et Maman"
}
```

**Réponse attendue**:
```json
{
    "id": 1,
    "typeDocument": "EXTRACT_NAISSANCE",
    "motifDemande": "Demande d'extrait de naissance pour renouvellement de passeport",
    "informationsSupplementaires": "Né le 15/03/1990 à Dakar, parents: Papa et Maman",
    "statut": "EN_ATTENTE",
    "dateCreation": "2024-01-15T10:30:00Z",
    "dateTraitement": null,
    "dateFinTraitement": null,
    "commentaireAgent": null,
    "nomUtilisateur": "John Doe",
    "nomAgentTraitant": null,
    "documentDisponible": false
}
```

#### 3.2 Voir les demandes en attente (agent)
```http
GET {{base_url}}/demandes/en-attente
Authorization: Bearer {{token_agent}}
```

#### 3.3 Traiter une demande (agent)
```http
POST {{base_url}}/demandes/traiter
Authorization: Bearer {{token_agent}}
Content-Type: application/json

{
    "demandeId": 1,
    "statut": "EN_COURS_TRAITEMENT",
    "commentaireAgent": "Demande en cours de traitement, documents en cours de vérification"
}
```

#### 3.4 Finaliser le traitement (agent)
```http
POST {{base_url}}/demandes/traiter
Authorization: Bearer {{token_agent}}
Content-Type: application/json

{
    "demandeId": 1,
    "statut": "TRAITEE",
    "commentaireAgent": "Document généré avec succès"
}
```

#### 3.5 Ajouter le document traité (agent)
```http
POST {{base_url}}/demandes/1/document
Authorization: Bearer {{token_agent}}
Content-Type: multipart/form-data

file: [sélectionnez un fichier PDF]
```

#### 3.6 Voir mes demandes (utilisateur)
```http
GET {{base_url}}/demandes
Authorization: Bearer {{token_utilisateur}}
```

#### 3.7 Télécharger le document (utilisateur)
```http
GET {{base_url}}/demandes/1/document
Authorization: Bearer {{token_utilisateur}}
```

## Statuts des demandes

- `EN_ATTENTE`: Demande créée, en attente de traitement
- `EN_COURS_TRAITEMENT`: Agent en train de traiter la demande
- `TRAITEE`: Demande traitée, document généré
- `REJETEE`: Demande rejetée par l'agent
- `TERMINEE`: Demande terminée (document téléchargé)

## Types de documents disponibles

- `EXTRACT_NAISSANCE`
- `CERTIFICAT_DOMICILE`
- `CERTIFICAT_VIE`
- `CERTIFICAT_CELIBAT`
- `CERTIFICAT_MARIAGE`
- `CERTIFICAT_DECES`
- `AUTRE`

## Gestion des erreurs

### Erreurs courantes

1. **401 Unauthorized**: Token JWT manquant ou invalide
2. **403 Forbidden**: Permissions insuffisantes
3. **404 Not Found**: Ressource non trouvée
4. **400 Bad Request**: Données invalides

### Exemple d'erreur
```json
{
    "timestamp": "2024-01-15T10:30:00Z",
    "status": 400,
    "error": "Bad Request",
    "message": "Demande non trouvée"
}
```

## Scripts Postman utiles

### Script pour extraire automatiquement le token
Dans l'onglet "Tests" de la requête de connexion :
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token_utilisateur", response.token);
}
```

### Script pour vérifier le statut de la réponse
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has required fields", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('id');
    pm.expect(response).to.have.property('statut');
});
``` 