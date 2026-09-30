import { useMemo, useState } from "react";
import "./App.css";
import { Room } from "./models/Room";
import { RoomType } from "./models/RoomType";
import { BookingService } from "./services/BookingService";
import { FakeCustomerServiceClient } from "./services/CustomerServiceClient";
import type { BookingDTO } from "./dtos/BookingDTO";

// Manuell "wiring" istället för Spring DI - jämför med hur @Autowired
// gjorde det här åt dig automatiskt i Java. Det här skapas EN gång när
// modulen laddas (ungefär som ett Spring-bean med singleton-scope).
const rooms = [
  new Room(1, "101", RoomType.SINGLE),
  new Room(2, "102", RoomType.DOUBLE, 1),
];
const bookingService = new BookingService(rooms, new FakeCustomerServiceClient([1, 42]));

function App() {
  // useState = Reacts sätt att hantera "muterbart tillstånd". Jämför med ett
  // privat fält + getter/setter i Java - MEN med en superkraft Java saknar:
  // när du anropar setBookings(...) ritar React automatiskt om UI:t åt dig.
  // Ändrar du bara fältet direkt (som i Java) skulle skärmen INTE uppdateras.
  const [bookings, setBookings] = useState<BookingDTO[]>(bookingService.getAllBookings());
  const [error, setError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState(1);
  const [roomId, setRoomId] = useState(rooms[0].id!);

  // useMemo: cachea ett beräknat värde tills dess beroenden ändras.
  // Ingen direkt Java-motsvarighet - närmast ett manuellt cachat fält
  // som du själv skulle behöva ogiltigförklara vid rätt tillfälle.
  const availableRooms = useMemo(
    () => bookingService.getAvailableRooms(new Date(), new Date(Date.now() + 86400000 * 3)),
    [bookings]
  );

  function handleCreateBooking() {
    setError(null);
    try {
      const created = bookingService.save({
        checkIn: "2027-03-01",
        checkOut: "2027-03-05",
        customerId,
        roomId,
      });
      setBookings([...bookings, created]);
    } catch (e) {
      // Java: catch (RuntimeException e) { ... }
      // TS: `catch` fångar alltid typen `unknown` som standard (inte `any`),
      // så du måste själv försäkra dig om (eller kontrollera) att det är ett Error.
      setError((e as Error).message);
    }
  }

  return (
    <main className="app">
      <h1>Guesthouse booking – TS playground</h1>

      <section>
        <h2>Rum ({rooms.length})</h2>
        <ul>
          {rooms.map((r) => (
            <li key={r.id}>
              {r.name} – {r.roomType} – maxCapacity: {r.maxCapacity}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skapa bokning (2027-03-01 → 2027-03-05)</h2>
        <label>
          Customer ID:{" "}
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(Number(e.target.value))}
          />
        </label>
        <label>
          Rum:{" "}
          <select value={roomId} onChange={(e) => setRoomId(Number(e.target.value))}>
            {rooms.map((r) => (
              <option key={r.id} value={r.id!}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleCreateBooking}>Boka</button>
        {error && <p className="error">{error}</p>}
      </section>

      <section>
        <h2>Bokningar ({bookings.length})</h2>
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              #{b.id} – kund {b.customerId} – rum {b.roomId} – {b.checkIn} → {b.checkOut}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Lediga rum just nu ({availableRooms.length})</h2>
        <ul>
          {availableRooms.map((r) => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
