package Pastebin.demo.DTO;

public class PasteResponse {

    private String id;
    private String url;


    public PasteResponse(String id, String url) {
        this.id = id;
        this.url = url;
    }

    // (optional but good)
    public String getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }


}
