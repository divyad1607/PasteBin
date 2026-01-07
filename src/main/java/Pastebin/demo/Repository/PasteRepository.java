package Pastebin.demo.Repository;

import Pastebin.demo.Entity.Paste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasteRepository extends JpaRepository<Paste, String> {
}
