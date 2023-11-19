package hamilton.alianza.prueba.service.impl;

import hamilton.alianza.prueba.dto.ClienteAdvancedSearchDTO;
import hamilton.alianza.prueba.entity.Cliente;
import hamilton.alianza.prueba.service.ClienteService;
import hamilton.alianza.prueba.dao.ClienteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteDao clienteDao;


    @Autowired
    public ClienteServiceImpl(ClienteDao clienteDao) {
        this.clienteDao = clienteDao;
    }

    @Override
    public List<Cliente> getBySharedKey(String shared_key) {
        return clienteDao.getBySharedKey(shared_key);
    }

    @Override
    public List<Cliente> getAllClientes() {
        List<Cliente> clientes = clienteDao.findAll();

        if (clientes != null) {
            clientes.sort(Comparator.comparing(Cliente::getId).reversed());
            return clientes;
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public Cliente createCliente(Cliente cliente) {
        return clienteDao.save(cliente);
    }

    public List<Cliente> advancedSearch(String sharedKey, String businessId, String email, String phone) {
        Specification<Cliente> spec = Specification.where(null);

        if (sharedKey != null && !sharedKey.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("shared_key"), "%" + sharedKey + "%"));
        }

        if (businessId != null && !businessId.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("business_id"), "%" + businessId + "%"));
        }

        if (email != null && !email.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("email"), "%" + email + "%"));
        }

        if (phone != null && !phone.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("phone"), "%" + phone + "%"));
        }

        return clienteDao.findAll(spec);
    }
}
