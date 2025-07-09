package sn.esp.ipld.docs_administ.dto;

import sn.esp.ipld.docs_administ.enumeration.TypeDocument;

public record DemandeDto(
    TypeDocument typeDocument,
    String motifDemande,
    String informationsSupplementaires
) {} 