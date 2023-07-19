
    CREATE TABLE administrador (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre VARCHAR(50) NOT NULL,
      Clave  VARCHAR(50) NOT NULL
    );

    INSERT INTO administrador(Nombre,Clave) VALUES ('admin@gmail.com','admin');
    


    CREATE TABLE Profesor (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    DNI VARCHAR(9) UNIQUE NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Clave VARCHAR(50) NOT NULL
    ) ;
    
    CREATE TABLE Curso (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(100) NOT NULL
    );
    
    CREATE TABLE Curso_Profesor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idCurso INTEGER NOT NULL,
    idProfesor INTEGER NOT NULL,
    pesos JSON ,
    fechaLimite DATE DEFAULT '2023-07-29',
    fechaDeExamen DATE DEFAULT '2023-07-29',
    CONSTRAINT fk_curso FOREIGN KEY (idCurso) REFERENCES Curso(CODIGO) ON DELETE CASCADE,
    CONSTRAINT fk_profesor FOREIGN KEY (idProfesor) REFERENCES Profesor(CODIGO) ON DELETE CASCADE
    );
    
    CREATE TABLE Alumno (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    DNI VARCHAR(9) UNIQUE NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Direccion VARCHAR(100) NOT NULL
    ) ;
    
    CREATE TABLE Matricula (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idAlumno INTEGER NOT NULL,
    idCursoProfesor INTEGER NOT NULL,
    notas JSON,
    CONSTRAINT fk_alumno FOREIGN KEY (idAlumno) REFERENCES Alumno(CODIGO) ON DELETE CASCADE,
    CONSTRAINT fk_curso_profesor FOREIGN KEY (idCursoProfesor) REFERENCES Curso_Profesor(id) ON DELETE CASCADE
    );
    



    
    -- Inserts para profesores
    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Paolo', 'Coronado', '111111110', 'paolo123@gmail.com', '123');

    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Anthony', 'Rios', '111111111', 'anthony123@gmail.com', '123');

    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Marcelo', 'Jimenez Trujillo', '111111112', 'marcelo123@gmail.com', '123');
    
    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Marcelo', 'Jimenez Davila', '222222222', 'marcelojimenez@gmail.com', '123');

    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Pedro', 'Garcia Perez', '222222221', 'pedrogarcia@gmail.com', '123');

    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Jose', 'Perez Garcia', '222222202', 'joseperez@gmail.com', '123');

    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Pedro', 'Gonzales Rivas', '222222223', 'pedrogonzales@gmail.com', '123');

    INSERT INTO Profesor (Nombre, Apellidos, DNI, Correo, Clave)
    VALUES ('Juan', 'Gil', '222222224', 'juangil@gmail.com', '123');




    
    -- Inserts para cursos
    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Matemáticas', 'Curso de matemáticas avanzadas');
    
    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Historia', 'Curso de historia mundial');
    
    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Letras', 'Curso de Letras');

    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Programacion', 'Curso de Programacion ');

    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Ciencias Sociales', 'Curso de ciencias sociales ');

    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Quimica', 'Curso de quimica ');

    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Fisica', 'Curso de fisica ');

    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Algebra', 'Curso de Algebra ');

    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Geometria', 'Curso de Geometria ');

    INSERT INTO Curso (Nombre, Descripcion)
    VALUES ('Trigonometria', 'Curso de Trigonometria ');


    -- Inserts para asignar cursos a profesores
    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (1, 1, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (2, 1, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (3, 1, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (4, 1, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (5, 1, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');



    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (1, 2, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (2, 2, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (3, 2, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (4, 2, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (5, 2, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');



    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (1, 3, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (2, 3, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (3, 3, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (4, 3, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (5, 3, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');


    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (6, 4, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (7, 4, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (8, 4, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (9, 5, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');


    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos,fechaLimite)
    VALUES (9, 5, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}','2023-07-19');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (8, 6, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (7, 6, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (4, 7, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');

    INSERT INTO Curso_Profesor (idCurso, idProfesor, pesos)
    VALUES (6, 8, '{"ID":3,"pesos":{"1":{"id":1,"nombre": "n1", "peso": 10}, "2":{"id":2,"nombre": "n2", "peso": 90}}}');




    INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
VALUES 
  ('Laura', 'González', '987654321', 'Calle Principal 123','LG@mail.com'),
  ('Carlos', 'Martínez', '876543210', 'Avenida Central 456','CM@mail.com'),
  ('Lucía', 'Hernández', '765432109', 'Calle Secundaria 789','LH@mail.com'),
  ('Pedro', 'López', '654321098', 'Calle Principal 456','PL@mail.com'),
  ('Lucas', 'López', '654321090', 'Calle Principal 450','LL@mail.com'),
  ('María', 'Sánchez', '543210987', 'Avenida Central 789','MS@mail.com'),
  ('Andrés', 'Rodríguez', '432109876', 'Calle Principal 789','AR@mail.com'),
  ('Sofía', 'Gómez', '321098765', 'Avenida Secundaria 123','SG@mail.com'),
  ('Alejandro', 'Fernández', '210987654', 'Calle Secundaria 456','AF@mail.com'),
  ('Ana', 'Pérez', '109876543', 'Avenida Central 123','AP@mail.com');

INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
VALUES 
  ('Gregoria', 'González', '9876543211', 'Calle Principal 123','GregoriaG@mail.com'),
  ('Carlo', 'Martí', '8765432101', 'Avenida Central 456','CarloM@mail.com'),
  ('Luca', 'Fernández', '7654321091', 'Calle Secundaria 789','LFernadez@mail.com'),
  ('Pedro', 'Gomez', '6543210982', 'Calle Principal 456','PedroG@mail.com'),
  ('Lucas', 'Roman', '6543210902', 'Calle Principal 450','LRoman@mail.com'),
  ('María', 'Juarez', '5432109872', 'Avenida Central 789','Mjua@mail.com'),
  ('Andrés', 'Rivera', '4321098762', 'Calle Principal 789','ARi@mail.com'),
  ('Sofía', 'Copola', '3210987652', 'Avenida Secundaria 123','Scopola@mail.com'),
  ('Alejandro', 'Fernández', '2109876542', 'Calle Secundaria 456','AF@mail.com'),
  ('Ana', 'Pérez', '1098765432', 'Avenida Central 123','AP@mail.com');

INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
VALUES 
  ('Sonia', 'Copola', '32109876512', 'Avenida Secundaria 123','Soniacopola@mail.com'),
  ('Alejandra', 'Hernández', '21098765412', 'Calle Secundaria 456','AlejandraH@mail.com');

INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
VALUES
('Anush', 'Nowak', '123458901', 'Ul. Główna 1','anush.nowak@mail.com'),
('Armen', 'Kowalski', '236789012', 'Ul. Główna 2','armen.kowalski@mail.com'),
('Ani', 'Nowak', '345678923', 'Ul. Główna 3','ani.nowak@mail.com'),
('Artur', 'Kowalski', '458901234', 'Ul. Główna 4','artur.kowalski@mail.com'),
('Anahit', 'Nowak', '567890145', 'Ul. Główna 5','anahit.nowak@mail.com'),
('Ashot', 'Kowalski', '6789456', 'Ul. Główna 6','ashot.kowalski@mail.com'),
('Anushavan', 'Nowak', '78904567', 'Ul. Główna 7','anushavan.nowak@mail.com'),
('Aram', 'Kowalski', '890178', 'Ul. Główna 8','aram.kowalski@mail.com');

INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
VALUES
('Lucía', 'Rossi', '12345678901', 'Via Principale 1','lucia.rossi@mail.com'),
('Mateo', 'Bianchi', '23456789012', 'Via Principale 2','mateo.bianchi@mail.com'),
('Valentina', 'Ricci', '34567890123', 'Via Principale 3','valentina.ricci@mail.com'),
('Gabriel', 'Conti', '45678901234', 'Via Principale 4','gabriel.conti@mail.com'),
('Isabella', 'De Luca', '56789012345', 'Via Principale 5','isabella.deluca@mail.com'),
('Santiago', 'Ferrari', '67890123456', 'Via Principale 6','santiago.ferrari@mail.com'),
('Camila', 'Rizzo', '78901234567', 'Via Principale 7','camila.rizzo@mail.com'),
('Daniel', 'Romano', '89012345678', 'Via Principale 8','daniel.romano@mail.com');

INSERT INTO Alumno (Nombre, Apellidos, DNI, Direccion, Correo)
VALUES
('Carlos', 'Murphy', '1234567901', '123 Main Street','carlos.murphy@mail.com'),
('Luisa', 'O Sullivan', '2345679012', '456 Elm Street','luisa.osullivan@mail.com'),
('Miguel', 'Fitzgerald', '3456890123', '789 Oak Street','miguel.fitzgerald@mail.com'),
('Isabella', "O Connor", '4567801234', '987 Pine Street',"isabella.oconnor@mail.com"),
('Diego', 'Doherty', '5678901345', '654 Maple Street','diego.doherty@mail.com'),
('Camila', "Ryan", '6789013456', '321 Cedar Street',"camila.ryan@mail.com"),
('Julio', 'Kelly', '7891234567', '654 Birch Street','julio.kelly@mail.com'),
('Ana', 'McCarthy', '8912345678', '987 Willow Street','ana.mccarthy@mail.com');


    
    -- Inserts para asignar alumnos a cursos y profesores
    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (1, 1, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (2, 1, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (2, 2, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (4, 3, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (3, 3, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (5, 1, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (6, 1, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (7, 1, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (8, 1, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (9, 1, '{"1":12,"2":12}');

    INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
    VALUES (10, 1, '{"1":12,"2":12}');

INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
VALUES 
  (11, 1, '{"1":12,"2":12}'),
  (12, 1, '{"1":12,"2":12}'),
  (13, 1, '{"1":12,"2":12}'),
  (14, 1, '{"1":12,"2":12}'),
  (15, 1, '{"1":12,"2":12}'),
  (16, 1, '{"1":12,"2":12}'),
  (17, 1, '{"1":12,"2":12}'),
  (18, 1, '{"1":12,"2":12}'),
  (19, 1, '{"1":12,"2":12}'),
  (20, 1, '{"1":12,"2":12}'),
  -- Continuar con las otras 20 inserciones de matrícula
  (21, 1, '{"1":12,"2":12}'),
  (22, 1, '{"1":12,"2":12}'),
  -- Continuar con las otras 17 inserciones de matrícula
  (40, 1, '{"1":12,"2":12}');
INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
VALUES 
  (23, 1, '{"1":12,"2":12}'),
  (24, 1, '{"1":12,"2":12}'),
  (25, 1, '{"1":12,"2":12}'),
  (26, 1, '{"1":12,"2":12}'),
  (27, 1, '{"1":12,"2":12}'),
  (28, 1, '{"1":12,"2":12}'),
  (29, 1, '{"1":12,"2":12}'),
  (30, 1, '{"1":12,"2":12}');

        