package hamilton.alianza.prueba;

import com.fasterxml.jackson.databind.ObjectMapper;
import hamilton.alianza.prueba.controller.ClienteController;
import hamilton.alianza.prueba.dto.ClienteAdvancedSearchDTO;
import hamilton.alianza.prueba.entity.Cliente;
import hamilton.alianza.prueba.service.ClienteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
public class ClienteTests {

    @Autowired
    private MockMvc mockMvc;

    private ClienteService clienteService;

    private ObjectMapper objectMapper;

    private ClienteController clienteController;

    @Test
    @Transactional
    public void getAllClientes() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clientes"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    @Transactional
    public void createCliente() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setShared_key("testSharedKey");
        cliente.setBusiness_id("testBusinessId");
        cliente.setEmail("test@example.com");
        cliente.setPhone("123456789");
        cliente.setAddedDate(java.sql.Date.valueOf("2023-01-01"));
        cliente.setStartDate(java.sql.Date.valueOf("2023-01-01"));
        cliente.setEndDate(java.sql.Date.valueOf("2023-12-31"));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cliente)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber());

        assertNotNull(clienteService.getBySharedKey("testSharedKey"));
    }

    @Test
    @Transactional
    public void getBySharedKey() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clientes/bySharedKey?sharedKey=testSharedKey"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    @Transactional
    public void advancedSearch() throws Exception {
        ClienteAdvancedSearchDTO searchRequest = new ClienteAdvancedSearchDTO();
        searchRequest.setSharedKey("testSharedKey");
        searchRequest.setBusiness_id("testBusinessId");
        searchRequest.setEmail("test@example.com");
        searchRequest.setPhone("123456789");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/clientes/advanced-search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(searchRequest)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }
}
