# Guesthouse booking – TS playground

Minimal Vite + React + TypeScript-version av din Java/Spring Boot booking-domän.
Inget bygger, inget deployas, ingen databas – bara i-minnet-logik du kan öppna
i webbläsaren och leka med (`npm install && npm run dev`).

## Filstruktur

```
guesthouse-ts-playground/
├── package.json          ~ pom.xml (dependencies + scripts)
├── tsconfig.json          # TS-kompilatorns inställningar (inget Java-motsvarande, javac har inte lika mycket att konfigurera)
├── vite.config.ts         ~ maven-compiler-plugin / spring-boot-maven-plugin
├── index.html             # HTML-skalet appen monteras in i
└── src/
    ├── main.tsx            ~ Application.java (entrypoint)
    ├── App.tsx             ~ en Controller + en enkel vy, ihopslaget
    ├── App.css
    ├── models/
    │   ├── RoomType.ts     ~ RoomType.java (enum)
    │   ├── Room.ts         ~ Room.java (@Entity)
    │   └── Booking.ts      ~ Booking.java (@Entity)
    ├── dtos/
    │   └── BookingDTO.ts   ~ BookingDTO.java
    └── services/
        ├── CustomerServiceClient.ts  ~ CustomerServiceClient.java (interface + impl)
        └── BookingService.ts         ~ BookingServiceImpl.java
```

## Snabb begreppstabell

| Java / Spring Boot                     | TypeScript / React                                    | Kommentar |
|---|---|---|
| `class` med privata fält + getters/setters | `class` med `public`/`private` konstruktorparametrar | TS "parameter properties" ≈ vad Lombok `@Data` genererar åt dig |
| `interface` (nominal typing, finns i runtime) | `interface` (structural typing, **finns bara vid kompilering**) | TS-objekt behöver inte explicit skriva `implements` för att räknas som "rätt typ" |
| `enum` | `enum` **eller** en union type (`"SINGLE" \| "DOUBLE"`) | TS enum finns kvar i JS-koden; en union type finns bara vid kompilering |
| getter/setter-metoder (`getName()`/`setName()`) | `get`/`set`-accessorer (`obj.name`, inte `obj.getName()`) | TS-syntaxen är property-lik, inte metodanrop |
| Lombok-annoteringar (`@Data`, `@AllArgsConstructor`) | inbyggt i språket via constructor parameter properties | ingen extra annotationsprocessor behövs i TS |
| `@Entity`, `@Id`, Hibernate/JPA | inget inbyggt – kräver separat bibliotek (t.ex. TypeORM, Prisma) | TS/JS har ingen inbyggd ORM |
| `@Service`, `@Autowired`, Spring DI-container | inget inbyggt i React – DI löses via Context/hooks, eller ett ramverk | **NestJS** (backend) är den TS-motsvarighet som ligger närmast Spring Boot konceptuellt: `@Injectable()`, `@Controller()`, riktiga decorators, DI-container |
| checked/unchecked exceptions | bara `throw new Error(...)`, inga checked exceptions alls | TS/JS tvingar aldrig anroparen att hantera fel |
| Bean Validation (`@NotNull` m.fl.) | inget inbyggt – kräver bibliotek som Zod/Yup för runtime-validering | TS types försvinner vid kompilering, kan inte validera "på riktigt" |
| Maven (`pom.xml`, `mvn test`) | npm/Vite (`package.json`, `npm run dev`) | samma roll: dependency management + build-kommandon |

## Köra det

```bash
npm install
npm run dev
```

Öppna länken Vite skriver ut (oftast `http://localhost:5173`).
