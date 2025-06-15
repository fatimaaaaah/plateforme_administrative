package sn.esp.ipld.docs_administ.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import sn.esp.ipld.docs_administ.dto.AuthentificationDto;
import sn.esp.ipld.docs_administ.entity.Utilisateur;
import sn.esp.ipld.docs_administ.enumeration.TypeRole;
import sn.esp.ipld.docs_administ.repository.UtilisateurRepository;
import sn.esp.ipld.docs_administ.securite.JwtService;
import sn.esp.ipld.docs_administ.service.UtilisateurService;

import java.util.Map;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
public class UtilisateurCntroller {
  private AuthenticationManager authenticationManager;
  private UtilisateurService utilisateurService;
  private JwtService jwtService;
  private UtilisateurRepository utilisateurRepository;

  @PostMapping(path = "inscription")
  public void inscription(@RequestBody Utilisateur utilisateur){
    log.info("inscription");
    this.utilisateurService.inscription(utilisateur, TypeRole.UTILISATEUR);
  }

  @PostMapping(path = "agents/inscription")
  public void inscriptionAgent(@RequestBody Utilisateur utilisateur){
    log.info("inscription");
    this.utilisateurService.inscription(utilisateur,TypeRole.AGENTADMINIST);
  }

  @PostMapping(path = "activation")
  public void activation(@RequestBody Map<String, String> activation) {
    this.utilisateurService.activation(activation);
  }

  @PostMapping(path = "connexion")
  public Map<String, String> connexion(@RequestBody AuthentificationDto authentificationDto) {
    log.info("connexion");
    String username = authentificationDto.username();
    
    // Vérifier si l'identifiant est un email ou un matricule
    Utilisateur utilisateur = utilisateurRepository.findByEmail(username)
        .orElseGet(() -> utilisateurRepository.findByMatricule(username)
            .orElseThrow(() -> new RuntimeException("Identifiant non trouvé")));
    
    // Authentifier avec l'email trouvé
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            utilisateur.getEmail(),
            authentificationDto.password()
        )
    );
    
    return jwtService.generate(utilisateur.getEmail());
  }

}
