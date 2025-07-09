package sn.esp.ipld.docs_administ.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import sn.esp.ipld.docs_administ.dto.DemandeDto;
import sn.esp.ipld.docs_administ.dto.DemandeResponseDto;
import sn.esp.ipld.docs_administ.dto.TraitementDemandeDto;
import sn.esp.ipld.docs_administ.entity.Demande;
import sn.esp.ipld.docs_administ.entity.Document;
import sn.esp.ipld.docs_administ.entity.Utilisateur;
import sn.esp.ipld.docs_administ.enumeration.StatutDemande;
import sn.esp.ipld.docs_administ.enumeration.TypeRole;
import sn.esp.ipld.docs_administ.repository.DemandeRepository;
import sn.esp.ipld.docs_administ.repository.DocumentRepository;
import sn.esp.ipld.docs_administ.repository.UtilisateurRepository;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DemandeService {
    
    private DemandeRepository demandeRepository;
    private UtilisateurRepository utilisateurRepository;
    private DocumentRepository documentRepository;
    
    public DemandeResponseDto creerDemande(DemandeDto demandeDto, String emailUtilisateur) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(emailUtilisateur)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        Demande demande = new Demande();
        demande.setTypeDocument(demandeDto.typeDocument());
        demande.setMotifDemande(demandeDto.motifDemande());
        demande.setInformationsSupplementaires(demandeDto.informationsSupplementaires());
        demande.setUtilisateur(utilisateur);
        demande.setStatut(StatutDemande.EN_ATTENTE);
        
        demande = demandeRepository.save(demande);
        
        return convertirEnDto(demande);
    }
    
    public List<DemandeResponseDto> getDemandesUtilisateur(String emailUtilisateur) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(emailUtilisateur)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        return demandeRepository.findByUtilisateurOrderByDateCreationDesc(utilisateur)
                .stream()
                .map(this::convertirEnDto)
                .collect(Collectors.toList());
    }
    
    public List<DemandeResponseDto> getDemandesEnAttente() {
        return demandeRepository.findByStatut(StatutDemande.EN_ATTENTE)
                .stream()
                .map(this::convertirEnDto)
                .collect(Collectors.toList());
    }
    
    public List<DemandeResponseDto> getDemandesAgent(String emailAgent) {
        Utilisateur agent = utilisateurRepository.findByEmail(emailAgent)
                .orElseThrow(() -> new RuntimeException("Agent non trouvé"));
        
        return demandeRepository.findByAgentTraitantOrderByDateCreationDesc(agent)
                .stream()
                .map(this::convertirEnDto)
                .collect(Collectors.toList());
    }
    
    public DemandeResponseDto traiterDemande(TraitementDemandeDto traitementDto, String emailAgent) {
        Utilisateur agent = utilisateurRepository.findByEmail(emailAgent)
                .orElseThrow(() -> new RuntimeException("Agent non trouvé"));
        
        Demande demande = demandeRepository.findById(traitementDto.demandeId())
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
        
        demande.setStatut(traitementDto.statut());
        demande.setCommentaireAgent(traitementDto.commentaireAgent());
        demande.setAgentTraitant(agent);
        
        if (traitementDto.statut() == StatutDemande.EN_COURS_TRAITEMENT) {
            demande.setDateTraitement(Instant.now());
        } else if (traitementDto.statut() == StatutDemande.TRAITEE || 
                   traitementDto.statut() == StatutDemande.REJETEE) {
            demande.setDateFinTraitement(Instant.now());
        }
        
        demande = demandeRepository.save(demande);
        
        return convertirEnDto(demande);
    }
    
    public void ajouterDocument(Long demandeId, String nomFichier, String cheminFichier, 
                               String typeMime, Long tailleFichier) {
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
        
        Document document = new Document();
        document.setNomFichier(nomFichier);
        document.setCheminFichier(cheminFichier);
        document.setTypeMime(typeMime);
        document.setTailleFichier(tailleFichier);
        document.setDemande(demande);
        
        documentRepository.save(document);
        
        // Mettre à jour le statut de la demande
        demande.setStatut(StatutDemande.TRAITEE);
        demande.setDateFinTraitement(Instant.now());
        demandeRepository.save(demande);
    }
    
    public Document getDocument(Long demandeId) {
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
        
        return documentRepository.findByDemande(demande)
                .orElseThrow(() -> new RuntimeException("Document non trouvé"));
    }
    
    private DemandeResponseDto convertirEnDto(Demande demande) {
        Document document = documentRepository.findByDemande(demande).orElse(null);
        
        return new DemandeResponseDto(
                demande.getId(),
                demande.getTypeDocument(),
                demande.getMotifDemande(),
                demande.getInformationsSupplementaires(),
                demande.getStatut(),
                demande.getDateCreation(),
                demande.getDateTraitement(),
                demande.getDateFinTraitement(),
                demande.getCommentaireAgent(),
                demande.getUtilisateur() != null ? demande.getUtilisateur().getNom() : null,
                demande.getAgentTraitant() != null ? demande.getAgentTraitant().getNom() : null,
                document != null
        );
    }
} 