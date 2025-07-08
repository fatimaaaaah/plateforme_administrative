package sn.esp.ipld.docs_administ.controller;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sn.esp.ipld.docs_administ.dto.DemandeDto;
import sn.esp.ipld.docs_administ.dto.DemandeResponseDto;
import sn.esp.ipld.docs_administ.dto.TraitementDemandeDto;
import sn.esp.ipld.docs_administ.entity.Document;
import sn.esp.ipld.docs_administ.service.DemandeService;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/demandes")
@AllArgsConstructor
public class DemandeController {
    private final DemandeService demandeService;

    @PostMapping
    public DemandeResponseDto creerDemande(@RequestBody DemandeDto demandeDto, @AuthenticationPrincipal UserDetails userDetails) {
        return demandeService.creerDemande(demandeDto, userDetails.getUsername());
    }

    @GetMapping
    public List<DemandeResponseDto> getDemandesUtilisateur(@AuthenticationPrincipal UserDetails userDetails) {
        return demandeService.getDemandesUtilisateur(userDetails.getUsername());
    }

    @GetMapping("/en-attente")
    public List<DemandeResponseDto> getDemandesEnAttente() {
        return demandeService.getDemandesEnAttente();
    }

    @GetMapping("/agent")
    public List<DemandeResponseDto> getDemandesAgent(@AuthenticationPrincipal UserDetails userDetails) {
        return demandeService.getDemandesAgent(userDetails.getUsername());
    }

    @PostMapping("/traiter")
    public DemandeResponseDto traiterDemande(@RequestBody TraitementDemandeDto traitementDto, @AuthenticationPrincipal UserDetails userDetails) {
        return demandeService.traiterDemande(traitementDto, userDetails.getUsername());
    }

    @PostMapping("/{demandeId}/document")
    public ResponseEntity<String> ajouterDocument(@PathVariable Long demandeId, @RequestParam("file") MultipartFile file) throws Exception {
        // Sauvegarde du fichier sur le disque (exemple simple)
        String dossier = "uploads/";
        Files.createDirectories(Paths.get(dossier));
        Path cheminFichier = Paths.get(dossier + file.getOriginalFilename());
        file.transferTo(cheminFichier);
        
        demandeService.ajouterDocument(
                demandeId,
                file.getOriginalFilename(),
                cheminFichier.toString(),
                file.getContentType(),
                file.getSize()
        );
        return ResponseEntity.ok("Fichier ajouté avec succès");
    }

    @GetMapping("/{demandeId}/document")
    public ResponseEntity<Resource> telechargerDocument(@PathVariable Long demandeId) throws MalformedURLException {
        Document document = demandeService.getDocument(demandeId);
        Path path = Paths.get(document.getCheminFichier());
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(document.getTypeMime()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getNomFichier() + "\"")
                .body(resource);
    }
} 