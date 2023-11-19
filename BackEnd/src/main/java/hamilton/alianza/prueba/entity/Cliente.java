package hamilton.alianza.prueba.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Entity
@Table("cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shared_key")
    @NotBlank(message = "El campo es obligatorio.")
    private String shared_key;

    @Column(name = "business_id")
    @NotBlank(message = "El campo es obligatorio.")
    private String business_id;

    @Column(name = "email")
    @NotBlank(message = "El campo es obligatorio.")
    private String email;

    @Column(name = "phone")
    @NotBlank(message = "El campo es obligatorio.")
    private String phone;

    @Column(name = "added_date")
    @NotBlank(message = "El campo es obligatorio.")
    @Temporal(TemporalType.TIMESTAMP)
    private Date addedDate;

    @Column(name = "start_date")
    @NotBlank(message = "El campo es obligatorio.")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date")
    @NotBlank(message = "El campo es obligatorio.")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    public Cliente(String shared_key, String business_id, String email, String phone, Date addedDate, Date startDate, Date endDate) {
        this.shared_key = shared_key;
        this.business_id = business_id;
        this.email = email;
        this.phone = phone;
        this.addedDate = addedDate;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Cliente() {

    }

    public String getShared_key() {
        return shared_key;
    }

    public void setShared_key(String shared_key) {
        this.shared_key = shared_key;
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

    public Date getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(Date addedDate) {
        this.addedDate = addedDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
