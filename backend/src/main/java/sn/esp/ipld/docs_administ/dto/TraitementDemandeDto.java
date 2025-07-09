package sn.esp.ipld.docs_administ.dto;

import sn.esp.ipld.docs_administ.enumeration.StatutDemande;

public record TraitementDemandeDto(
    Long demandeId,
    StatutDemande statut,
    String commentaireAgent
) {} 