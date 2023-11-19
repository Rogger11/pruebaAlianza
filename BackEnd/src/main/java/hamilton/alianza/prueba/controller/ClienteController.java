package hamilton.alianza.prueba.controller;

import hamilton.alianza.prueba.dto.ClienteAdvancedSearchDTO;
import hamilton.alianza.prueba.entity.Cliente;
import hamilton.alianza.prueba.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.getAllClientes();
    }

    @PostMapping
    public ResponseEntity<?> createCliente(@RequestBody Cliente cliente) {
        if (ObjectUtils.isEmpty(cliente.getShared_key()) ||
                ObjectUtils.isEmpty(cliente.getBusiness_id()) ||
                ObjectUtils.isEmpty(cliente.getAddedDate()) ||
                ObjectUtils.isEmpty(cliente.getStartDate()) ||
                ObjectUtils.isEmpty(cliente.getEndDate()) ||
                ObjectUtils.isEmpty(cliente.getEmail()) ||
                ObjectUtils.isEmpty(cliente.getPhone())) {
            return ResponseEntity.badRequest().body("Faltan campos obligatorios.");
        } else {
            return ResponseEntity.ok(clienteService.createCliente(cliente));
        }
    }

    @GetMapping("/bySharedKey")
    public List<Cliente> getBySharedKey(@RequestParam String sharedKey) {
        return clienteService.getBySharedKey(sharedKey);
    }

    @PostMapping("/advanced-search")
    public ResponseEntity<List<Cliente>> advancedSearch(@RequestBody ClienteAdvancedSearchDTO searchRequest) {
        List<Cliente> searchResults = clienteService.advancedSearch(
                searchRequest.getSharedKey(),
                searchRequest.getBusiness_id(),
                searchRequest.getEmail(),
                searchRequest.getPhone()
        );
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }

}
