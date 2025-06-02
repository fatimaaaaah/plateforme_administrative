package sn.esp.ipld.docs_administ.repository;

import org.springframework.data.repository.CrudRepository;
import sn.esp.ipld.docs_administ.entity.Utilisateur;

import java.util.Optional;

public interface UtilisateurRepository extends CrudRepository<Utilisateur, Integer> {
  Optional<Utilisateur> findByEmail(String email);
}
