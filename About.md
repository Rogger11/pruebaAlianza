# Database SCRIPTS

## SQL SERVER

He usado el motor de base de datos SQL Server y he configurado el proyecto para funcionar con SQL SERVER.

A continuación les dejaré lo que se necesita para crear las tablas y los TRIGGER para los logs.

```
USE PruebaAlianza;

GO

CREATE TABLE dbo.ClientesLogs (
    LogID INT PRIMARY KEY IDENTITY(1,1),
    EventType NVARCHAR(50),
    EventDate DATETIME DEFAULT GETDATE(),
    UserName NVARCHAR(100),
    QueryText NVARCHAR(MAX)
);

GO

CREATE OR ALTER TRIGGER trg_log_insert
ON PruebaAlianza.dbo.cliente
AFTER INSERT
AS
BEGIN
    INSERT INTO dbo.ClientesLogs (EventType, UserName, QueryText)
    SELECT 'INSERT', SYSTEM_USER, 'INSERT INTO PruebaAlianza.dbo.cliente VALUES (' + ISNULL(QUOTENAME(shared_key, ''''), 'NULL') + ', ' + ISNULL(QUOTENAME(business_id, ''''), 'NULL') + ', ' + ISNULL(QUOTENAME(email, ''''), 'NULL') + ', ' + ISNULL(QUOTENAME(phone, ''''), 'NULL')
    FROM inserted;
END;

GO

CREATE OR ALTER TRIGGER trg_log_update
ON PruebaAlianza.dbo.cliente
AFTER UPDATE
AS
BEGIN
    INSERT INTO dbo.ClientesLogs (EventType, UserName, QueryText)
    SELECT 'UPDATE', SYSTEM_USER, 
           'UPDATE PruebaAlianza.dbo.cliente SET ' + 
           'shared_key = ' + ISNULL(QUOTENAME(i.shared_key, ''''), 'NULL') + ', ' +
           'business_id = ' + ISNULL(QUOTENAME(i.business_id, ''''), 'NULL') + ', ' +
           'email = ' + ISNULL(QUOTENAME(i.email, ''''), 'NULL') + ', ' +
           'phone = ' + ISNULL(QUOTENAME(i.phone, ''''), 'NULL') + ', ' +
           ' FROM PruebaAlianza.dbo.cliente c INNER JOIN inserted i ON c.id = i.id' 
    FROM inserted i;
END;

GO

CREATE OR ALTER TRIGGER trg_log_delete
ON PruebaAlianza.dbo.cliente
AFTER DELETE
AS
BEGIN
    INSERT INTO dbo.ClientesLogs (EventType, UserName, QueryText)
    SELECT 'DELETE', SYSTEM_USER, 
           'DELETE FROM PruebaAlianza.dbo.cliente WHERE id IN (' + 
           STUFF((SELECT ',' + CONVERT(NVARCHAR, d.id) FROM deleted d FOR XML PATH('')), 1, 1, '') + ')'
    FROM deleted;
END;

GO

CREATE TRIGGER trg_log_select
ON PruebaAlianza.dbo.cliente
AFTER SELECT
AS
BEGIN
    INSERT INTO dbo.ClientesLogs (EventType, UserName, QueryText)
    SELECT 'SELECT', SYSTEM_USER, 'SELECT statement executed on PruebaAlianza.dbo.cliente';
END;

GO

```

# Requerimientos:

- Estas pantallas simulan una aplicación con un menú lateral y un espacio de trabajo a la derecha, la
idea es implementar el link para la opción “Clientes” (las demás opciones no se deben implementar)
de forma que permita listar los clientes, buscar los clientes (búsqueda simple por shared key, que
es un campo texto) y crear un nuevo cliente. ✔️

- Se deben agregar las validaciones de pantalla que considere necesarias para los tipos de campos. ✔️

- Se debe hacer un servicio rest que permita consultar, buscar por shared key y crear un cliente, la
implementación no necesita llevar base de datos, esto con el fin de hacer más sencillo el ejercicio
(pero si le es más practico usar base de datos, lo puede hacer). Las pantallas deben interactuar con
este servicio rest para cargar y enviar la información. ✔️

## Requerimientos no funcionales
- En todos los pasos se debe implementar un sistema de logs, de forma que cuando se
coloque en producción ayude a dar soporte del sistema. ✔️
- Generar pruebas unitarias para los casos que considere necesarios. Puede usan un
framework como junit, testNG, si no conoce ninguno puede usar clases planas en java
desde un main. Para el caso del front también implementar pruebas unitarias. ✔️
- Para la capa de presentación se debe usar Angular. ✔️
- Las pantallas deben ser responsive. ✔️
- El servicio debe ser implementado en Java, se puede cualquier framework. ✔️
## 2. Puntos opcionales
NOTA: Este punto es opcional, no es necesario hacerlo, pero proporciona puntos extras.
- Implementar la funcionalidad del buscador avanzado (botón advanced search), tanto en la
parte front como en el servicio. ✔️
- Implementar la opción de Exportar (ver botón en la primera pantalla) hacia un archivo csv. ✔️