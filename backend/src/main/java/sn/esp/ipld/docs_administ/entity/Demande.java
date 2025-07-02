package sn.esp.ipld.docs_administ.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sn.esp.ipld.docs_administ.enumeration.StatutDemande;
import sn.esp.ipld.docs_administ.enumeration.TypeDocument;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "demande")
public class Demande {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "type_document")
    private TypeDocument typeDocument;
    
    @Column(name = "motif_demande", columnDefinition = "TEXT")
    private String motifDemande;
    
    @Column(name = "informations_supplementaires", columnDefinition = "TEXT")
    private String informationsSupplementaires;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private StatutDemande statut = StatutDemande.EN_ATTENTE;
    
    @Column(name = "date_creation")
    private Instant dateCreation = Instant.now();
    
    @Column(name = "date_traitement")
    private Instant dateTraitement;
    
    @Column(name = "date_fin_traitement")
    private Instant dateFinTraitement;
    
    @Column(name = "commentaire_agent", columnDefinition = "TEXT")
    private String commentaireAgent;
    
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;
    
    @ManyToOne
    @JoinColumn(name = "agent_traitant_id")
    private Utilisateur agentTraitant;
    
    @OneToOne(mappedBy = "demande", cascade = CascadeType.ALL)
    private Document document;
} 