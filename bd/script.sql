USE db_aaacd8_tutorias;
GO

-- Eliminar tablas intermedias y tablas con claves foráneas primero
DROP TABLE IF EXISTS tutores_materias;
DROP TABLE IF EXISTS tutores;
DROP TABLE IF EXISTS disponibilidad;
DROP TABLE IF EXISTS areas_geograficas;
DROP TABLE IF EXISTS niveles_educativos;
DROP TABLE IF EXISTS materias;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS tipousuarios;
DROP TABLE IF EXISTS tipodocumentos;
GO


--- creacion de tablas primero
CREATE TABLE tipodocumentos (
    id INT PRIMARY KEY IDENTITY (1,1),
    tipodocumento VARCHAR(255)
);
GO

CREATE TABLE tipousuarios (
    id INT PRIMARY KEY IDENTITY (1,1),
    tipousuario VARCHAR(255)
);
GO

CREATE TABLE usuarios (
    id INT PRIMARY KEY IDENTITY (1,1),
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    codtipodocumento INT,
    codtipousuario INT,
    identificacion INT,
    login VARCHAR(255),
	password VARCHAR(255),
    FOREIGN KEY (codtipodocumento) REFERENCES tipodocumentos(id),
	FOREIGN KEY (codtipousuario) REFERENCES tipousuarios(id)
);
GO

CREATE TABLE materias (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255)
);
GO

CREATE TABLE niveles_educativos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nivel VARCHAR(255)
);
GO

CREATE TABLE areas_geograficas (
    id INT PRIMARY KEY IDENTITY(1,1),
    area VARCHAR(255)
);
GO

CREATE TABLE disponibilidad (
    id INT PRIMARY KEY IDENTITY(1,1),
    disponibilidad VARCHAR(255)
);
GO

CREATE TABLE tutores (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    id_nivel_educativo INT,
    id_area_geografica INT,
    id_disponibilidad INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_nivel_educativo) REFERENCES niveles_educativos(id),
    FOREIGN KEY (id_area_geografica) REFERENCES areas_geograficas(id),
    FOREIGN KEY (id_disponibilidad) REFERENCES disponibilidad(id)
);
GO

CREATE TABLE tutores_materias (
    id_tutor INT,
    id_materia INT,
    PRIMARY KEY (id_tutor, id_materia),
    FOREIGN KEY (id_tutor) REFERENCES tutores(id),
    FOREIGN KEY (id_materia) REFERENCES materias(id)
);
GO

-- procedimientos almacendados ----------------------------

CREATE OR ALTER PROCEDURE crud_usuarios
    @id INT = NULL,
    @nombres VARCHAR(255) = NULL,
    @apellidos VARCHAR(255) = NULL,
	@login VARCHAR(255) = NULL,
	@password VARCHAR(255) = NULL,
    @codtipodocumento INT = NULL,
	@codtipousuario INT = NULL,
    @identificacion INT = NULL,
    @accion VARCHAR(10)
AS
BEGIN
    IF LOWER(@accion) = 'c' OR LOWER(@accion) = 'crear'
    BEGIN
        INSERT INTO usuarios (nombres, apellidos, codtipodocumento, identificacion, codtipousuario, login, password)
        VALUES (@nombres, @apellidos, @codtipodocumento, @identificacion,@codtipousuario,@login,@password);
        SELECT SCOPE_IDENTITY() AS nuevoId;
    END
    ELSE IF LOWER(@accion) = 'r' OR LOWER(@accion) = 'leer'
    BEGIN
        IF @id IS NOT NULL
            SELECT * FROM usuarios WHERE id = @id;
        ELSE
            SELECT * FROM usuarios;
    END
    ELSE IF LOWER(@accion) = 'u' OR LOWER(@accion) = 'actualizar'
    BEGIN
        UPDATE usuarios
        SET nombres = @nombres, apellidos = @apellidos, codtipodocumento = @codtipodocumento, identificacion = @identificacion, codtipousuario = @codtipousuario
        WHERE id = @id;
    END
    ELSE IF LOWER(@accion) = 'd' OR LOWER(@accion) = 'eliminar'
    BEGIN
        DELETE FROM usuarios WHERE id = @id;
    END
END
GO

CREATE OR ALTER PROCEDURE crud_tutores
    @id INT = NULL,
    @id_usuario INT = NULL,
    @id_nivel_educativo INT = NULL,
    @id_area_geografica INT = NULL,
    @id_disponibilidad INT = NULL,
    @accion VARCHAR(10),
    @id_materia INT = NULL -- Para asignar materias a tutores
AS
BEGIN
    IF LOWER(@accion) = 'c' OR LOWER(@accion) = 'crear'
    BEGIN
        INSERT INTO tutores (id_usuario, id_nivel_educativo, id_area_geografica, id_disponibilidad)
        VALUES (@id_usuario, @id_nivel_educativo, @id_area_geografica, @id_disponibilidad);
        DECLARE @nuevoId INT = SCOPE_IDENTITY();
        IF @id_materia IS NOT NULL
        BEGIN
            INSERT INTO tutores_materias (id_tutor, id_materia)
            VALUES (@nuevoId, @id_materia);
        END
        SELECT @nuevoId AS nuevoId;
    END
    ELSE IF LOWER(@accion) = 'r' OR LOWER(@accion) = 'leer'
    BEGIN
        IF @id IS NOT NULL
            SELECT * FROM tutores WHERE id = @id;
        ELSE
            SELECT * FROM tutores;
    END
    ELSE IF LOWER(@accion) = 'u' OR LOWER(@accion) = 'actualizar'
    BEGIN
        UPDATE tutores
        SET id_usuario = @id_usuario, id_nivel_educativo = @id_nivel_educativo, id_area_geografica = @id_area_geografica, id_disponibilidad = @id_disponibilidad
        WHERE id = @id;
        IF @id_materia IS NOT NULL
        BEGIN
            DELETE FROM tutores_materias WHERE id_tutor = @id;
            INSERT INTO tutores_materias (id_tutor, id_materia)
            VALUES (@id, @id_materia);
        END
        SELECT 'Registro actualizado correctamente.' AS mensaje;
    END
    ELSE IF LOWER(@accion) = 'd' OR LOWER(@accion) = 'eliminar'
    BEGIN
        DELETE FROM tutores_materias WHERE id_tutor = @id;
        DELETE FROM tutores WHERE id = @id;
        SELECT 'Registro eliminado correctamente.' AS mensaje;
    END
END
GO

CREATE OR ALTER PROCEDURE buscar_tutores
    @materia VARCHAR(255) = NULL,
    @nivel_educativo VARCHAR(255) = NULL,
    @area_geografica VARCHAR(255) = NULL,
    @disponibilidad VARCHAR(255) = NULL
AS
BEGIN
    SELECT t.*, u.nombres, u.apellidos
    FROM tutores t
    JOIN usuarios u ON t.id_usuario = u.id
    LEFT JOIN niveles_educativos ne ON t.id_nivel_educativo = ne.id
    LEFT JOIN areas_geograficas ag ON t.id_area_geografica = ag.id
    LEFT JOIN disponibilidad d ON t.id_disponibilidad = d.id
    LEFT JOIN tutores_materias tm ON t.id = tm.id_tutor
    LEFT JOIN materias m ON tm.id_materia = m.id
    WHERE (@materia IS NULL OR m.nombre = @materia)
    AND (@nivel_educativo IS NULL OR ne.nivel = @nivel_educativo)
    AND (@area_geografica IS NULL OR ag.area = @area_geografica)
    AND (@disponibilidad IS NULL OR d.disponibilidad = @disponibilidad);
END
GO

CREATE OR ALTER PROCEDURE crud_tipousuarios
    @id INT = NULL,
    @tipousuario VARCHAR(255) = NULL,
    @accion VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- CREATE
    IF LOWER(@accion) = 'c' OR LOWER(@accion) = 'crear'
    BEGIN
        INSERT INTO tipousuarios (tipousuario)
        VALUES (@tipousuario);

        SELECT SCOPE_IDENTITY() AS nuevoId; -- Retorna el ID del nuevo registro insertado
    END

    -- READ
    IF LOWER(@accion) = 'r' OR LOWER(@accion) = 'leer'
    BEGIN
        IF @id IS NOT NULL
        BEGIN
            SELECT * FROM tipousuarios WHERE id = @id;
        END
        ELSE
        BEGIN
            SELECT * FROM tipousuarios;
        END
    END

    -- UPDATE
    IF LOWER(@accion) = 'u' OR LOWER(@accion) = 'actualizar'
    BEGIN
        IF @id IS NOT NULL
        BEGIN
            UPDATE tipousuarios
            SET tipousuario = @tipousuario
            WHERE id = @id;

            SELECT 'Registro actualizado correctamente.' AS mensaje;
        END
        ELSE
        BEGIN
            RAISERROR('Se requiere el parámetro @id para actualizar.', 16, 1);
        END
    END

    -- DELETE
    IF LOWER(@accion) = 'd' OR LOWER(@accion) = 'eliminar'
    BEGIN
        IF @id IS NOT NULL
        BEGIN
            DELETE FROM tipousuarios WHERE id = @id;

            SELECT 'Registro eliminado correctamente.' AS mensaje;
        END
        ELSE
        BEGIN
            RAISERROR('Se requiere el parámetro @id para eliminar.', 16, 1);
        END
    END
END
GO

CREATE OR ALTER PROCEDURE crud_tipodocumentos
    @id INT = NULL,
    @tipodocumento VARCHAR(255) = NULL,
    @accion VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- CREATE
    IF LOWER(@accion) = 'c' OR LOWER(@accion) = 'crear'
    BEGIN
        INSERT INTO tipodocumentos (tipodocumento)
        VALUES (@tipodocumento);
        SELECT SCOPE_IDENTITY() AS nuevoId;
    END

    -- READ
    ELSE IF LOWER(@accion) = 'r' OR LOWER(@accion) = 'leer'
    BEGIN
        IF @id IS NOT NULL
            SELECT * FROM tipodocumentos WHERE id = @id;
        ELSE
            SELECT * FROM tipodocumentos;
    END

    -- UPDATE
    ELSE IF LOWER(@accion) = 'u' OR LOWER(@accion) = 'actualizar'
    BEGIN
        UPDATE tipodocumentos
        SET tipodocumento = @tipodocumento
        WHERE id = @id;
    END

    -- DELETE
    ELSE IF LOWER(@accion) = 'd' OR LOWER(@accion) = 'eliminar'
    BEGIN
        DELETE FROM tipodocumentos WHERE id = @id;
    END
END
GO

CREATE OR ALTER PROCEDURE crud_materias
    @id INT = NULL,
    @nombre VARCHAR(255) = NULL,
    @accion VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- CREATE
    IF LOWER(@accion) = 'c' OR LOWER(@accion) = 'crear'
    BEGIN
        INSERT INTO materias (nombre)
        VALUES (@nombre);
        SELECT SCOPE_IDENTITY() AS nuevoId;
    END

    -- READ
    ELSE IF LOWER(@accion) = 'r' OR LOWER(@accion) = 'leer'
    BEGIN
        IF @id IS NOT NULL
            SELECT * FROM materias WHERE id = @id;
        ELSE
            SELECT * FROM materias;
    END

    -- UPDATE
    ELSE IF LOWER(@accion) = 'u' OR LOWER(@accion) = 'actualizar'
    BEGIN
        UPDATE materias
        SET nombre = @nombre
        WHERE id = @id;
    END

    -- DELETE
    ELSE IF LOWER(@accion) = 'd' OR LOWER(@accion) = 'eliminar'
    BEGIN
        DELETE FROM materias WHERE id = @id;
    END
END
GO

CREATE OR ALTER PROCEDURE crud_niveles_educativos
    @id INT = NULL,
    @nivel VARCHAR(255) = NULL,
    @accion VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- CREATE
    IF LOWER(@accion) = 'c' OR LOWER(@accion) = 'crear'
    BEGIN
        INSERT INTO niveles_educativos (nivel)
        VALUES (@nivel);
        SELECT SCOPE_IDENTITY() AS nuevoId;
    END

    -- READ
    ELSE IF LOWER(@accion) = 'r' OR LOWER(@accion) = 'leer'
    BEGIN
        IF @id IS NOT NULL
            SELECT * FROM niveles_educativos WHERE id = @id;
        ELSE
            SELECT * FROM niveles_educativos;
    END

    -- UPDATE
    ELSE IF LOWER(@accion) = 'u' OR LOWER(@accion) = 'actualizar'
    BEGIN
        UPDATE niveles_educativos
        SET nivel = @nivel
        WHERE id = @id;
    END

    -- DELETE
    ELSE IF LOWER(@accion) = 'd' OR LOWER(@accion) = 'eliminar'
    BEGIN
        DELETE FROM niveles_educativos WHERE id = @id;
    END
END
GO

CREATE OR ALTER PROCEDURE crud_areas_geograficas
    @id INT = NULL,
    @area VARCHAR(255) = NULL,
    @accion VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- CREATE
    IF LOWER(@accion) = 'c' OR LOWER(@accion) = 'crear'
    BEGIN
        INSERT INTO areas_geograficas (area)
        VALUES (@area);
        SELECT SCOPE_IDENTITY() AS nuevoId;
    END

    -- READ
    ELSE IF LOWER(@accion) = 'r' OR LOWER(@accion) = 'leer'
    BEGIN
        IF @id IS NOT NULL
            SELECT * FROM areas_geograficas WHERE id = @id;
        ELSE
            SELECT * FROM areas_geograficas;
    END

    -- UPDATE
    ELSE IF LOWER(@accion) = 'u' OR LOWER(@accion) = 'actualizar'
    BEGIN
        UPDATE areas_geograficas
        SET area = @area
        WHERE id = @id;
    END

    -- DELETE
    ELSE IF LOWER(@accion) = 'd' OR LOWER(@accion) = 'eliminar'
    BEGIN
        DELETE FROM areas_geograficas WHERE id = @id;
    END
END
GO

CREATE OR ALTER PROCEDURE crud_disponibilidad
    @id INT = NULL,
    @disponibilidad VARCHAR(255) = NULL,
    @accion VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- CREATE
    IF LOWER(@accion) = 'c' OR LOWER(@accion) = 'crear'
    BEGIN
        INSERT INTO disponibilidad (disponibilidad)
        VALUES (@disponibilidad);
        SELECT SCOPE_IDENTITY() AS nuevoId;
    END

    -- READ
    ELSE IF LOWER(@accion) = 'r' OR LOWER(@accion) = 'leer'
    BEGIN
        IF @id IS NOT NULL
            SELECT * FROM disponibilidad WHERE id = @id;
        ELSE
            SELECT * FROM disponibilidad;
    END

    -- UPDATE
    ELSE IF LOWER(@accion) = 'u' OR LOWER(@accion) = 'actualizar'
    BEGIN
        UPDATE disponibilidad
        SET disponibilidad = @disponibilidad
        WHERE id = @id;
    END

    -- DELETE
    ELSE IF LOWER(@accion) = 'd' OR LOWER(@accion) = 'eliminar'
    BEGIN
        DELETE FROM disponibilidad WHERE id = @id;
    END
END
GO


-- insersion de datos de pruebas
INSERT INTO tipousuarios (tipousuario) VALUES ('Tutor'), ('Estudiante');
INSERT INTO tipodocumentos (tipodocumento) VALUES ('Cedula Ciudadania'),('Tarjeta Identidad'),('Pasaporte');
INSERT INTO materias (nombre) VALUES ('Matemáticas'), ('Ciencias'), ('Historia');
INSERT INTO niveles_educativos (nivel) VALUES ('Primaria'), ('Secundaria'), ('Universidad');
INSERT INTO areas_geograficas (area) VALUES ('Centro'), ('Norte'), ('Sur');
INSERT INTO disponibilidad (disponibilidad) VALUES ('Mañana'), ('Tarde'), ('Noche');
GO

-- Ejecutar ejemplo de creación de usuario
EXEC crud_usuarios 
	@nombres = 'Pedro', 
	@apellidos = 'Guerrero Velasco', 
	@login = 'PedroGv',
    @password = 'cbdvidsnokasioow',
	@codtipodocumento = 1, 
	@codtipousuario = 2,
	@identificacion = 1014216596, 
	@accion = 'c';
GO

-- Ejecutar ejemplo de creación de usuario
EXEC crud_usuarios 
	@nombres = 'Javier Leonardo', 
	@apellidos = 'Rodriguez', 
	@login = 'JavierR',
    @password = '34567890bhdcshc',
	@codtipodocumento = 1, 
	@codtipousuario = 1,
	@identificacion = 1014216596, 
	@accion = 'c';
GO

select * from usuarios u
	inner join tipousuarios tu on tu.id = u.codtipousuario 
	inner join tipodocumentos td on td.id = u.codtipodocumento