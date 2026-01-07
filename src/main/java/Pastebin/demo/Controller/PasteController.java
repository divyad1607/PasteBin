package Pastebin.demo.Controller;

import Pastebin.demo.DTO.PasteRequest;
import Pastebin.demo.DTO.PasteResponse;
import Pastebin.demo.Entity.Paste;
import Pastebin.demo.Exception.NotFoundException;
import Pastebin.demo.Service.PasteService;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Map;

@Controller
public class PasteController {

    private final PasteService pasteService;

    public PasteController(PasteService pasteService) {
        this.pasteService = pasteService;
    }

    @Value("${TEST_MODE:0}")
    private String testMode;

    // CREATE PASTE
    // CREATE PASTE
    @PostMapping("/api/pastes")
    @ResponseBody
   public PasteResponse createPaste(@RequestBody PasteRequest req,
                                    HttpServletRequest request){
        if (req.getContent()== null || req.getContent().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Content is required");
        }

        Paste paste = pasteService.create(req);

        String baseUrl =
                request.getScheme()+ "://" +
                        request.getServerName()+
                        ":"+request.getServerName();

        return new PasteResponse(
                paste.getId(),
                baseUrl+"/p/"+ paste.getId()
        );
    }

    // FETCH PASTE
   @GetMapping("/api/pastes/{id}")
  public Map<String, Object> fetchPaste(@PathVariable String id,
                                        @RequestHeader(value = "x-test-now-ms",required = false) Long testNow){
        Instant now=("1".equals(testMode) && testNow != null)
                ?Instant.ofEpochMilli(testNow)
                :Instant.now();

        Paste paste = pasteService.getpaste(id, now);

        return Map.of(
                "content",paste.getContent(),
                "remaining_views",
                paste.getMaxViews()==null
                ?null : paste.getMaxViews()-paste.getCurrentViews(),
                "expires_at",paste.getExpiresAt()
        );
   }

    //HTML VIEW
   @GetMapping("/p/{id}")
   public String viewPasteHtml(@PathVariable String id,
                               org.springframework.ui.Model model){
    Paste paste = pasteService.getpaste(id, Instant.now());
    model.addAttribute("content",paste.getContent());
    return "paste";
    }
}