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
import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class PasteController {

    private final PasteService pasteService;

    public PasteController(PasteService pasteService) {
        this.pasteService = pasteService;
    }

    @Value("${TEST_MODE:0}")
    private String testMode;

    // CREATE PASTE
    @PostMapping("/api/pastes")
    @ResponseBody
    public PasteResponse createPaste(@RequestBody PasteRequest req,
                                     HttpServletRequest request) {
        if (req.getContent() == null || req.getContent().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content is required");
        }

        Paste paste = pasteService.create(req);

        String baseUrl =
                request.getScheme() + "://" +
                        request.getServerName() +
                        ":" + request.getServerPort();

        return new PasteResponse(
                paste.getId(),
                baseUrl + "/p/" + paste.getId()
        );
    }

    // FETCH PASTE
    @GetMapping("/api/pastes/{id}")
    @ResponseBody
    public Map<String, Object> fetchPaste(@PathVariable String id,
                                          @RequestHeader(value = "x-test-now-ms", required = false) Long testNow) {
        Instant now = ("1".equals(testMode) && testNow != null)
                ? Instant.ofEpochMilli(testNow)
                : Instant.now();

        Paste paste = pasteService.getpaste(id, now);

        Map<String, Object> response = new HashMap<>();
        response.put("content", paste.getContent());

        // Provide a clear string or number instead of a raw null
        response.put("remaining_views", (paste.getMaxViews() == null)
                ? "Unlimited"
                : (paste.getMaxViews() - paste.getCurrentViews()));

        response.put("expires_at", (paste.getExpiresAt() == null)
                ? "Never"
                : paste.getExpiresAt().toString());

        return response;
    }
}