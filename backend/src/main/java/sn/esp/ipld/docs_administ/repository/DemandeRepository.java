package sn.esp.ipld.docs_administ.repository;

import org.springframework.data.repository.CrudRepository;
import sn.esp.ipld.docs_administ.entity.Demande;
import sn.esp.ipld.docs_administ.entity.Utilisateur;
import sn.esp.ipld.docs_administ.enumeration.StatutDemande;

import java.util.List;

public interface DemandeRepository extends CrudRepository<Demande, Long> {
    List<Demande> findByUtilisateur(Utilisateur utilisateur);
    List<Demande> findByAgentTraitant(Utilisateur agentTraitant);
    List<Demande> findByStatut(StatutDemande statut);
    List<Demande> findByUtilisateurOrderByDateCreationDesc(Utilisateur utilisateur);
    List<Demande> findByAgentTraitantOrderByDateCreationDesc(Utilisateur agentTraitant);
} 