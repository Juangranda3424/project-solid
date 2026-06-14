# Proyecto SOLID - Reserva Ecológica

Este proyecto es una aplicación de ejemplo que implementa los principios SOLID en TypeScript. Cada principio se aborda en un módulo separado, con ejemplos antes y después de la refactorización para ilustrar claramente los beneficios de cada principio.

## Instalación

```bash
npm install
npm run dev
```

## Estructura del Proyecto

```
src/
├── 01-srp/          # Single Responsibility Principle
├── 02-ocp/          # Open/Closed Principle
├── 03-lsp/          # Liskov Substitution Principle
├── 04-isp/          # Interface Segregation Principle
├── 05-dip/          # Dependency Inversion Principle
└── data/            # Data providers
```

## Gestión de Git

El proyecto utiliza 5 ramas independientes, una por cada principio SOLID:

- `feature/01-srp` - Corrección del principio SRP
- `feature/02-ocp` - Corrección del principio OCP
- `feature/03-lsp` - Corrección del principio LSP
- `feature/04-isp` - Corrección del principio ISP
- `feature/05-dip` - Corrección del principio DIP

Cada cambio sigue el estándar **Conventional Commits**:
- `refactor(srp):` - Para correcciones del principio SRP
- `refactor(ocp):` - Para correcciones del principio OCP
- `refactor(lsp):` - Para correcciones del principio LSP
- `refactor(isp):` - Para correcciones del principio ISP
- `refactor(dip):` - Para correcciones del principio DIP

---

# Bitácora Reflexiva: Antes y Después

## 1. Single Responsibility Principle (SRP)

### Antes
La clase `ProductBloc` violaba el SRP al tener múltiples responsabilidades:
- Cargar productos desde el inventario
- Guardar productos en la base de datos
- Enviar notificaciones por correo electrónico

Esto creaba una clase "Dios" que hacía demasiadas cosas, haciendo el código difícil de mantener, probar y extender. Cualquier cambio en la lógica de notificaciones afectaba la lógica de productos, violando la separación de preocupaciones.

### Después
Separé las responsabilidades en tres clases especializadas:
- `Email`: Interfaz para enviar notificaciones por correo electrónico
- `EmailService`: Responsabilidad única - envío de notificaciones
- `ProductRepository`: Responsabilidad única - persistencia de productos
- `ProductBloc`: Responsabilidad única - coordinación de lógica de negocio

**Beneficios:**
- Cada clase tiene una única razón para cambiar
- Facilita el testing unitario de cada responsabilidad
- Permite reutilizar `EmailService` en otros módulos
- Mejora la legibilidad y mantenibilidad del código

**Pregunta de Reflexión:** ¿Qué pasaría si mañana decidimos notificar por WhatsApp en lugar de Email? ¿Cuántas clases tendrías que modificar ahora vs. antes?

**Respuesta:** Con el diseño anterior, tendría que modificar `ProductBloc` ya que la lógica de notificaciones estaba mezclada con la lógica de productos. Ahora, solo tendría que crear un nuevo `WhatsAppService` y modificar la clase que coordina las notificaciones, sin afectar la lógica de productos. La separación de responsabilidades permite cambiar el canal de notificación modificando solo una clase en lugar de varias.

### Reflexión
El principio SRP es fundamental pero a menudo malinterpretado. No se trata de que una clase tenga un solo método, sino de que tenga una única razón para cambiar. En este caso, la separación de responsabilidades permitió un diseño más modular y desacoplado, donde cada componente puede evolucionar independientemente.

---

## 2. Open/Closed Principle (OCP)

### Antes
Las clases `NewsService` y `PhotosService` dependían directamente de `axios`, una implementación concreta. Si queríamos cambiar a `fetch` u otra librería HTTP, teníamos que modificar el código existente, violando el principio de abierto para extensión pero cerrado para modificación.

### Después
Creé una abstracción `HttpClient` con dos implementaciones y `AxiosAdapter` que adapta `axios` a esta interfaz:
- `HttpClient`: Interfaz con el método `get()`
- `AxiosAdapter`: Implementa `HttpClient` usando `axios`
Los servicios ahora dependen de la abstracción `HttpClient` a través de inyección de dependencias en el constructor.

**Beneficios:**
- Los servicios están abiertos para extensión (pueden usar cualquier implementación de `HttpClient`) pero cerrados para modificación (no necesitan cambiar para usar una nueva librería)
- Facilita la migración a nuevas tecnologías sin modificar el código de los servicios
- Permite probar los servicios con mocks de `HttpClient` sin depender de `axios`

**Pregunta de Reflexión:** Si se detecta una vulnerabilidad en axios y debes migrar a fetch en minutos, ¿qué tan rápido lo harías con este diseño?

**Respuesta:** Con este diseño, la migración sería muy rápida. Solo necesitaría crear una nueva clase `FetchAdapter` que implemente la interfaz `HttpClient` utilizando `fetch` en lugar de `axios`. Luego, simplemente inyectaría esta nueva implementación en los servicios sin necesidad de modificar el código de los servicios. La separación de la abstracción y las implementaciones concretas permite una transición suave y rápida ante cambios tecnológicos.

### Reflexión
El principio OCP es crucial para la evolución del software. Al depender de abstracciones en lugar de implementaciones concretas, el código se vuelve más flexible y adaptable a cambios futuros. Este patrón también prepara el terreno para aplicar otros principios como DIP.

---

## 3. Liskov Substitution Principle (LSP)

### Antes
El `VehicleManager` usaba múltiples condicionales `instanceof` para tratar diferentes marcas de vehículos. Esto violaba LSP porque el cliente debía conocer los detalles de implementación de cada tipo. Además, agregar una nueva marca requería modificar el `VehicleManager`, violando también OCP.

### Después
Creé una clase abstracta `Vehicle` con el metodo `getDetails()`. Cada marca de vehículo (`Tesla`, `Audi`, `Toyota`, `Honda`, `Ford`, `Volvo`) implementa esta clase y proporciona su propia implementación de `getDetails()`. El `VehicleManager` ahora solo interactúa con la clase base `Vehicle` sin necesidad de conocer los detalles de cada marca.


**Beneficios:**
- El `VehicleManager` puede procesar cualquier vehículo sin necesidad de condicionales específicos
- Agregar nuevas marcas de vehículos no requiere modificar el `VehicleManager`, cumpliendo OCP
- El código es más limpio, mantenible y extensible
- Se garantiza que cualquier nuevo vehículo que implemente `Vehicle` será compatible con el manager, cumpliendo LSP

**Pregunta de Reflexión:** Si la reserva adquiere un "Dron", ¿podría tu manager procesarlo sin añadir nuevos if/else?

**Respuesta:** Sí, podría procesarlo sin añadir nuevos if/else. Solo necesitaría crear una nueva clase `Drone` que extienda la clase abstracta `Vehicle` e implemente el método `getDetails()`. El `VehicleManager` seguiría funcionando sin necesidad de modificar su código, ya que se basa en la abstracción `Vehicle`. Esto es precisamente lo que garantiza el principio LSP: cualquier nuevo tipo de vehículo que se adhiera a la interfaz de `Vehicle` puede ser utilizado sin cambios en el código cliente.

### Reflexión
LSP es un principio que asegura que las subclases puedan ser utilizadas como sustitutos de sus clases base sin alterar el comportamiento del programa. En este caso, al diseñar una jerarquía de clases bien estructurada, logramos un código más flexible y fácil de mantener, donde la adición de nuevas marcas de vehículos no afecta el funcionamiento del manager.
---

## 4. Interface Segregation Principle (ISP)

### Antes
La interfaz `Bird` era "gorda", obligando a todas las aves a implementar `eat()`, `fly()` y `swim()`. Esto causaba problemas:
- `Hummingbird` lanzaba una excepción en `swim()`
- `Ostrich` lanzaba una excepción en `fly()`
- `Toucan` implementaba `swim()` con un método vacío

Esto violaba ISP porque las clases eran forzadas a depender de métodos que no usaban.

### Después
Segregué la interfaz en interfaces más específicas:
- `Eat`: Incluye `eat()`
- `Fly`: Incluye `fly()`
- `Swim`: Incluye `swim()`

Cada clase implementa solo las interfaces que corresponden a sus capacidades naturales:
- `Toucan`: Implementa `Eat` y `Fly`
- `Hummingbird`: Implementa `Eat` y `Fly`
- `Ostrich`: Implementa `Swim` y `Eat`

**Beneficios:**
- Cada clase depende solo de los métodos que realmente usa
- El código es más limpio y fácil de entender
- Evita comportamientos anómalos como métodos que lanzan excepciones o están vacíos
- Facilita la extensión futura sin afectar a clases que no necesitan ciertos métodos

**Pregunta de Reflexión:** ¿Cómo evita tu diseño que un "Pingüino" tenga un método fly() que lance errores?

**Respuesta:** En el diseño refactorizado, el "Pingüino" implementaría solo las interfaces `Eat` y `Swim`, sin implementar la interfaz `Fly`. Esto significa que el "Pingüino" no tendría un método `fly()` en absoluto, evitando así cualquier posibilidad de lanzar errores relacionados con ese método. Al segregar las interfaces, cada clase solo implementa lo que realmente necesita, eliminando la necesidad de métodos que no son aplicables a ciertas clases y evitando comportamientos anómalos.

### Reflexión
El principio ISP es esencial para mantener un diseño limpio y coherente. Al evitar interfaces "gordas", podemos crear clases que sean más fáciles de entender y mantener, y que no estén obligadas a implementar métodos que no tienen sentido para su contexto. Esto también facilita la extensión futura sin afectar a clases que no necesitan ciertos métodos.

---

## 5. Dependency Inversion Principle (DIP)

### Antes
`PostService` dependía directamente de `LocalDatabaseService`, una implementación concreta. La instanciación se hacía dentro del método `getPosts()`, lo que hacía imposible cambiar de proveedor de datos sin modificar el código. Esto violaba DIP porque el módulo de alto nivel (`PostService`) dependía del módulo de bajo nivel (`LocalDatabaseService`).

### Después
Creé una interfaz `datastorage` que define el contrato para obtener posts. Luego, `PostService` depende de esta abstracción a través de inyección de dependencias en el constructor. `LocalDatabaseService` implementa esta interfaz, y puedo fácilmente crear otras implementaciones (como `RemoteDatabaseService`) sin modificar `PostService`.

**Beneficios:**
- `PostService` no depende de ninguna implementación concreta, lo que lo hace más flexible y desacoplado
- Facilita la sustitución de proveedores de datos sin modificar el código de `PostService`
- Permite probar `PostService` con mocks de la interfaz `datastorage` sin depender de una base de datos real
- Promueve un diseño más modular y escalable

**Pregunta de Reflexión:** ¿Qué tan fácil es inyectar un "MockDatabase" para pruebas unitarias ahora?

**Respuesta:** Es muy fácil inyectar un "MockDatabase" para pruebas unitarias con este diseño. Solo necesitaría crear una clase `MockDatabase` que implemente la interfaz `datastorage` y proporcionar implementaciones simuladas de los métodos necesarios para las pruebas. Luego, al instanciar `PostService` en mis pruebas, simplemente inyectaría una instancia de `MockDatabase` en lugar de `LocalDatabaseService`. Esto permite realizar pruebas unitarias sin depender de una base de datos real, facilitando la creación de pruebas rápidas y confiables.

### Reflexión
El principio DIP es fundamental para lograr un diseño desacoplado y flexible. Al depender de abstracciones en lugar de implementaciones concretas, podemos cambiar fácilmente las dependencias sin afectar el código cliente. Esto también facilita la prueba y la extensión futura del sistema, ya que los módulos de alto nivel no están atados a detalles de implementación específicos.

---

# Conclusión General

Este proyecto ha demostrado cómo aplicar los principios SOLID puede transformar un código monolítico y difícil de mantener en un diseño modular, flexible y fácil de entender. Cada principio aborda un aspecto específico del diseño de software, y juntos forman una base sólida para construir aplicaciones escalables y mantenibles. La reflexión sobre cada principio nos ha permitido entender no solo el "cómo" sino también el "por qué" detrás de cada refactorización, lo que es esencial para internalizar estos conceptos y aplicarlos efectivamente en proyectos futuros.