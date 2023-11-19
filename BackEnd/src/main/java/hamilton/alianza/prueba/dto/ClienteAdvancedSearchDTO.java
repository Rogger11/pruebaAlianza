package hamilton.alianza.prueba.dto;

public class ClienteAdvancedSearchDTO {
    private String sharedKey;
    private String business_id;
    private String email;
    private String phone;

    public ClienteAdvancedSearchDTO() {
    }

    public ClienteAdvancedSearchDTO(String sharedKey, String business_id, String email, String phone) {
        this.sharedKey = sharedKey;
        this.business_id = business_id;
        this.email = email;
        this.phone = phone;
    }

    public String getSharedKey() {
        return sharedKey;
    }

    public void setSharedKey(String sharedKey) {
        this.sharedKey = sharedKey;
    }

    public String getBusiness_id() {
        return business_id;
    }

    public void setBusiness_id(String business_id) {
        this.business_id = business_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
