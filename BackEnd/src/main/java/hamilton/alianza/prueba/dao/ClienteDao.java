package hamilton.alianza.prueba.dao;

import hamilton.alianza.prueba.entity.Cliente;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteDao extends JpaRepository<Cliente, Long> {
    @Query("SELECT c FROM Cliente c WHERE c.shared_key LIKE %:sharedKey%")
    List<Cliente> getBySharedKey(String sharedKey);
    List<Cliente> findAll(Specification<Cliente> spec);

}
