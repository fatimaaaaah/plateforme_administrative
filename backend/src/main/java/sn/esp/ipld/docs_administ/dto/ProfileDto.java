package sn.esp.ipld.docs_administ.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String nin;
    private String role;
}