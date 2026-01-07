package Pastebin.demo.Service;

import Pastebin.demo.DTO.PasteRequest;
import Pastebin.demo.Entity.Paste;
import Pastebin.demo.Exception.NotFoundException;
import Pastebin.demo.Repository.PasteRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class PasteService {

    private final PasteRepository pasteRepository;

    // MANUAL CONSTRUCTOR
    public PasteService(PasteRepository pasteRepository) {
        this.pasteRepository = pasteRepository;
    }

    //Create Paste
  public Paste create(PasteRequest req){
        Paste paste = new Paste();
        paste.setContent(req.getContent());
        paste.setMaxViews(req.getMax_views());

        if(req.getTtl_seconds() != null){
            paste.setExpiresAt(
                    Instant.now().plusSeconds(req.getTtl_seconds())
            );
        }
        return pasteRepository.save(paste);
  }
    //Get paste
   public Paste getpaste(String id, Instant now){
    Paste paste = pasteRepository.findById(id)
            .orElseThrow(()-> new NotFoundException("Paste Expired"));
    if (paste.getMaxViews()!=null &&
    paste.getCurrentViews()>=paste.getMaxViews()){
        throw new NotFoundException("View limit exceeded");
    }
    paste.setCurrentViews(paste.getCurrentViews()+1);
    pasteRepository.save(paste);
    return paste;
    }
}