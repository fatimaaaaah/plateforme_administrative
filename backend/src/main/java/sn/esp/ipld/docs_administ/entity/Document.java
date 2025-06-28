package sn.esp.ipld.docs_administ.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "document")
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nom_fichier")
    private String nomFichier;
    
    @Column(name = "chemin_fichier")
    private String cheminFichier;
    
    @Column(name = "type_mime")
    private String typeMime;
    
    @Column(name = "taille_fichier")
    private Long tailleFichier;
    
    @Column(name = "date_creation")
    private Instant dateCreation = Instant.now();
    
    @OneToOne
    @JoinColumn(name = "demande_id")
    private Demande demande;
} 