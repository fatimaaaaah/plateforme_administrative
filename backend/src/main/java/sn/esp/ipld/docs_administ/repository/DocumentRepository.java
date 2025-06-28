package sn.esp.ipld.docs_administ.repository;

import org.springframework.data.repository.CrudRepository;
import sn.esp.ipld.docs_administ.entity.Document;
import sn.esp.ipld.docs_administ.entity.Demande;

import java.util.Optional;

public interface DocumentRepository extends CrudRepository<Document, Long> {
    Optional<Document> findByDemande(Demande demande);
} 