package hamilton.alianza.prueba.service;

import hamilton.alianza.prueba.entity.Cliente;

import java.util.List;

public interface ClienteService {
    List<Cliente> getBySharedKey(String shared_key);
    List<Cliente> getAllClientes();
    Cliente createCliente(Cliente cliente);
    List<Cliente> advancedSearch(String sharedKey, String businessId, String email, String phone);

}
