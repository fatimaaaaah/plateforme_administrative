package sn.esp.ipld.docs_administ.dto;

import sn.esp.ipld.docs_administ.enumeration.StatutDemande;
import sn.esp.ipld.docs_administ.enumeration.TypeDocument;

import java.time.Instant;

public record DemandeResponseDto(
    Long id,
    TypeDocument typeDocument,
    String motifDemande,
    String informationsSupplementaires,
    StatutDemande statut,
    Instant dateCreation,
    Instant dateTraitement,
    Instant dateFinTraitement,
    String commentaireAgent,
    String nomUtilisateur,
    String nomAgentTraitant,
    Boolean documentDisponible
) {} 